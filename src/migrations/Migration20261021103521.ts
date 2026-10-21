import { Migration } from '@mikro-orm/migrations';

export class Migration20261021103521 extends Migration {

  override name = 'Migration20261021103521';

  override up(): void | Promise<void> {
    this.addSql(`create table "wallet" ("id" serial primary key, "balance" int not null default 0);`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "wallet" cascade;`);
  }

}
