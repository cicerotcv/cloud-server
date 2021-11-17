import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI!);

export default mongoose;
