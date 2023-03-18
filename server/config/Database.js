const mongoose = require("mongoose");
mongoose.set("strictQuery",false);

const connectDB = async () => {
    try{ 
        console.log(process.env.mongoDBURL);
        await mongoose.connect(process.env.mongoDBURL)
        console.log("Connected to Database");
    } 
    catch (err){
        console.log("Could not connect because of error => ", err);
    }
};

module.exports=connectDB