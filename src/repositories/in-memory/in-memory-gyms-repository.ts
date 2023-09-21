import { randomUUID } from 'crypto';
import { IFindManyNearbyParams, IGymsRepository } from '../gyms-repository';
import { Gym, Prisma } from '@prisma/client';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async findManyNearby(params: IFindManyNearbyParams) {
    return this.items.filter( item => {
      const distance = getDistanceBetweenCoordinates({
        latitude: params.latitude,
        longitude: params.longitude
      }, 
      {
        latitude: item.latitude.toNumber(),
        longitude: item.longitude.toNumber()
      });

      return distance < 10;
    });
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };

    this.items.push(gym);

    return gym;
  }
}
