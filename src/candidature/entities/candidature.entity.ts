import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CandStatus } from 'src/enums/candidature-status.enum';
import { Offer } from 'src/offer/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
//@Unique(["candidat", "offer"])
export class Candidature {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  @Field()
  @Column({ default: CandStatus.PENDING })
  status: CandStatus;
  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  candidat: User;
  @Field(() => Offer)
  @ManyToOne(() => Offer, {
    onDelete: 'CASCADE',
  })
  offer: Offer;
}
