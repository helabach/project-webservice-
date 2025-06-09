import { ObjectType, Field, Int } from '@nestjs/graphql';
import { OfferType } from 'src/enums/offer-type.enum';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Offer {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column()
  title: string;
  @Field()
  @Column()
  description: string;
  @Field()
  @Column()
  type: OfferType;
  @Field({ nullable: true })
  @Column({ type: 'date', nullable: true })
  deadline: Date;
  @Field()
  @CreateDateColumn()
  createdAt: Date;
  @Field(() => User)
  @ManyToOne((user) => User, { onDelete: 'CASCADE' })
  createdBy: User;
}
