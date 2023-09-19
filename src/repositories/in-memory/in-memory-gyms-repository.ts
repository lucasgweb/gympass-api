import { IGymsRepository } from '../gyms-repository';
import { Gym } from '@prisma/client';

export class InMemoryGymsRepository implements IGymsRepository{
  public items: Gym[] = [];

  async findById(id: string) {
    return this.items.find(item => item.id === id) ?? null;
  }
}