import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCandidatureInput {
  @Field(() => Int)
  offerId: number;
}
