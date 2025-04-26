const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
const songRoute = require('./Routes/songRoute')
const artistRoute = require('./Routes/artistRoute')
const albumRoute = require('./Routes/albumRoute')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const db_url = `${process.env.DBURL}/${process.env.DBNAME}`;
mongoose
.connect('mongodb://127.0.0.1:27017/MusicAppDB')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((e) => {
    console.log(e)
})

app.use(express.static('public'));
app.use('/songs/', songRoute)
app.use('/artists/', artistRoute)
app.use('/albums/', albumRoute)

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/View/index.html')
});
app.listen(process.env.PORT, () => {
    console.log('Server is running on port ' + process.env.PORT);
})