import { Router } from 'express';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} from '../Courses/courses.controller.js';

const api = Router();

api.post('/createcourse', createCourse);
api.get('/allcourses', getAllCourses);
api.get('/course/:id', getCourseById);
api.put('/editcourse/:id', updateCourse);
api.delete('/deletecourse/:id', deleteCourse);

export default api;
