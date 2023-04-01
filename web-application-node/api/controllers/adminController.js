const { json } = require('body-parser');
const express = require('express')
const User = require('../models/userSchema')
const Admin = require('../models/adminSchema')
const jwt = require('jsonwebtoken')



module.exports = {
    getUsers: async (req, res) => {

        console.log("user details");
        try {
            const users = await User.find({ isDeleted: false }, "-password")
            console.log(users);
            return res.status(200).json({ users })

        } catch (error) {
            console.log(error);
            return res.status(404).json({ message: "No data found" })
        }

    },
    deleteUser: async (req, res) => {
        const { id } = req.body
        console.log(id);
        try {
            const usersData = await User.findOneAndUpdate({ _id: id }, { $set: { isDeleted: true } })
            console.log(usersData + "delseted user");
            const users = await User.find({ isDeleted: false }, "-password")
            return res.status(200).json({ users })
        }
        catch (error) {
            console.log(error);
        }


    },
    getUserForEdit: async (req, res) => {
        console.log("get user");
        const { id } = req.params
        console.log(id);
        try {
            const user = await User.find({ _id: id }, "-password")
            console.log(user);
            res.status(200).json({ user })
        }
        catch (error) {
            console.log(error);
            res.status(404)
        }

    },
    editUser: async (req, res) => {
        console.log("edit user");
        const { id } = req.params
        console.log(id);

        console.log(req.body.username);
        console.log(req.body.email);
        try {
            await User.findOneAndUpdate({ _id: id }, { $set: { username: req.body.username, email: req.body.email } })
            console.log("user updated");
            return res.status(200).json({ message: "user updated" })

        }
        catch (error) {
            console.log(error);
            res.status(404)
        }
    },
    signIn: async (req, res) => {
        try {
            console.log("sign in");
            const { username, password } = req.body
            const admin = await Admin.find({ username: username })
            if (admin.length > 0) {
                console.log(password + "password");
                console.log(admin[0].password + "user password");
                if (password == admin[0].password) {
                    console.log("user not exist");

                    // jwt token creation
                    const token = jwt.sign({ username: admin.username }, 'secret123', { expiresIn: "3d" });
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
                res.json("not signup")
            }
        }
        catch (error) {
            console.log(error);
        }

    },
    verifyAdminToken: (req, res, next) => {

        console.log("admin token veryfy");
        const token = req.headers['x-access-token']
        if (!token) {
            res.status(404).json({ message: "No token found" })
        }
        jwt.verify(token, 'secret123', (err, user) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Token" })
            }
            console.log(user.username + " username inside the verify token");
            req.email = user.email
        })
        next()
    },



addUser: async (req,res) => {
    console.log("add user ");
    try{
    const image = req.file
    const path = image.path.slice(7)
    const filepath = `http://localhost:9000/${path}`
    const user = await User.find({ email: req.body.email })
  
    if (user.length > 0) {
     return res.json({user})
    }
    else{ 
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password:req.body.password,
      image: filepath
    })
    
    await newUser.save()
    console.log("user added"); 
   return res.status(200).json({newUser})
    
  }}
  catch(error){
     
  }
},
searchUser: async(req, res) => {
    try {
      const searchKey = req.body.search
      console.log(searchKey+" search key");
    //   const users = await User.find({$or: [{username: new RegExp(searchKey, 'i')}, {email: new RegExp(searchKey, 'i')}]})
    const users = await User.find({
        $and: [
          {$or: [{username: new RegExp(searchKey, 'i')}, {email: new RegExp(searchKey, 'i')}]},
          {isDeleted: false}
        ]
      });
      console.log(users)
      res.json({users})
    } catch (error) {
      console.log(error)
    }
  }
}