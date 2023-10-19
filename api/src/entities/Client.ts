import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('client')
export class client {

    //ID  auto incremento 
    @PrimaryGeneratedColumn()
    id: number
    //Declarando que o nome do usuário é um texto
    @Column({type: 'text' })
    name: string
    // Adicione um campo para o número de telefone
    @Column({ type: 'varchar', length: 20, unique: true }) 
    phone: string;

}
