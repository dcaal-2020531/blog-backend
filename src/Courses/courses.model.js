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
    class: {
        type: String,
         required: [true, 'Class  is required'],
         enum: ['Taller', 'TICS','Tecnologia', 'Practica Supervisada']
    }
});

courseSchema.methods.toJSON = function () {
    const { __v, ...course } = this.toObject();
    return course;
};

export default model('Course', courseSchema);
