const mongoose = require('mongoose');

const todoSchema=new mongoose.Schema({
    task:{
        type:String,
        require:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    complete_time:{
        type:Date,
        default:null
    },
    completed_at:{
        type:Date,
        default:Date.now()
    }
})

const Todo=new mongoose.model("Todo",todoSchema);

module.exports=Todo;