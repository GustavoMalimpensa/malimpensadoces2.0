 import { Request, Response } from "express"
import { ProductRepository } from "../services/ProductService"
import fs from "fs"


export class ProductPageController {

    async CreateProduct(req: Request, res: Response) {

        const { category, name, content, price, user_id } = req.body
        const file = req.file


        if (!name) {
            return res.status(400).json({ message: 'Nome do pruoduto está vazio!'})
        }

        if (!category) {
            return res.status(400).json({ message: 'Categoria do produto está vazia!'})
        }

        if (content.length > 777) {
            return res.status(400).json({ message: 'As caracteristicass do produto devem ter no máximo 777 caracteres!' })
        }
       
        if (!price) {
            return res.status(400).json({ message: 'Preço do produto está vazio!'})
        }

        if (!user_id) {
            return res.status(400).json({ message: 'Informe o usuario!'})
        }
        
        try {
            const newProduct = ProductRepository.create({
            category, name, content, price, user_id, url: file?.path, })

            await ProductRepository.save(newProduct)

            return res.status(201).json(newProduct)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
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

          fs.unlinkSync(product.url)
      
          // Remova o produto do banco de dados
          await ProductRepository.remove(product);
      
          return res.status(200).json({ message: 'Produto excluído com sucesso' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    

    async listProducts(req: Request, res: Response) {
        try {
          const products = await ProductRepository.find(); // Isso irá buscar todos os produtos no banco de dados
      
          return res.json(products);
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
      

}


