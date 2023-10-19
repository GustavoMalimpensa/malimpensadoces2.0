import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { user } from "./user";

@Entity('Product')
export class Product {

    //Chave estrangeira
    @PrimaryGeneratedColumn()
    id: number
    // Adicione um campo para o serviço desejado
    @Column({ type: 'text' })
    name: string;
    //Decorator responsavel por criar automaticamente a data da criação
    @CreateDateColumn({type:'text'})
    category: string
    //Declarando o Productagem como texto e fala que pode ter 777 caracteris (Caracteristicas)
    @Column({type: 'text'})
    content: string
    // Adicione o preço do produto
    @Column({ type: 'integer' })
    price: number
    //Declarando a url como uma string para apontar para imagem
    @Column({ type: 'text'})
    url: string
    //Declarando para ficar mais fácil
    @Column({type: 'number'})
    user_id: number
    //Vão ter muitos Product para um autor
    @ManyToOne(() => user, user => user.Products)
    //Passo qual coluna na tabela de user vou estar referenciando  
    @JoinColumn({name: "user_id"})
    //Uma ray de Product, pois tem varios Products para um usuario
    user: user
}
  