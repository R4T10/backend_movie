var express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var router = express.Router();

var userModel = require('../models/user')
var movieModel = require('../models/movie')

router.post('/api/v1/login', async function(req, res, next) {
  try{
    let {password, inputUsername} = req.body;
    console.log(inputUsername)
    let user = await userModel.findOne({
      username:inputUsername,
    });
    console.log(user)
    if(!user){
      return res.status(500).send({
        message: "User not found, Please register or check you username and password",
        success: false,
      })
    }
    const checkPassword = await bcrypt.compare(password,user.password);
    if(!checkPassword){
      return res.status(500).send({
        message: "login fail",
        success: false,
      })
    }
    const {_id,username,email,favorite} = user;
    const token = jwt.sign({_id,username,email,favorite},process.env.JWT_KEY)
    return res.status(200).send({
      data : {_id,username,email,favorite,token},
      message: "login success",
      success: true,
    })
  }catch (error){
    console.log(error)
    return res.status(500).send({
      message: "login fail",
      success: false,
    })
  }
});

router.post("/api/v1/register", async function (req, res, next) {
  try {
    const {username,password,email} = req.body
    let hashPassword = await bcrypt.hash(password,10);
      const newUser = new userModel ({
        username : username,
        password : hashPassword,
        email : email,
      })
      let user = await newUser.save();
      return res.status(200).send({
          data: {id:user._id,username:user.username,password:user.password,email:user.email}
      });
  } catch (err) {
      console.log(err)
      return res.status(500).send({
          message: "Fail create user",
      })
  }
})

router.get('/api/v1/check-favorite/:username/:movieId', async (req, res) => {
  try {
    const { username, movieId } = req.params;
    const user = await userModel.findOne({
      username:username
    });

    if (!user) {
      return res.status(404).send({ 
        message: 'User not found' 
      });
    }

    const isFavorite = user.favorite.includes(movieId);

    res.status(200).send({ isFavorite });
  } catch (error) {
    console.error(error);
    res.status(500).send({ 
      message: 'Server error'
    });
  }
});

router.get('/api/v1/favorites/:username', async (req, res) => {
  try {
    const { username } = req.params;

    const user = await userModel.findOne({ username: username });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (user.favorite && user.favorite.length > 0) {
      const favoriteMovies = await movieModel.find({
        _id: { $in: user.favorite }
      });

      res.status(200).send({
       data: favoriteMovies
    });
    } else {
      res.status(200).send({
        data:[]
      });
    }
  } catch (error) {
    console.error('Error fetching favorite movies:', error);
    res.status(500).send({ message: 'Server error' });
  }
});

router.post("/api/v1/add-favorite", async function (req, res, next) {
  try {
    const {username,movieId} = req.body
    let user = await userModel.findOne({
      username : username
    })
    if(!user){
      return res.status(500).send({
        message: "Error can't find this user",
        success: false,
      })
    }

    let movie = await movieModel.findById(movieId)
    if(!movie){
      return res.status(500).send({
        message: "Error can't find this movie",
        success: false,
      })
    }
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { $addToSet: { favorite: movieId } },
      { new: true }
  );
      return res.status(200).send({
          data: {username:updatedUser.username,favorite:updatedUser.favorite}
      });
  } catch (err) {
      console.log(err)
      return res.status(500).send({
          message: "Fail add movie to favorite list",
      })
  }
})



router.delete('/api/v1/remove-favorite/:username/:movieId', async (req, res) => {
  try {
    const { username, movieId } = req.params;
    const user = await userModel.findOne({
      username : username
    });

    if (!user) {
      return res.status(404).send({ 
        message: 'User not found' 
      });
    }

    user.favorite = user.favorite.filter(fav => fav.toString() !== movieId);
    await user.save();

    res.status(200).send({ message: 'Movie removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
});




module.exports = router;
