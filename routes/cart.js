const express = require('express')
const productModel = require('../models/product.model')
const cartModel = require('../models/cart.model')
const router = express.Router()
router.get('/', async(req, res) => {
    try {
        //req.session.cart=null
        let cart=[]
        let total=0
        if(req.session.cart){
            cart = req.session.cart.items
            total =req.session.cart.priceTotal
        }
        res.render('carts/cart', { cart:cart,total:total})
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }

})
router.get('/add/:id', async(req, res) => {
    try {
        console.log("add")
        const product = await productModel.findById(req.params.id)
        const cart=new cartModel(req.session.cart ? req.session.cart:{items:[]})
        cart.add(product, req.params.id, product.imageSrc)
        req.session.cart = cart
        //res.send("Thêm thành công")
        res.redirect('/cart')
    } catch (e) {
        console.log(e.message)
        res.redirect('/')
    }
})
router.delete('/:id', (req, res) => {
    try {
        const id=req.params.id
        const cart = new cartModel(req.session.cart)
        cart.delete(id)
        req.session.cart = cart
        res.send("Xóa thành công")
        //res.redirect('/cart')
    } catch(e){
        res.send("Xóa thất bại")
        console.log(e.message)
        //res.redirect('/')
    }
})
router.put('/reduce/:id',(req, res)=>{
    try{
        const id = req.params.id
        const cart = new cartModel(req.session.cart)
        cart.reduce(id)
        req.session.cart = cart
        res.send("Giảm thành công")
        //res.redirect('/cart')
    }catch(e){
        console.log(e.message)
        res.send("Giảm thất bại")
       // res.redirect('/')
    }
})
router.put('/increase/:id',(req, res)=>{
    try{
        const id = req.params.id
        const cart = new cartModel(req.session.cart)
        cart.increase(id)
        req.session.cart = cart
        res.send("Tăng thành công")
        //res.redirect('/cart')
    }catch(e){
        res.send("Tăng thất bại")
        console.log(e.message)
        //res.redirect('/')
    }
})
module.exports = router