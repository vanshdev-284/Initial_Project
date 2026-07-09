/*First method*/
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {                    //ye higher order function h to return krna padega
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}



// const asyncHandler = (fn) => async(req,res,next) => {
//     try{
//         await fn(req,res,next)
//     }
//     catch(error){
//         res.status(error.code || 500).json({
//             sucess: false,
//             message: error.message
//         })
//     }
// }
export {asyncHandler}