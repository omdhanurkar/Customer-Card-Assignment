const express = require('express');
const route = require('./routes/route.js');
const mongoose = require('mongoose');
const app = express();
mongoose.set('strictQuery', true);

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/card-collection", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route); 


app.listen(3000, () => {
    console.log("Express is running on port " + 3000)
})

