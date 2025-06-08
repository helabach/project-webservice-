import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCandidatureInput } from './dto/create-candidature.input';
import { Candidature } from './entities/candidature.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OfferService } from '../offer/offer.service';
import { UsersService } from 'src/users/users.service';
import { CandStatus } from 'src/enums/candidature-status.enum';

@Injectable()
export class CandidatureService {
  constructor(
    @InjectRepository(Candidature)
    private readonly candidatureRepo: Repository<Candidature>,
    private readonly offerService: OfferService,
    private readonly userService: UsersService,
  ) { }
  async create(offerId: number, candidatId: number) {
    const candidat = await this.userService.findOne(candidatId)
    const offer = await this.offerService.findOne(offerId)
    await this.checkCandidatureExiste(candidat.id, offer.id);
    if (offer.createdBy.id === candidat.id) {
      throw new ConflictException('Cannot perform action on yourself');
    }

    const createCandidature = this.candidatureRepo.create({
      offer, candidat
    })
    return this.candidatureRepo.save(createCandidature);
  }

  async findAllOfoffer(offerId: number) {
    await this.offerService.findOne(offerId);
    return this.candidatureRepo.find({
      where: {
        offer: {
          id: offerId
        }
      }
    });
  }


}
