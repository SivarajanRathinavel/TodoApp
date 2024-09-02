const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Item', ItemSchema);




// //Mongoose model for the data we want to store.

// const mongoose =  require('mongoose')

// const ItemSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//     },
//     description:{
//         type:String,
//     } 
// })
// module.exports = mongoose.model('Item', ItemSchema)