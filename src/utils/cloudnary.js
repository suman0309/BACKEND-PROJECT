import {v2 as cloudinary} from "cloudinary"
import fs from "fs"



    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_Cloudname,
        api_key: process.env.CLOUDINARY_API_key, 
        api_secret:process.env. CLOUDINARY_API_secret // Click 'View API Keys' above to copy your API secret
    });


const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath){
            return null
        }
        else{
           const response= await cloudinary.uploader.upload(localFilePath,{
                resource_type:"auto"
            })
            console.log("file is uploaded on cloudinary",response.url)
            return response
        }
    }
    catch(err){
      //if uploads fails then remove from server to stop accumulation of malecious files
     fs.unlinkSync(localFilePath)
     return null


    }
}

export {uploadOnCloudinary}