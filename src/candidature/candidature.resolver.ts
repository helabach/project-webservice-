import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CandidatureService } from './candidature.service';
import { Candidature } from './entities/candidature.entity';
import { CreateCandidatureInput } from './dto/create-candidature.input';
import { LoggedUser } from 'src/decorator/logged-user.decorator';
import { CandStatus } from 'src/enums/candidature-status.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';

@Resolver(() => Candidature)
@UseGuards(JwtAuthGuard)
export class CandidatureResolver {
  constructor(private readonly candidatureService: CandidatureService) { }

  @Mutation(() => Candidature)
  createCandidature(
    @LoggedUser() user,
    @Args('offerId', { type: () => Int }) offerId: number,
  ) {
    return this.candidatureService.create(offerId, user.id);
  }

  @Mutation(() => Candidature)
  updateStatus(
    @Args('status') status: CandStatus,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.candidatureService.updateStatus(id, status);
  }
  @Query(() => [Candidature],)
  getAllCandidatureOfOffer(
    @Args('offerId', { type: () => Int }) offerId: number,
  ) {
    return this.candidatureService.findAllOfoffer(offerId);
  }

  @Query(() => Candidature,)
  getCandidatureById(@Args('id', { type: () => Int }) id: number) {
    return this.candidatureService.findOne(id);
  }

}
