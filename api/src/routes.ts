import { Router } from "express"
import { ProductPageController } from "./controllers/ProductPageController"
import { ClientPageController } from "./controllers/ClientPageController"
import { UserPageController } from "./controllers/UserPageController"
import multer from "multer"
import { storage } from "./config/multer"


const routes = Router()
const upload = multer({storage:storage}); // Obtenha o middleware Multer configurado
 


//Responsavel por criar os produtos
routes.post('/products', upload.single('file'), new ProductPageController().CreateProduct);
//Rota para excluir um produto pelo ID 
routes.delete('/products/:id', new ProductPageController().deleteProduct);
//Rota para editar um produto pelo ID 
routes.put('/editeproducts/:id', new ProductPageController().editeProduct);
//Listar todos os produtos
routes.get('/products/:idUser/listProduct', new ProductPageController().listProducts)

//Responsavel por adicionar  dados dos clientes 
routes.post('/client', new ClientPageController().CreateClient)
//Listar todos os clientes
routes.get('/client', new ClientPageController().listClients)   

//listar todos os usuario
routes.get('/user', new UserPageController().listUser)


export default routes