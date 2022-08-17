const mongoose = require('mongoose');
const { mongodb } = require('./keys')

mongoose.connect(mongodb.uri , {useNewUrlParser:true, useUnifiedTopology: true})
    .then(db => console.log('DataBase Connected'))
    .catch(err => console.log(err))