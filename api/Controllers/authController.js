const jwt=require('jsonwebtoken')
const User=require('../Model/userModel');

const signToken=(id)=>{
     return jwt.sign({id},  process.env.JWT_SECRET,  {
         expiresIn: process.env.JWT_EXPIRES_IN,
     })
}
     const createsendToken=(user, statusCode, req, res)=>{
          const token=signToken(user._id);
          res.cookie("jwt", token, {
             expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
             httpOnly: true,
             secure: req.secure || req.headers["x-forwarded-proto"]=="https"

          });
       
          user.password=undefined;
          res.status(200).json({
             status: "success",
             toekn,
             data: {
                 user
             }
          })

     }



     exports.signUp=async(req, res, next)=>{

        const {name, email, password, passwordConfirm}=req.body
         const newUser=await User.create({
              name,
              email,
              password,
              passwordConfirm
         });


         createsendToken(newUser, 201, req, res)
     }


     exports.login=async(req, res, next)=>{
          const {email, password}=req.body
          if(!email || !password){
              res.status(400).json({
                 status: "fail",
                 message: "please provide email and password"
              })
          }

          const user=await User.findOne({
                email
          }).select("+password")

          if(!user || !(await user.correctPassword(password, user.password))){
                res.status(401).json({
                     message: "incrroted email or password" 
                })
          }

          createsendToken(user, 200, req, res)
     }

     exports.buyMembership=async(req, res, next)=>{
          const updateUser=await User.findByIdAndUpdate(
              req.body.userID,
              {
                membershipType: req.body.membershipType
              },
              {
                new : true,
                runValidators: true
              }
          );
          res.status(200).json({
            title: "your account",
            user: updateUser
          })
     }
