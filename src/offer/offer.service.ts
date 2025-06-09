import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfferInput } from './dto/create-offer.input';
import { UpdateOfferInput } from './dto/update-offer.input';
import { Offer } from './entities/offer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OfferType } from 'src/enums/offer-type.enum';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class OfferService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepo: Repository<Offer>,
    private readonly userService: UsersService,
  ) { }
  async create(createOfferInput: CreateOfferInput, userId: number) {
    const user = await this.userService.findOne(userId);
    const createOffer = this.offerRepo.create(createOfferInput);
    createOffer.createdBy = user;
    return await this.offerRepo.save(createOffer);
  }

  async getOffers(type?: OfferType) {
    if (type !== null) {
      return await this.offerRepo.find({
        where: { type: type },
        relations: {
          createdBy: true
        }
      });
    }
    return await this.offerRepo.find({
      relations: {
        createdBy: true
      }
    });
  }

  async getOffersOfUser(userId: number, type?: OfferType) {
    await this.userService.findOne(userId);
    if (type !== null) {
      return await this.offerRepo.find({
        where: {
          type: type,
          createdBy: { id: userId }
        }
      });
    }
    return await this.offerRepo.find({
      where: {
        createdBy: { id: userId }
      }
    });
  }

  async findOne(id: number) {
    const offer = await this.offerRepo.findOne(
      {
        where: { id },
        relations: {
          createdBy: true
        }
      }
    );
    if (!offer) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }
    return offer;
  }
  async remove(id: number) {
    const offer = await this.findOne(id);
    await this.offerRepo.remove(offer);
    return offer;
  }
}
