import * as dbService from "../../DB/service/db.service.js";
import messageModel from "../../DB/models/message.model.js";

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
                userId: req.user._id
            }
        });

        res.status(200).json(message);
    } catch (error) {
        next(error);
    }
};

