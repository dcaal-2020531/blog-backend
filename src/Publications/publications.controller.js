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
    const publications = await Publication.find()
      .populate('course')
      .populate({
        path: 'comments',
        options: { sort: { createdAt: -1 } }
      })
      .sort({ createdAt: -1 });

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
}

export const defaultPublication = async () => {
  try {
    const existing = await Publication.findOne({ defaultCat: true });
    if (existing) {
      console.log('Las publicaciones predeterminadas ya existen.');
      return;
    }
    console.log('Creando las publicaciones predeterminadas…');

    const docs = [
      {
        title: 'Calculadora Científica Interactiva',
        content: 'Este proyecto es una aplicación de consola en Java que simula una calculadora científica interactiva. Permite al usuario seleccionar entre más de 15 operaciones matemáticas diferentes., Link del repositorio: https://github.com/dcaal-2020531/Proyectos-4to-5to-6to/tree/4to',
        course: 'Taller',
        defaultCat: true
      },
      {
        title: 'Pagina web Sobre Zoologia',
        content: 'Esta es una pagina web que habla sobre diferentes tipos de especies y su importancia para el ecosistema, Link del Repositorio: https://github.com/dcaal-2020531/Proyectos-4to-5to-6to/tree/4to',
        course: 'Tecnologia',
        defaultCat: true
      },
      {
        title: 'Gestor de Opiniones',
        content: 'Un gestor de Opiniones Link del Repositorio: https://github.com/dcaal-2020531/Gestor-de-Opiniones',
        course: 'Practica Supervisada',
        defaultCat: true
      },
      {
        title: 'Adoption System',
        content: 'Un sistema para poder adoptar mascotas, Link del Repositorio: https://github.com/dcaal-2020531/AdoptionSystem',
        course: 'Taller',
        defaultCat: true
      },
      {
        title: 'Coperex',
        content: 'Sistestema para administrar compañias Link del Repositorio: https://github.com/dcaal-2020531/Coperex',
        course: 'Tecnologia',
        defaultCat: true
      },
      {
        title: 'TICS',
        content: 'En la clase de TICS se realizan mayormente ejercicios sobre conocimientos de la tecnologia por lo que no hay links a algun tipo de repositorio que contenga codigo.',
        course: 'TICS',
        defaultCat: true
      },
      {
        title: 'Armado PC',
        content: 'Proyecto Donde se desarma una PC y se ven sus componentes. Link del Repositorio con fotos: https://github.com/dcaal-2020531/Proyectos-4to-5to-6to/tree/4to',
        course: 'TICS',
        defaultCat: true
      }
    ];

    await Publication.insertMany(docs);
    console.log('Publicaciones predeterminadas creadas correctamente');
  } catch (err) {
    console.error('Error al crear las publicaciones predeterminadas:', err);
  }
}


