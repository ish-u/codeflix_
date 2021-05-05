const mongoose = require('mongoose');

const reqStr = {
    type:String,
    required : true
};

const Playlist = mongoose.Schema({
    name:reqStr,
    playlist_id:reqStr,
    thumbnail:reqStr,
    durationPlaylist:reqStr,
    releaseDatePlaylist:reqStr,
    descriptionPlaylist: String,
    category:reqStr,
    Video:[{
        title:reqStr,
        video_id:reqStr,
        thumbnail:reqStr,
        releaseDateVideo:reqStr,
        descriptionVideo:String,
        durationVideo:reqStr
    }]
})

module.exports = mongoose.model('playlist', Playlist);
