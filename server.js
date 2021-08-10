const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const categoryRouter = require('./routes/category')
const productRouter = require('./routes/product')
const cartRouter = require('./routes/cart')
const session = require('express-session');
const mongose = require('mongoose')
const app = express()


const connectFunction = async() => {
    try {
        await mongose.connect('mongodb://localhost/bai2', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log("connected succesfully")
    } catch (e) {
        console.log(e)
        console.log("connection failed")
    }
}

connectFunction()
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 }
}))
app.use((req,res,next)=>{
    res.locals.session = req.session;
    next();
})
app.use(express.urlencoded({ extended: false, limit: '10mb' }))

app.set('view engine', 'ejs')
app.use(expressLayouts);
app.set('layout', 'layouts/layout')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use('/', indexRouter)
app.use('/category', categoryRouter)
app.use('/product', productRouter)
app.use('/cart', cartRouter)

app.listen(27017)