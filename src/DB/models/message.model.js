import joi from "joi";
import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    content:{
        type:String,
        required:function(){
            return this.attachments?.length ? true : false;
        }
        
    },
    attachments: [String],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    },{
        timestamps:true,
        strictQuery:true,
        strict:true,
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
})
const messageModel = mongoose.models.message || mongoose.model("message",messageSchema);
export default messageModel;
