import mongoose from "mongoose";

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected succefully');
    }catch(eroor){
        console.log(eroor);

    }
    
}
export default connectDB;