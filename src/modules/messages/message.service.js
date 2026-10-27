import * as dbService from "../../DB/service/db.service.js";
import messageModel from "../../DB/models/message.model.js";
import userModel from "../../DB/models/user.model.js";

export const createMessage = async (req, res, next) => {
    try {
        const { content } = req.body;

        if (!content && !req.files?.length) {
            throw new Error("Content is required");
        }

        const urls = [];
        if (req.files?.length) {
            for (const file of req.files) {
                urls.push(file.path);
            }
        }

        const message = await dbService.create({
            model: messageModel,
            data: {
                content,
                attachments: urls,
                userId: req.params.userId
            }
        });

        res.status(200).json(message);
    } catch (error) {
        next(error);
    }
};
export const getMessage = async (req, res, next) => {
    const messages = await dbService.find({
        model: messageModel,
        filter: {
            
            userId: req.user._id
        }
    });
    return res.status(200).json(messages);

};
export const getMessageById = async (req, res, next) => {
    const message = await dbService.findOne({
        model: messageModel,
        filter: {
            _id: req.params.id,
            userId: req.user._id
        }
    });
    return res.status(200).json(message);

};




