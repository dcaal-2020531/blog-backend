        'use strict'

    import express from 'express' //Servidor HTTP
    import morgan from 'morgan' //Logs
    import helmet from 'helmet' //Seguridad para HTTP
    import cors from 'cors' //Acceso al AP
    import courseRoutes from '../src/Courses/courses.routes.js'
    import publicationRoutes from '../src/Publications/publications.routes.js'
    import commentRoutes from '../src/comments/comments.routes.js'


    const configs = (app)=>{
        app.use(express.json()) //Aceptar y enviar datos en JSON
        app.use(express.urlencoded({extended: false})) //No encriptar la URL
        app.use(cors())
        app.use(helmet())
        app.use(morgan('dev'))
    }

const routes = (app)=>{
    app.use('/v1/course', courseRoutes);
    app.use('/v1/publication', publicationRoutes);
    app.use('/v1/comment', commentRoutes);

}

export const initServer = async()=>{
    const app = express() //Instancia de express
    try{
        configs(app) //Aplicar configuraciones al servidor
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch(err){
        console.error('Server init failed', err)
    }
}