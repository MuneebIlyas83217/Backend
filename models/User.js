import mongoose from "mongoose";

const user = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        sourceLanguage :String ,
        toLanguage:String,
        deliveryOptions:{
            type:String,
            enum:["Standard Delivery", "Express Delivery","Store Pick-Up"],
            default:""
        } ,
        message:{
            type:String,
            default:""
        },
        urgentReq:{
            type:Boolean,
            default:false
        },
        notarization:{
            type:Boolean,
            default:false
        }

    }
)

export default mongoose.model("User", user)