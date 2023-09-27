import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";


@Entity('user')
export class user {
    //ID  auto incremento 
    @PrimaryGeneratedColumn()
    id: number
    //Declarando que o nome do usuário é um texto
    @Column({type: 'text' })
    name: string
    //Um user vai ser associado a várias Productagens
    @OneToMany(() => Product, Product => Product.user)
    //Uma array de Product, pois tem varios Products para um usuario.
    Products:Product[]
    
}
