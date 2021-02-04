import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import patch from 'path';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();

    mongoose.connect(
      'mongodb+srv://devhouse:devhouse@devhouse.zegag.mongodb.net/devhouse?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }

  middlewares() {
    this.server.use(cors()); // qualquer um acesso a api ou {objeto=origin=dominio=unico}

    this.server.use(
      '/files',
      express.static(patch.resolve(__dirname, '..', 'uploads'))
    ); // virtualizacao da url para abrir imagem do bd

    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
