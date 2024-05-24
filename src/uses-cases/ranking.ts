import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UsersRepository, userRole } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { SalesRepository } from '@/repositories/sales-repository'

interface Position {
  position: string
  name: string
  avatarURL?: string
  vgv: number
}
interface RankingUseCaseRequest {
  month?: number,
  year?: number
}

interface RankingUseCaseResponse {
  ranking: Position[]
}

export class RankingUseCase {
  constructor(private salesRepository: SalesRepository, private usersRepository: UsersRepository) {}

  async execute({
    month,
    year
  }: RankingUseCaseRequest): Promise<RankingUseCaseResponse> {
    return {
      ranking: []
    }
  }   
}
