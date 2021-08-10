const mongoose=require('mongoose')
const productModel=require('./product.model')
const categorySchema=new mongoose.Schema({
    name:{type:String,required:true,default:"Bánh Tráng Nướng Đà Lạt"}
},{timestamps:true})

categorySchema.pre('remove',async function(next){
    try
    {
        const products = await productModel.find({category:this.id})
        if(products.lengh>0)
        {
            next(new Error('Ko xóa dc nha'))
        }
    }catch(e){
        next()
    }
})
module.exports=mongoose.model('category',categorySchema)