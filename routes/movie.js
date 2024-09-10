var express = require('express');
var router = express.Router();
var movieModel = require('../models/movie')
var mongoose = require('mongoose')


router.get("/api/v1/movie", async function (req, res, next) {
    try {
        const movies = await movieModel.aggregate([
            {
                $sort: { rate: -1 }
            },
            {
                $limit: 6
            }
        ]);
        return res.status(200).send({
            data: movies
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            message: "Fail to fetch movies",
        })
    }
})

router.get('/api/v1/movie/random-movies', async (req, res) => {
    try {
        const movies = await movieModel.aggregate([
            { $sample: { size: 8 } }
        ]);
        return res.status(200).send({
            data: movies
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Fail to fetch movies",
        })
    }
});


router.get('/api/v1/movie/sorted_movies', async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const input_number = Number(req.query.input_number) || 1;
        console.log("This is input number")
        console.log(input_number)
        const movies = await movieModel.aggregate([
            { $sort: { releaseYear: input_number } },
            {
                $facet: {
                    metaData: [
                        { $count: 'totalDocuments' },
                        {
                            $addFields: {
                                pageNumber: page,
                                totalPages: { $ceil: { $divide: ["$totalDocuments", limit] } }
                            }
                        }
                    ],
                    data: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ]
                }
            }
        ]);
        return res.status(200).send({
            data: movies
        });
    } catch (err) {
        console.error("Error occurred:", err);
        return res.status(500).send({
            message: "Failed to fetch movies",
        });
    }
});

router.get("/api/v1/movie_newest", async function (req, res, next) {
    try {
        const movies = await movieModel.aggregate([
            {
                $sort: { createdAt: -1 }
            },
            {
                $limit: 5
            }
        ])
        return res.status(200).send({
            data: movies
        });
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            message: "Fail to fetch movies",
        })
    }
})

router.get("/api/v1/movie/search", async function (req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const input = req.query.input;

        if (!input) {
            console.log("Query parameter is missing");
            return res.status(400).json({ error: 'Query parameter is required' });
        }

        let movies = await movieModel.aggregate([
            {
                $match: {
                    name: { $regex: input, $options: 'i' }
                }
            },
            {
                $facet: {
                    metaData: [
                        { $count: 'totalDocuments' },
                        {
                            $addFields: {
                                pageNumber: page,
                                totalPages: { $ceil: { $divide: ["$totalDocuments", limit] } }
                            }
                        }
                    ],
                    data: [
                        { $skip: (page - 1) * limit },
                        { $limit: limit }
                    ]
                }
            }
        ]);

        if (movies.length === 0 || !movies[0].data || movies[0].data.length === 0) {
            movies = await movieModel.aggregate([
                {
                    $match: {
                        genre: input
                    }
                },
                {
                    $facet: {
                        metaData: [
                            { $count: 'totalDocuments' },
                            {
                                $addFields: {
                                    pageNumber: page,
                                    totalPages: { $ceil: { $divide: ["$totalDocuments", limit] } }
                                }
                            }
                        ],
                        data: [
                            { $skip: (page - 1) * limit },
                            { $limit: limit }
                        ]
                    }
                }
            ]);
        }

        if (movies.length === 0 || !movies[0].data || movies[0].data.length === 0) {
            movies = await movieModel.aggregate([
                {
                    $match: {
                        releaseYear: Number(input)
                    }
                },
                {
                    $facet: {
                        metaData: [
                            { $count: 'totalDocuments' },
                            {
                                $addFields: {
                                    pageNumber: page,
                                    totalPages: { $ceil: { $divide: ["$totalDocuments", limit] } }
                                }
                            }
                        ],
                        data: [
                            { $skip: (page - 1) * limit },
                            { $limit: limit }
                        ]
                    }
                }
            ]);
        }

        if (movies.length === 0 || !movies[0].data || movies[0].data.length === 0) {
            console.log("No movies found by any criteria");
            return res.status(404).send({
                message: "No movies found matching the query",
            });
        }
        return res.status(200).send({
            data: movies,
        });
    } catch (err) {
        console.error("Error occurred:", err);
        return res.status(500).send({
            message: "Failed to fetch movies",
        });
    }
});



router.get("/api/v1/movie/pagination", async function (req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const genre = req.query.genre;

        console.log('Genre:', genre);

        const movies = await movieModel.aggregate([
            {
                $match: genre ? { genre: { $in: [genre] } } : {}
            },
            {
                $facet: {
                    metaData: [
                        {
                            $count: 'totalDocuments'
                        },
                        {
                            $addFields: {
                                pageNumber: page,
                                totalPages: { $ceil: { $divide: ["$totalDocuments", limit] } }
                            }
                        }
                    ],
                    data: [
                        {
                            $skip: (page - 1) * limit
                        },
                        {
                            $limit: limit
                        }
                    ]
                }
            }
        ]);

        return res.status(200).send({
            data: movies
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: "Failed to fetch movies",
        });
    }
});


router.get("/api/v1/movie/:id", async function (req, res, next) {
    try {
        let movieId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(movieId)) {
            return res.status(400).send({
                message: "id Invalid",
                success: false,
                error: ["id is not ObjectID"]
            });
        }
        let movie = await movieModel.findById(movieId)
        return res.status(200).send({
            data: {
                _id: movie.id, movie_name: movie.name, genre: movie.genre, image: movie.image, description: movie.description, rate: movie.rate, releaseYear: movie.releaseYear
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Server error",
            success: false,
        })
    }
})



router.post("/api/v1/movie", async function (req, res, next) {
    try {
        const { name, genre, description, image, rate, releaseYear } = req.body;
        let newMovie = new movieModel({
            name: name,
            genre: genre,
            description: description,
            image: image,
            rate: rate,
            releaseYear: releaseYear
        });
        let movie = await newMovie.save();
        return res.status(201).send({
            data: movie,
            message: "Add new movie success",
            success: true,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Fail to add new movie",
            success: false,
        })
    }
})


module.exports = router;