import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes';
import path from "path";

AppDataSource.initialize().then(() => {

  const app = express();

  // Configuração do CORS para permitir todas as origens
  app.use(cors({
    origin: 'http://localhost:4200', // Substitua pelo domínio da sua aplicação Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite o uso de cookies, caso seja necessário
  }));

  // Configure o middleware para servir arquivos estáticos na pasta de imagens
  app.use('/images', express.static(path.join(__dirname, 'public/uploads')));

  app.use(express.json());
  app.use(routes);

  return app.listen(process.env.PORT);
  
});
