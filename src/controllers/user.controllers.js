import {asyncHandeler} from "../utils/asyncHandeler.js"
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudnary.js" 
import { Apiresponse } from "../utils/apiResponse.js";


const registerUser=asyncHandeler(async(req,res)=>{
   //get user details frontend||postman
   //validation empty or not format of email username
   //check if user already exist:username,email
   //check for images,check for avtar
   //if avilballeee =>upload them to cloudinary
   //check for avtar on cloudinary
   //create user object->create entry in db
   //remove password and refresh token field from response
   //check for user creation if ,-->yes return res

   
   const {fullname,email,username,password}=req.body
   console.log("email:",email);

//    if(fullname===""){
//     throw new ApiError(400,"fullname is required")
//    }

  if(
    [fullname,email,username,password].some((field)=>field?.trim()==="")
  ){
      throw new ApiError(400,"All fields are required")
  }

    const existedUser=User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"user with email and username already exist")
    }

    const avatarLocalPath=req.files?.avatar[0]?.path
    const coverImageLocalPath=req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    
    const avatar=  await uploadOnCloudinary(avatarLocalPath)
    const coverIamage=await uploadOnCloudinary(coverImageLocalPath)

     if(!avatar){
        throw new ApiError(400,"Avatar file is required")
     }
    
     const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage.url?.url||"",
        email,
        password,
        username:username.toLowercase()
     })

    const createdUser=await User.findById(user._id).select(
        "-password -refreshtoken"
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong while registering User")
    }
    return res.status(201).json(
        new Apiresponse(200,createdUser,"User registered succesfully")
    )


})

export {registerUser}