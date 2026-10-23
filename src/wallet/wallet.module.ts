import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { WalletSchema } from './walletschema';

@Module({
  imports: [MikroOrmModule.forFeature([WalletSchema])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
