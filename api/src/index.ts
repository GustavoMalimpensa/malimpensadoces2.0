import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import routes from './routes';


AppDataSource.initialize().then(() => {

  const app = express();
  const bodyParser = require('body-parser');

  // Configuração do CORS para permitir todas as origens
  app.use(cors({
    origin: 'http://localhost:4200', // Endereço das requisições
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Permite o uso de cookies, caso seja necessário
  }));

  app.use(bodyParser.json({ limit: '100mb' })); 

  app.use("/images", express.static("public/uploads"))

  app.use(express.json());
  app.use(routes);


  return app.listen(process.env.PORT);
  
});









