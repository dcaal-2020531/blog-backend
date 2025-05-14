import { Schema, model } from 'mongoose';

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Course name is required'],
        unique: true,
        maxLength: [50, 'Course name cannot exceed 50 characters']
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
    },
    area: {
        type: String,
        default: 'Área técnica'
    }
});

courseSchema.methods.toJSON = function () {
    const { __v, ...course } = this.toObject();
    return course;
};

export default model('Course', courseSchema);
