 import { Request, Response } from "express"
import { ProductRepository } from "../services/ProductService"
import fs from "fs"
import path from "path"

export class ProductPageController {

    async CreateProduct(req: Request, res: Response) {
        console.log('Recebendo uma solicitação para /products');
        console.log('Corpo da Requisição:', req.body);
        const { category, name, content, price, user_id } = req.body;
        const file = req.file;
    
        if (!name) {
            return res.status(400).json({ message: 'Nome do produto está vazio!' });
        }
    
        if (!category) {
            return res.status(400).json({ message: 'Categoria do produto está vazia!' });
        }
    
        if (content.length > 777) {
            return res.status(400).json({ message: 'As características do produto devem ter no máximo 777 caracteres!' });
        }
    
        if (!price) {
            return res.status(400).json({ message: 'Preço do produto está vazio!' });
        }
    
        if (!user_id) {
            return res.status(400).json({ message: 'Informe o usuário!' });
        }
    
        if (!file) {
            console.log('Nenhuma imagem foi recebida na requisição');
            return res.status(400).json({ message: 'Adicione pelo menos uma imagem!' });
        }
    
        try {
            const newProduct = ProductRepository.create({
                category, name, content, price, user_id, url: file?.filename,
            });
    
            await ProductRepository.save(newProduct);
    
            return res.status(201).json(newProduct);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    

    async deleteProduct(req: Request, res: Response) {
        const { id } = req.params;

        // Certifique-se de que o id seja um número
        const productId = parseInt(id);
      
        try {
          // Verifique se o produto existe
          const product = await ProductRepository.findOneBy({ id: Number(productId) });

          if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
          }

          // Crie o caminho completo para o arquivo
          const filePath = path.join('public/uploads/', product.url);


          fs.unlinkSync(filePath)
         
          // Remova o produto do banco de dados
          await ProductRepository.remove(product);
      
          return res.status(200).json({ message: 'Produto excluído com sucesso' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async editeProduct (req: Request, res: Response) {
        
        const { id } = req.params;
        // Certifique-se de que o id seja um número
        const productId = parseInt(id);
        const { category, name, content, price } = req.body;

        try {
        // Verifique se o produto existe
        const product = await ProductRepository.findOneBy({ id: Number(productId) });

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }

        // Atualize os campos do produto
        product.category = category;
        product.name = name;
        product.content = content;
        product.price = price;

        // Salve as alterações no banco de dados
        await ProductRepository.save(product);

        return res.status(200).json({ message: 'Produto editado com sucesso' });
        } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
        }
        
    }
    
    async listProducts(req: Request, res: Response) {
        try {
          const products = await ProductRepository.find(); // Isso irá buscar todos os produtos no banco de dados
      
          // Corrige o formato da URL das imagens
          const productsWithFixedURLs = products.map(product => {
            product.url = product.url.replace(/\\/g, '/'); // Substitui todas as barras invertidas por barras normais
            return product;
        });
      
          return res.json(productsWithFixedURLs);
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}


