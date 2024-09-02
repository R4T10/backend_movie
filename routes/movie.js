
var express = require('express');
var router = express.Router();
var movieModel = require('../models/movie')

router.get("/api/v1/movie",async function(req,res,next){
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const movies = await movieModel.aggregate([
            {
                $match:{}
            },
            {
                $facet:{
                    metaData:[
                        {
                            $count:'totalDocuments'
                        },
                        {
                            $addFields:{
                                pageNumber : page,
                                totalPages: {$ceil :{$divide:["$totalDocuments",limit]}}
                            }
                        }
                    ],
                    data:[
                        {
                            $skip: (page-1)* limit
                        },
                        {
                            $limit: limit
                        }
                    ]
                }
            },
        ])
        return res.status(200).send({
            data:movies
        });
    }catch(err){
        console.log(err)
        return res.status(500).send({
            message:"Fail to fetch movies",
        })
    }
})

router.get("/api/v1/movie/:id",async function(req,res,next){
    try{
        let movieId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({
                message: "id Invalid",
                success: false,
                error: ["id is not ObjectID"]
            });
        }
        let movie = await movieModel.findById(movieId)
        return res.status(200).send({
            data: {
                _id: movie.id, movie_name: movie.name,genre:movie.genre, image: movie.image, description: movie.description, rate: movie.rate
            }
        })
    }catch(error){
        console.log(error)
        return res.status(500).send({
            message:"Server error",
            success:false,
        })
    }
})



router.post("/api/v1/movie",async function(req,res,next){
    try{
        const {name,genre,description,image,rate} = req.body;
        let newMovie = new movieModel({
            name: name,
            genre:genre,
            description : description,
            image: image,
            rate : rate
        });
        let movie = await newMovie.save();
        return res.status(201).send({
            data:movie,
            message:"Add new movie success",
            success:true,
        });
    }catch(error){
        console.log(error)
        return res.status(500).send({
            message:"Fail to add new movie",
            success:false,
        })
    }
})

module.exports = router;