import { CreateCandidatureInput } from './create-candidature.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCandidatureInput extends PartialType(CreateCandidatureInput) {
  @Field(() => Int)
  id: number;
}
