import express from 'express'
// import User from '../models/User'
// import nodemailer from 'nodemailer'
// import jwt from 'jsonwebtoken'

const router=express.Router()

router.get('/search',(req,res)=>{
    res.json({
        books:[
        {
            goodreadsId:1,
            title:'book1',
            authors:'somebody',
            covers:['https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
            pages:98
        },
        {
            goodreadsId:2,
            title:'book2',
            authors:'somebody2',
            covers:['https://images.pexels.com/photos/5834/nature-grass-leaf-green.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'],
            pages:98
        }
    ]})
})

export default router