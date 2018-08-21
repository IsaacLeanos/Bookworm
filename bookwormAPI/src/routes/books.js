import express from 'express'
// import User from '../models/User'
// import nodemailer from 'nodemailer'
// import jwt from 'jsonwebtoken'

const router=express.Router()

router.get('/search',(req,res)=>{
    res.json({books:[
        {goodreadsId:1,
        title:'book1',
        authors:'somebody'},
        {goodreadsId:2,
        title:'book2',
        authors:'somebody2'},
        {goodreadsId:3,
        title:'book3',
        authors:'somebody3'}
    ]})
})

export default router