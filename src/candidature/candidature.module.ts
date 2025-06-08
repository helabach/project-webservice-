import { Module } from '@nestjs/common';
import { CandidatureService } from './candidature.service';
import { CandidatureResolver } from './candidature.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Candidature } from './entities/candidature.entity';
import { UsersModule } from 'src/users/users.module';
import { OfferModule } from 'src/offer/offer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Candidature,
      ]
    ),
    UsersModule,
    OfferModule,
  ],
  providers: [CandidatureResolver, CandidatureService],
})
export class CandidatureModule { }
