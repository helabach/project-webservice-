import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType() // declaration grapheql
@Entity() // table 
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  @Field()
  firstName: string;
  @Column()
  @Field()
  lastName: string;
  @Column({ unique: true })
  @Field()
  email: string;
  @Column()
  @Field()
  password: string;
}
