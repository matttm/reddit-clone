import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class User {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    username: string;

    @Column({ unique: false })
    password: string;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @CreateDateColumn()
    updatedAt: Date;
}
