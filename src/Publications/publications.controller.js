import Publication from './publications.model.js';
import mongoose from 'mongoose';

export const createPublication = async (req, res) => {
  try {
    const { title, content, course, image } = req.body;
    const publication = new Publication({ title, content, course, image });
    await publication.save();
    res.status(201).json({ success: true, message: 'Publicación creada', publication });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear la publicación', error });
  }
};

export const getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find().populate('course').sort({ createdAt: -1 });
    res.status(200).json({ success: true, publications });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener publicaciones', error });
  }
};

export const getPublicationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' });

    const publication = await Publication.findById(id).populate('course');
    if (!publication) return res.status(404).json({ message: 'Publicación no encontrada' });

    res.status(200).json(publication);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la publicación', error });
  }
};

export const updatePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, course, image, isPublished } = req.body;

    const updated = await Publication.findByIdAndUpdate(id, { title, content, course, image, isPublished }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Publicación no encontrada' });

    res.status(200).json({ success: true, message: 'Publicación actualizada', publication: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar la publicación', error });
  }
};

export const deletePublication = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Publication.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Publicación no encontrada' });

    res.status(200).json({ success: true, message: 'Publicación eliminada' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar la publicación', error });
  }
};
