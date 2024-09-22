const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const register = async (req,res)=> {
    try{
        const {username, password, role} = req.body;
        const hashedPassword = await bycrypt.hash(password,10);
     
        const newUser = new User({username,password:hashedPassword,role});
     
        await newUser.save();
     
        res.status(201).json({
         message: `User registered successfully with username ${username}`,
        })
     
    }catch(error){
        res.status(500).json({
            message: `Something Went Wrong! ${error.message}`,
           })
        
    }
  
};

const login = async (req,res)=> {

   try{
    const {username, password} = req.body;
    const user = await User.findOne({username});

    if(!user){
        return res.status(404).json ({
            message: `User not found with username ${username}`,
        })
    }

    const isMatch = await bycrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            message: `Invalid Password`,
        })
    }

    const token = jwt.sign({id:user._id, role:user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});

    res.status(200).json({token});


   } catch(error){
    res.status(500).json({
        message: `Something Went Wrong! ${error.message}`,
       })
   }

};

module.exports = {
    register,
    login,
}