const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
const songRoute = require('./Routes/songRoute')
const artistRoute = require('./Routes/artistRoute')
const albumRoute = require('./Routes/albumRoute')
const userRoute = require('./Routes/userRoute')
const playlistRoute = require('./Routes/playlistRoute')
const authenticationMiddleware = require("./Auth/AuthenticationMiddleware");
const cors = require('cors')
const cookieParser = require('cookie-parser');
const playlistSchema = require('./Model/playlistSchema');

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(cookieParser());

const db_url = `${process.env.DBURL}${process.env.DBNAME}`;
mongoose
.connect(db_url)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((e) => {
    console.log(e)
})

app.use(express.static('public'));
app.use('/api/v1/', userRoute)
app.use(authenticationMiddleware);
app.use('/api/v1/songs/', songRoute)
app.use('/api/v1/artists/', artistRoute)
app.use('/api/v1/albums/', albumRoute)
app.use('/api/v1/playlists',playlistRoute)

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/View/index.html')
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port ' + process.env.PORT);
})