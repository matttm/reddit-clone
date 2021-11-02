import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    createdAt: Date;
    updatedAt: Date;
}
