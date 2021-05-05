const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const ytpl = require("ytpl");
const ytdl = require("ytdl-core");
const ytch = require("yt-channel-info");
const { response } = require("express");
const bcrypt = require("bcrypt");
const Playlist = require("../models/Playlist");
const User = require("../models/User");
const { getChannelInfo } = require("yt-channel-info");


// cors middleware
const cors = require('cors')
router.use(cors({origin:true,credentials: true}));

// get the list of all the pages
router.get("/", auth, async (req, res) => {
  try {
    const CS50 = await Playlist.find({category:"CS50"}).limit(10);
    const FCC = await Playlist.find({category:"FCC"}).limit(10);
    const MIT = await Playlist.find({category:"mit"}).limit(10)
    const MIT_6 = await Playlist.find({name: new RegExp("6.0") }).limit(10)
    const MIT_18 = await Playlist.find({name: new RegExp("18.") }).limit(10)
    var pages = []
    pages.push({CS50,MIT,FCC,MIT_18,MIT_6})
    res.send(pages);
  } catch (err) {
    res.json({ msg: err });
  }
});

// creating a Playlist
router.post("/addPlaylist", auth, async (req, res) => {
  if (req.user.role == "ADMIN") {
    try {
      var URL = req.body.url;
      var playlistID = "";

      // getting the Playlist ID from the URL
      await ytpl
        .getPlaylistID(URL)
        .then((response) => {
          playlistID = response;
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(req.user);

      savedPlaylist = await savePlaylist(playlistID);
      res.send(200);
    } catch (err) {
      res.json({ msg: err });
    }
  } else {
    res.send(401);
  }
});

router.post("/addChannel", async (req, res) => {
  try {
    var URL = req.query.url.split("/");
    URL = URL[URL.length - 1];
    console.log(URL);
    console.log(req.params, req.role);
    var cont = "";
    var playlistsURL = [];

    // getting the Playlist ID from the URL
    await ytch
      .getChannelPlaylistInfo(URL)
      .then((response) => {
        for (const p of response.items) {
          playlistsURL.push(p.playlistId);
        }
        cont = response.continuation;
        console.log(cont);
      })
      .catch((error) => {
        console.log(error);
      });

    while (cont != null) {
      await ytch
        .getChannelPlaylistsMore(cont)
        .then((response) => {
          for (const p of response.items) {
            playlistsURL.push(p.playlistId);
          }
          cont = response.continuation;
          console.log(cont);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    for (const url of playlistsURL) {
      const exists = await Playlist.find({
        playlist_id: new RegExp(url),
      }).count();
      if (exists > 0) {
        console.log("EXISTS " + url);
      } else {
        console.log("ADDED " + url);
        await savePlaylist(url);
      }
    }
    res.send(200);
  } catch (err) {
    res.json({ msg: err });
  }
});

// delete request to remove a Playlist Object
router.delete("/deletePlaylist/:id", auth, async (req, res) => {
  try {
    await Playlist.deleteOne({ _id: req.params.id });
    res.json({ msg: "Page Deleted" });
  } catch (err) {
    res.json({ msg: err });
  }
});

// get the Playlist with specific Playlist ID
router.get("/getPlaylist/:id", auth, async (req, res) => {
  try {
    const playlist = await Playlist.find({ playlist_id: req.params.id });
    res.send(playlist);
  } catch (err) {
    res.json({ msg: err });
  }
});

// get the list of searched pages
router.get("/search/:q", auth, async (req, res) => {
  try {
    const q = req.params.q;
    const playlists = await Playlist.find({ name: new RegExp(q) });
    res.send(playlists);
  } catch (err) {
    res.json({ msg: err });
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    user = new User({
      Name: req.body.name,
      Email: req.body.email,
      Username: req.body.username,
      Age: req.body.age,
      Role: "USER",
    });

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    user.Password = password;

    await user.save();
    res.send("Saved");
  } catch (err) {
    res.send(701);
    res.json({ msg: err });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    username = req.body.username;
    password = req.body.password;
    user = await User.find({ Username: new RegExp(username) });

    const valid = await bcrypt.compare(password, user[0].Password);
    if (valid) {
      res.json({
        token: jwt.sign(
          { user: username, role: user[0].Role },
          process.env.ACCESS_TOKEN_SECRET
        ),
        role: user[0].Role,
      });
    } else {
      res.send(701);
    }
  } catch (err) {
    res.json({ msg: err });
  }
});

function auth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

// Get Video Data
async function getVideoData(video) {
  return ytdl
    .getBasicInfo(video)
    .then((videoData) => {
      var videoDetails = videoData.videoDetails;
      var v = {
        title: videoDetails.title,
        video_id: videoDetails.videoId,
        thumbnail: videoDetails.thumbnails.reverse()[0].url,
        releaseDateVideo: videoDetails.publishDate,
        descriptionVideo: videoDetails.description,
        durationVideo: videoDetails.lengthSeconds,
      };
      return v;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

async function savePlaylist(playlistID) {
  var videosURL = [];
  var videos = [];
  var playlist;

  // getting the Playlist Data
  await ytpl(playlistID)
    .then((playlistData) => {
      // getting the URL of all Videos of Playlist
      const items = playlistData.items;
      items.forEach((element) => {
        videosURL.push(element.shortUrl);
      });

      // Creating the Playlist Object that will be inserted in the Database
      playlist = new Playlist({
        name: playlistData.title,
        playlist_id: playlistData.id,
        thumbnail: playlistData.bestThumbnail.url,
        description: playlistData.description,
        category: playlistData.author.name,
      });
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  // getting the Video Meta Data from the Video URl
  for (const video of videosURL) {
    v = await getVideoData(video);
    if (v != null) {
      videos.push(v);
    }
  }

  // Additional Attributes of Playlist Object
  durationPlaylist = 0;
  for (const video of videos) {
    durationPlaylist += parseInt(video.durationVideo);
  }
  playlist.releaseDatePlaylist = videos[0].releaseDateVideo;
  playlist.Video = videos;
  playlist.durationPlaylist = durationPlaylist;
  playlist.thumbnail = videos[0].thumbnail;

  console.log(playlist.name);
  // Inserting the Playlist in Database
  return playlist.save();
}

module.exports = router;
