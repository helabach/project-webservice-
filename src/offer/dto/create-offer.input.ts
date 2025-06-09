import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { OfferType } from 'src/enums/offer-type.enum';

@InputType()
export class CreateOfferInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;
  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;
  @Field()
  @IsEnum(OfferType)
  @IsNotEmpty()
  type: OfferType;
  @Field({ nullable: true })
  @IsOptional()
  @IsDateString()
  deadline: Date;

}
