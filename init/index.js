const mongoose=require("mongoose");
const initData=require("./data.js");

const Listing=require("../models/listing.js");

const MONGO_url="mongodb://127.0.0.1:27017/CozyClouds";

main()
    .then(()=>{
        console.log("Connected to db ..");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_url);
};
const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner: "696e220ecb0a41fabad55129"}));
    await Listing.insertMany(initData.data);
    console.log("data was initilized");
};

initDB();