import mongoose from "mongoose";

const { MONGO_USER, MONGO_PWD, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env;
const MONGO_URI = `mongodb://${MONGO_USER}:${MONGO_PWD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);

export default mongoose;
