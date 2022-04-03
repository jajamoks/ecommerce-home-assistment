
import mongoose from "mongoose";
import { logger } from "../../utils/logger";
import createError from "http-errors";

const connectDB = async () => {
    const mongoString = 'mongodb://jajamoks:Taeka_1213@cluster0-shard-00-00.y0bwp.mongodb.net:27017,cluster0-shard-00-01.y0bwp.mongodb.net:27017,cluster0-shard-00-02.y0bwp.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-5azoqw-shard-0&authSource=admin&retryWrites=true&w=majority';
    try {
        const conn = await mongoose.connect(mongoString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`MongoDB Connection Error: ${error.message}`);
        throw new createError.InternalServerError(error.message);
    }
};

export default connectDB;