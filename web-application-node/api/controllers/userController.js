const { json } = require('body-parser');
const express = require('express')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')





module.exports = {
   register: async (req, res) => {
      console.log("is tot jfaskljlksa");
      console.log(req.body.formValues + "form values");
      const { username, email, password, confirmpassword } = req.body.formValues
      console.log(username);
      const user = await User.find({ email: email })
      if (user.length > 0) {
         console.log("user already exist");
         res.status(404)
      }
      else {

         const newUser = new User({
            username: username,
            email: email,
            password: password
         })
         await newUser.save()
         res.json({
            success: true,
            user: newUser
         })

      }
   },

   getHome: (req, res) => {
      console.log("its home");
   },
   signin: async (req, res) => {
      try {
         console.log("sign in");
         const { email, password } = req.body
         const user = await User.find({ email: email })
         if (user.length > 0) {
            console.log(password + "password");
            console.log(user[0].password + "user password");
            if (password == user[0].password) {
               console.log("user not exist");

               // jwt token creation
               const token = jwt.sign({ username: user.username, email: email }, 'secret123',{expiresIn:"3d"});
               console.log(token);
               // jwt token creation
     
            return res.json({
                  success: true,
                  user: token
               })
            }
            else {
               res.json("password")
            }

         } else {
            res.status(404)
         }
      }
      catch (error) {
         console.log(error);
      }
   },

   verifyToken:(req,res,next)=>{

     
const token = req.headers['x-access-token']
if(!token){
   res.status(404).json({message:"No token found"})
}
jwt.verify(token,'secret123',(err,user)=>{
   if(err){
      return res.status(400)
   }
   console.log(user.email +" email inside the verify token");
   req.email = user.email
})
next()
   },
   getData: async (req, res,next) => {
      console.log("entered the get data");
      const userEmail= req.email
      console.log(userEmail+" inside getData");
      let user
      console.log("-1");
      try{
        user = await User.find({ email: userEmail },"-password")
       console.log(user +" user in try");
      }catch (error) {
         console.log(error);
      return new Error(error)
      }
if(!user){
   console.log("1");
         return res.status(404)
      }
      else{
         console.log("2");
         console.log(user +" user data in the getData");
         return res.json({user})
      }
      
   },
   updateProfile:async(req,res)=>{
      console.log("profile update");
      const data = req.file
      console.log(data);
      if(!req.file){
         return res.status(404)
       }
       const path = data.path.slice(7)
       const filepath = `http://localhost:9000/${path}`
       try {
         await User.findOneAndUpdate({email: req.email}, {$set:{image: filepath}})
         console.log("file updated");
         res.json({success: true, url: filepath})
       } catch (error) {
         console.log(error)
       }

   }
  
}