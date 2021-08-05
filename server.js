const express=require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter=require('./routes/index')
const categoryRouter=require('./routes/category')
const productRouter=require('./routes/product')
const mongose=require('mongoose')
const app=express()


const connectFunction=async()=>{
    try{
        await mongose.connect('mongodb://localhost/bai2',{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("connected succesfully")
    }catch(e){
        console.log(e)
        console.log("connection failed")
    }
}

connectFunction()
app.use(express.urlencoded({ extended: false,limit:'10mb'}))

app.set('view engine', 'ejs')
app.use(expressLayouts);

app.set('layout','layouts/layout')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use('/',indexRouter)
app.use('/category',categoryRouter)
app.use('/product',productRouter)

app.listen(27017)