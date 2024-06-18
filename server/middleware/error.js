class ErrorHandler extends Error{
    constructor(message,statuscode){
        super(message);
        this.statuscode = statuscode;
    }
}

export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message || "Intenal Server Error"
    err.statuscode = err.statuscode || 500;
    return res.status(err.statuscode).json({
        success:true,
        message:err.message,
    });
};

export default ErrorHandler;