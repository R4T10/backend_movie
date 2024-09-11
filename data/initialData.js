const mongoose = require("mongoose");
const movieModel = require("../models/movie"); 

mongoose.connect(`mongodb://localhost:27017/movie`)
  .then(() => {
    console.log("Connected to MongoDB");

    const moviesData = [{
        "name": "The Devil Wears Prada",
        "genre": [
          "Comedy",
          "Drama"
        ],
        "description": "A young woman lands a job at a prestigious fashion magazine.",
        "image": "https://c4.wallpaperflare.com/wallpaper/887/694/482/the-devil-wears-prada-miranda-priestly-andy-sachs-anne-hathaway-wallpaper-preview.jpg",
        "rate": 0,
        "releaseYear":2006
      },
      {
        "name": "The Dark Knight",
        "description": "A heroic tale of Batman's fight against the Joker.",
        "genre": [
          "Action",
          "Drama"
        ],
        "image": "https://theconsultingdetectivesblog.com/wp-content/uploads/2014/06/the-dark-knight-original.jpg",
        "rate": 0,
        "releaseYear": 2008
      },
      {
        "name": "Inception",
        "description": "A mind-bending journey into the world of dreams.",
        "genre": [
          "Sci-Fi",
          "Thriller"
        ],
        "image": "https://images.squarespace-cdn.com/content/v1/5ec686197f8b2976074846c2/1618809593080-N5PB8CWYOW3OPDE2TT6E/Feature+3-1.png",
        "rate": 0,
        "releaseYear": 2010
      },
      {
        "name": "Interstellar",
        "description": "A space epic about humanity's survival.",
        "genre": [
          "Sci-Fi",
          "Adventure"
        ],
        "image": "https://edgroom-blogs.s3.ap-south-1.amazonaws.com/202310071805064792540_38983_u23h.jpg",
        "rate": 0,
        "releaseYear": 2014
      },
      {
        "name": "The Matrix",
        "description": "A hacker discovers the truth about his reality.",
        "genre": [
          "Sci-Fi",
          "Action"
        ],
        "image": "https://www.syfy.com/sites/syfy/files/styles/scale_1280/public/2021/03/the-matrix.jpeg",
        "rate": 0,
        "releaseYear": 1999
      },
      {
        "name": "Avatar",
        "description": "A marine on an alien planet fights to protect it.",
        "genre": [
          "Sci-Fi",
          "Adventure"
        ],
        "image": "https://wallpapers.com/images/featured/avatar-background-8t5bkculh0jr4m3c.jpg",
        "rate": 0,
        "releaseYear": 2009
      },
      {
        "name": "Jurassic Park",
        "description": "Dinosaurs are brought back to life in a theme park.",
        "genre": [
          "Sci-Fi",
          "Adventure"
        ],
        "image": "https://images.theconversation.com/files/527551/original/file-20230522-14905-qwgz75.jpg?ixlib=rb-4.1.0&rect=0%2C204%2C3600%2C1800&q=45&auto=format&w=1356&h=668&fit=crop",
        "rate": 0,
        "releaseYear": 1993
      },
      {
        "name": "Guardians of the Galaxy",
        "description": "A group of intergalactic criminals teams up to save the universe.",
        "genre": [
          "Sci-Fi",
          "Action"
        ],
        "image": "https://c4.wallpaperflare.com/wallpaper/12/741/67/guardians-of-the-galaxy-vol-2-guardians-of-the-galaxy-chris-pratt-zoe-saldana-wallpaper-preview.jpg",
        "rate": 0,
        "releaseYear": 2014
      },
      {
        "name": "The Avengers",
        "description": "Earth's mightiest heroes come together to fight against Loki.",
        "genre": [
          "Action",
          "Sci-Fi"
        ],
        "image": "https://www.pluggedin.com/wp-content/uploads/2019/12/the-avengers-review-image-1200x688.jpg",
        "rate": 0,
        "releaseYear": 2012
      },
      {
        "name": "Iron Man",
        "description": "A billionaire builds a suit of armor to fight evil.",
        "genre": [
          "Action",
          "Sci-Fi"
        ],
        "image": "https://wallpapers.com/images/featured/iron-man-ouqxo5w2b59h0042.jpg",
        "rate": 0,
        "releaseYear": 2008
      },
      {
        "name": "Thor",
        "description": "The god of thunder is banished to Earth and must prove his worth.",
        "genre": [
          "Action",
          "Fantasy"
        ],
        "image": "https://images7.alphacoders.com/825/thumb-1920-825593.jpg",
        "rate": 0,
        "releaseYear": 2011
      },
      {
        "name": "Black Panther",
        "description": "The king of Wakanda fights to protect his nation.",
        "genre": [
          "Action",
          "Adventure"
        ],
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj1gYTcTGJFex4FUN5k0cQstfalVojWtZtZw&s",
        "rate": 0,
        "releaseYear": 2018
      },
      {
        "name": "Doctor Strange",
        "description": "A surgeon discovers the mystic arts.",
        "genre": [
          "Action",
          "Fantasy"
        ],
        "image": "https://wallpapers.com/images/featured/doctor-strange-6es4yutxrbl0nas9.jpg",
        "rate": 5,
        "releaseYear": 2016
      },
      {
        "name": "Captain America",
        "description": "A man becomes a super soldier to fight in World War II.",
        "genre": [
          "Action",
          "Adventure"
        ],
        "image": "https://wallpapercave.com/wp/wp3775630.jpg",
        "rate": 5,
        "releaseYear": 2011
      },
      {
        "name": "Wonder Woman",
        "description": "An Amazonian princess leaves her home to end a war.",
        "genre": [
          "Action",
          "Fantasy"
        ],
        "image": "https://c4.wallpaperflare.com/wallpaper/840/876/23/wonder-woman-dc-comics-gal-gadot-sword-wallpaper-preview.jpg",
        "rate": 0,
        "releaseYear": 2017
      },
      {
        "name": "Aquaman",
        "description": "A man discovers he is the heir to the underwater kingdom of Atlantis.",
        "genre": [
          "Action",
          "Fantasy"
        ],
        "image": "https://c4.wallpaperflare.com/wallpaper/905/1/271/movie-aquaman-jason-momoa-wallpaper-preview.jpg",
        "rate": 0,
        "releaseYear": 2018
      },
      {
        "name": "Man of Steel",
        "description": "A young man learns he has extraordinary powers.",
        "genre": [
          "Action",
          "Sci-Fi"
        ],
        "image": "https://wallup.net/wp-content/uploads/2019/07/24/89053-man-of-steel-superman-superhero.jpg",
        "rate": 0,
        "releaseYear": 2013
      },
      {
        "name": "The Flash",
        "description": "A young man gains the power of super speed.",
        "genre": [
          "Action",
          "Sci-Fi"
        ],
        "image": "https://c4.wallpaperflare.com/wallpaper/913/675/681/the-flash-men-dc-comics-tv-wallpaper-preview.jpg",
        "rate": 0,
        "releaseYear": 2023
      },
      {
        "name": "Spider-Man: Homecoming",
        "description": "A young Spider-Man tries to balance high school life with being a hero.",
        "genre": [
          "Action",
          "Sci-Fi"
        ],
        "image": "https://images8.alphacoders.com/869/thumb-1920-869321.jpg",
        "rate": 5,
        "releaseYear": 2017
      },
      {
        "name": "Avengers: Endgame",
        "description": "The Avengers assemble once more to undo Thanos' destruction.",
        "genre": [
          "Action",
          "Sci-Fi"
        ],
        "image": "https://wallpapers.com/images/hd/avengers-endgame-fantasy-m8fbpfs2m580r7l3.jpg",
        "rate": 5,
        "releaseYear": 2019
      },
      {
        "name": "Tokyo Drift",
        "genre": [
          "Action"
        ],
        "description": "The story centers on Sean Boswell (Lucas Black), a high school senior with a knack for street racing who finds himself in trouble with the law. To avoid a jail sentence, he is sent to live with his estranged father in Tokyo. Here, he becomes entrenched in the city's underground racing scene, which revolves around a unique style of racing known as drifting—a technique involving controlled oversteering to maneuver through tight corners.",
        "image": "https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/04/tokyo-drift.png",
        "releaseYear": 2006,
        "rate": 5
      },
      {
        "name": "Pacific Rim Uprising",
        "genre": [
          "Action",
          "Sci-Fi"
        ],
        "description": "Pacific Rim Uprising is characterized by its high-octane action sequences, massive robot vs. monster battles, and a visual style that emphasizes grand scale and spectacle. The film explores themes of legacy, leadership, and the continued struggle to protect Earth from existential threats.",
        "image": "https://media.wired.com/photos/59d650efab6f3f2f445b9eb2/master/pass/pacific-rim-uprising-TA.jpg",
        "releaseYear": 2018,
        "rate": 4
      }];

    return movieModel.insertMany(moviesData);
  })
  .then(() => {
    return mongoose.connection.close(); 
  })
  .catch((err) => {
    console.log(err);
  });
