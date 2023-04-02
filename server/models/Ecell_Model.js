const mongoose = require('mongoose');

const ecellSchema = new mongoose.Schema(
    {
        name : { type: String, required: true},
        email: { type: String, required: true, trim: true,lowercase: true},
        logo : { type: String, default: ""},
        startups: [{
            name: {type: String,required: true},
            description: { type: String,required: true},
            logo : { type: String, default: ""},
        }],
        college : { type: String, required:true}
    },{ timestamps: true}
);
  
  
module.exports = mongoose.model("Ecell", ecellSchema);
