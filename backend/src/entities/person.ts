import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
@Entity()
export class Person {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ unique: true })
    username: string;

    @Column({ unique: false })
    password: string;

    @Field()
    @Column()
    count: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @CreateDateColumn()
    updatedAt: Date;
}
