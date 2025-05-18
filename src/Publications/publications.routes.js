import { Router } from 'express';
import {
  createPublication,
  getAllPublications,
  getPublicationById,
  updatePublication,
  deletePublication
} from '../Publications/publications.controller.js';

const api = Router();

api.post('/posts', createPublication);
api.get('/posts', getAllPublications);
api.get('/posts/:id', getPublicationById);
api.put('/posts/:id', updatePublication);
api.delete('/posts/:id', deletePublication);

export default api;
