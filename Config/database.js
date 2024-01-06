//mongoose Setup

const mongoose = require('mongoose');
require('dotenv').config();

const ConnectDb =()=>{ mongoose.connect(process.env.MONGODB_URL)
            .then(()=> console.log("Database connected Successfully"))
            .catch((err)=> console.log("Error Ocuured:"+ err));
}

module.exports = ConnectDb;

                
