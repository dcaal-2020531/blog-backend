import { Schema, model } from 'mongoose';

const publicationSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxLength: [100, `Title can't exceed 100 characters`],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    tags: {
        type: [String],
        default: [],
    },course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: [true, 'Course is required'],
},

});

publicationSchema.methods.toJSON = function () {
    const { __v, ...publication } = this.toObject();
    return publication;
};

export default model('Publication', publicationSchema);
