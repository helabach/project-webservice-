import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OfferService } from './offer.service';
import { Offer } from './entities/offer.entity';
import { CreateOfferInput } from './dto/create-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';
import { OfferType } from 'src/enums/offer-type.enum';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { LoggedUser } from 'src/decorator/logged-user.decorator';

@Resolver(() => Offer)
@UseGuards(JwtAuthGuard)
export class OfferResolver {
  constructor(private readonly offerService: OfferService) { }

  @Mutation(() => Offer)
  createOffer(
    @LoggedUser() user,
    @Args('createOfferInput') createOfferInput: CreateOfferInput
  ) {
    return this.offerService.create(createOfferInput, user.id);
  }

  @Query(() => [Offer])
  getOffers(
    @Args('type', { nullable: true, type: () => String }) type?: OfferType,
  ) {
    return this.offerService.getOffers(type);
  }

  @Query(() => [Offer])
  getOffersOfUser(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('type', { nullable: true, type: () => String }) type?: OfferType,
  ) {
    return this.offerService.getOffersOfUser(userId, type);
  }

  @Query(() => Offer)
  getOfferById(@Args('id', { type: () => Int }) id: number) {
    return this.offerService.findOne(id);
  }


  @Mutation(() => Offer)
  removeOffer(@Args('id', { type: () => Int }) id: number) {
    return this.offerService.remove(id);
  }
}
