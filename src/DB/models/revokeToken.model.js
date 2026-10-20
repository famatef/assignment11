import mongoose from 'mongoose';
const revokeTokenSchema = new mongoose.Schema({
    tokenId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type:mongoose.Types.ObjectId,
        ref:'user',
        required: true,
    },
    expireAt: Date,
},{
    timestamps: true,
    strict: true,
    strictQuery: true,
});
revokeTokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
const revokeTokenModel = mongoose.models.revokeToken || mongoose.model('revokeToken', revokeTokenSchema);
export default revokeTokenModel;
