const mongoose = require('mongoose');

const DB_CONN_STRING = 'mongodb://jajamoks:Taeka_1213@cluster0-shard-00-00.y0bwp.mongodb.net:27017,cluster0-shard-00-01.y0bwp.mongodb.net:27017,cluster0-shard-00-02.y0bwp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-5azoqw-shard-0&authSource=admin&retryWrites=true&w=majority';

let dbConnection = null;

module.exports = async () => {
    if (dbConnection != null) {
        return dbConnection;
    }

    if (dbConnection == null) {
        dbConnection = await mongoose.connect(DB_CONN_STRING, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        return dbConnection;
    }
};