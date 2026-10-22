import { EntitySchema } from '@mikro-orm/core';

export interface WalletRecord {
  id: string;
  playerId: string;
  currency: string;
  balanceAmount: string;
  _version: number;
  createdAt: Date;
  _updatedAt: Date;
}

export const WalletSchema = new EntitySchema<WalletRecord>({
  name: 'WalletRecord',
  tableName: 'wallet',

  properties: {
    id: {
      type: 'uuid',
      primary: true,
    },
    playerId: {
      type: 'uuid',
      fieldName: 'player_id',
    },
    currency: {
      type: 'string',
      length: 3,
    },
    balanceAmount: {
      type: 'decimal',
      precision: 18,
      scale: 2,
      fieldName: 'balance_amount',
    },
    _version: {
      type: 'integer',
      fieldName: 'version',
      default: 1,
    },
    createdAt: {
      type: Date,
      fieldName: 'created_at',
    },
    _updatedAt: {
      type: Date,
      fieldName: 'updated_at',
    },
  },

  uniques: [
    {
      properties: ['playerId', 'currency'],
    },
  ],

  checks: [
    {
      expression:
        'balance_amount >= 0 AND balance_amount <= 9999999999999999.99',
    },
  ],
});
