import { Injectable, NotFoundException } from '@nestjs/common';
import { BankAccountsRepository } from 'src/shared/database/repositories/bank-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private readonly bankAccountRepo: BankAccountsRepository) {}

  async validate(userId: string, bankAccountId) {
    const isOwner = await this.bankAccountRepo.findFirst({
      where: { userId, id: bankAccountId },
    });

    if (!isOwner) {
      throw new NotFoundException();
    }
  }
}
