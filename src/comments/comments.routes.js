import { Router } from 'express';
import {
  createComment,
  getCommentsByPublication,
  deleteComment
} from '../comments/comments.controller.js';

const api = Router();

api.post('/createcomment', createComment);
api.get('/comments/:publicationId', getCommentsByPublication);
api.delete('/deletecomment/:id', deleteComment);

export default api;
