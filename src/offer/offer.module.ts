import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferResolver } from './offer.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Offer } from './entities/offer.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Offer]),
    UsersModule
  ],
  providers: [OfferResolver, OfferService],
  exports: [OfferService]
})
export class OfferModule {}
