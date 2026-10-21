import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

@Entity()
export class Wallet {
  @PrimaryKey()
  id!: number;

  @Property()
  balance: number = 0;
}
