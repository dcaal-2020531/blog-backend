import { Router } from 'express';
import {
  createPublication,
  getAllPublications,
  getPublicationById,
  updatePublication,
  deletePublication
} from '../Publications/publications.controller.js';

const api = Router();

api.post('/createpublication', createPublication);
api.get('/allpublications', getAllPublications);
api.get('/publication/:id', getPublicationById);
api.put('/editpublication/:id', updatePublication);
api.delete('/deletepublication/:id', deletePublication);

export default api;
