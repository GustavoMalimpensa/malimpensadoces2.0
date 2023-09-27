import { Request, Response } from "express"
import { userRepository } from "../services/UserService"

export class UserPageController {

    async CreateUser(req: Request, res: Response) {
        const { name } = req.body; // Certifique-se de que as informações do usuário sejam enviadas no corpo da solicitação.
    
        try {
            const newuser = userRepository.create({ name })

            await userRepository.save(newuser)

            return res.status(201).json(newuser)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    //Lista todos os produtos que os usuarios cadastraram (por usuario)
    async listUserpost(req: Request, res: Response){
        const { idUser } = req.params
        //Listando o usuario com suas informações
        try{
            const user_id = await userRepository.findOneBy({id: Number(idUser)})

            if(!user_id) {
                return res.status(404).json({message: 'Esse usuario não existe!'})
            }

            const user =await userRepository.find({
                relations: {
                    Products: true,
                },
            })

            return res.json(user)
        }catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Server Error' })
        }
    }

    //lista todos os no banco usuarios do banco de  dados
    async listUser(req: Request, res: Response) {
    try {
        const users = await userRepository.find(); // Isso irá buscar todos os produtos no banco de dados
    
        return res.json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
    }


    
}


