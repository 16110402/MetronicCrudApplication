const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/nourishemp?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

// const connectToMongo = () => {
//     // mongoose.connect(mongoURI, ()=>{
//     //     console.log("Connected to Mongo Successfully");
//     // })
//     try {
//         mongoose.connect(mongoURI, ()=>{
//             console.log("Connected to Mongo Successfully");
//         })
//     } catch (error) {
//         console.error(error);
//     }
// }
// getting-started.js
// const mongoose = require('mongoose');

const connectToMongo = () => {
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(mongoURI);
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
}
module.exports = connectToMongo;