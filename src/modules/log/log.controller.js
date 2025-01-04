import { Log } from "../../DataBase/models/Log.model.js";
import { deleteByIdHandler, getAllHandler, getByIdHandler } from "../../handler/handler.js";
import { AppError, catchError } from "../../utilities/error/error.js";

export const getAllLogs = getAllHandler(Log,['collectionName','action'],['actionBy','item'])

export const getLog = getByIdHandler(Log,'log.notFound',['actionBy','item']);

export const deleteLog = deleteByIdHandler(Log,"log.notFound",'log.deleted')

export const ClearLogs = catchError(async (req,res,next)=>{
    const logs = await Log.find()
    if(logs.length === 0) return next(new AppError('log.noLogs',409))
    await Log.deleteMany()
    res.json({
        statusMessage:'success',
        message:req.t('log.deletedAll')
    })
    return next()
})