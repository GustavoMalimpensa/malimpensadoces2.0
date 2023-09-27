import { Request, Response } from "express"
import { ClientRepository } from "../services/ClientService"

export class ClientPageController {

    async CreateClient(req: Request, res: Response) {
        const { name, phone } = req.body
      
        if (!name) {
            return res.status(400).json({ message: 'Precisa preencher o nome!'})
        }

        if (!phone) {
            return res.status(400).json({ message: 'Informe seu número de telefone!'})
        }

        try {
            const newClient = ClientRepository.create({ name, phone })

            await ClientRepository.save(newClient)

            return res.status(201).json(newClient)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }

    }

    //lista todos os clientes no banco de dados
    async listClients(req: Request, res: Response) {
        try {
          const clients = await ClientRepository.find(); // Isso irá buscar todos os produtos no banco de dados
      
          return res.json(clients);
        } catch (error) {
          console.log(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    
    //esse cara lista tudo que cada cliente comprou
    async listPurchase(req: Request, res: Response){
        const { idUser } = req.params
        //Listando o usuario com suas informações
        try{
            const user_id = await ClientRepository.findOneBy({id: Number(idUser)})

            if(!user_id) {
                return res.status(404).json({message: 'Esse usuario não existe!'})
            }

            const user =await ClientRepository.find({
                relations: {
                  //  Products: true,
                },
            })

            return res.json(user)
        }catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

}


