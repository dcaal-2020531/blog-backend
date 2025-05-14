import Course from './courses.model.js';
import mongoose from 'mongoose';

export const createCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    const course = new Course({ name, description });
    await course.save();
    res.status(201).json({ success: true, message: 'Curso creado', course });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear el curso', error });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener cursos', error });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' });

    const course = await Course.findById(id);
    if (!course) return res.status(404).json({ message: 'Curso no encontrado' });

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el curso', error });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updated = await Course.findByIdAndUpdate(id, { name, description }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Curso no encontrado' });

    res.status(200).json({ success: true, message: 'Curso actualizado', course: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar el curso', error });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Course.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Curso no encontrado' });

    res.status(200).json({ success: true, message: 'Curso eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar el curso', error });
  }
};
