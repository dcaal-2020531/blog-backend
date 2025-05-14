import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    authorName: {
        type: String,
        required: [true, 'Author name is required'],
        maxLength: [50, 'Name cannot exceed 50 characters']
    },
    content: {
        type: String,
        required: [true, 'Comment content is required'],
        maxLength: [1000, 'Comment cannot exceed 1000 characters']
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: [true, 'Associated publication is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

commentSchema.methods.toJSON = function () {
    const { __v, ...comment } = this.toObject();
    return comment;
};

export default model('Comment', commentSchema);
