import Comment from './comments.model.js';
import mongoose from 'mongoose';
import Publication from '../Publications/publications.model.js';

export const createComment = async (req, res) => {
  try {
    const { authorName, content, publication } = req.body;

    const comment = new Comment({ authorName, content, publication });
    await comment.save();

    await Publication.findByIdAndUpdate(publication, {
      $push: { comments: comment._id },
    });

    res.status(201).json({ success: true, message: 'Comentario creado', comment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al crear el comentario', error });
  }
};

export const getCommentsByPublication = async (req, res) => {
  try {
    const { publicationId } = req.params;
    const comments = await Comment.find({ publication: publicationId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, comments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los comentarios', error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Comentario no encontrado' });

    res.status(200).json({ success: true, message: 'Comentario eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar el comentario', error });
  }
};
