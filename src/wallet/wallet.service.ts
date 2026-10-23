import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import type { EntityRepository } from '@mikro-orm/postgresql';

import { Money } from '../common/money';
import { Wallet } from './wallet.entity';
import { WalletSchema, type WalletRecord } from './walletschema';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletSchema)
    private readonly walletRepository: EntityRepository<WalletRecord>,
  ) {}

  async findById(walletId: string): Promise<Wallet> {
    const record = await this.walletRepository.findOne({
      id: walletId,
    });

    if (!record) {
      throw new NotFoundException('Wallet not found.');
    }

    return Wallet.rehydrate({
      id: record.id,
      playerId: record.playerId,
      balance: Money.from({
        amount: record.balanceAmount,
        currency: record.currency,
      }),
      version: record._version,
      createdAt: record.createdAt,
      updatedAt: record._updatedAt,
    });
  }
}
