const asyncHandeler=(func)=>{

return (req,res,next)=>{
    Promise.resolve(func(req,res,next)).catch((err)=>next(err))
}

}



export {asyncHandeler}


// const asyncHandeler=()=>{}
// const asyncHandeler=(func)=>()=>{}
// const asyncHandeler=(func)=>async()=>{}

//higher order function that is function exectuting another function here we are generilizing a wrpper so that bar bar hame try cath for fetch api or url etc na karn pare and simply we can use this wrapper or utili for asyn fn with try catch or ().then().catch()
// const asyncHandeler=(fn)=>async(req,res,next)=>{
//     try{
//          await fn(req,res,next)
//     }
//     catch(err){
//         res.status(err.code||500).json({
//             sucess:false,
//             message:err.message
//         })
//     }
// }