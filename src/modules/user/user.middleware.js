import { User } from "../../DataBase/models/user.model.js";
import { Role } from "../../utilities/enum/userRole.enum.js";
import { AppError, catchError } from "../../utilities/error/error.js";

export const isTheUserOrAdmin = catchError(async (req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        return next(new AppError('auth.userNotFound'),404)
    }
    const isAuthorized = String(user._id) === req.params.id || req.user.role === Role.ADMIN;
    if (!isAuthorized) {
        return next(new AppError('auth.unauthorize'),498)
    }
    return next()

})