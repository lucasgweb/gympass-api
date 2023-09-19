import { Gym } from '@prisma/client';
import { IGymsRepository } from '@/repositories/gyms-repository';

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    title,
    description,
    phone,
    latitude,
    longitude
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    

    const gym = await this.gymsRepository.create({
      title,
      phone,
      description,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}
