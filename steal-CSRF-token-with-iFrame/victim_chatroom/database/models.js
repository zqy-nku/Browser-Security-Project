module.exports = { 
    user:{ 
        name:{type:String,required:true},
        password:{type:String,required:true},
        status:{type:String,default: "down"}
    },
    message:{
        name:{type:String,required:true},
        content:{type:String,required:true},
        time:{type:String,required:true}
    }
};