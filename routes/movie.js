
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
        return res.status(201).send({
            data:movies
        });
    }catch(err){
        console.log(err)
        return res.status(500).send({
            message:"Fail to fetch movies",
        })
    }
})

router.post("/api/v1/movie",async function(req,res,next){
    try{
        const {name,description,image,rate} = req.body;
        let newMovie = new movieModel({
            name: name,
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