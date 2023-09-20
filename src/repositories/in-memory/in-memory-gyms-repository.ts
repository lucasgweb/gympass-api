import { randomUUID } from 'crypto';
import { IGymsRepository } from '../gyms-repository';
import { Gym, Prisma } from '@prisma/client';

export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = [];

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null;
  }

  async searchMany(query: string, page: number) {
    return this.items.filter(item => item.title.includes(query))
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
