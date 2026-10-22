import { Money } from '../common/money';
import { Wallet } from './wallet.entity';

const walletId = '0192f291-27dd-7d3f-8071-5f8685deef37';
const playerId = '0192f28f-5dc0-7d58-bdb2-814ad6a0f4a1';

describe('Wallet', () => {
  test('opens a wallet with a positive balance and version one', () => {
    const before = Date.now();
    const balance = Money.from({ amount: '100.00', currency: 'BRL' });

    const wallet = Wallet.open({
      id: walletId,
      playerId,
      initialBalance: balance,
    });

    expect(wallet.id).toBe(walletId);
    expect(wallet.playerId).toBe(playerId);
    expect(wallet.currency).toBe('BRL');
    expect(wallet.balance.equals(balance)).toBe(true);
    expect(wallet.version).toBe(1);
    expect(wallet.createdAt.getTime()).toBeGreaterThanOrEqual(before);
    expect(wallet.createdAt.getTime()).toBeLessThanOrEqual(Date.now());
    expect(wallet.updatedAt).toEqual(wallet.createdAt);
  });

  test('opens a wallet with a zero balance', () => {
    const wallet = Wallet.open({
      id: walletId,
      playerId,
      initialBalance: Money.zero('BRL'),
    });

    expect(wallet.balance.isZero()).toBe(true);
    expect(wallet.version).toBe(1);
  });

  test('rejects opening a wallet with a negative balance', () => {
    const balance = Money.from({ amount: '10.00', currency: 'BRL' }).negate();

    expect(() =>
      Wallet.open({ id: walletId, playerId, initialBalance: balance }),
    ).toThrow('Initial balance cannot be negative.');
  });

  test('rehydrates a wallet preserving its persisted state', () => {
    const createdAt = new Date('2026-01-01T10:00:00.000Z');
    const updatedAt = new Date('2026-02-01T15:30:00.000Z');
    const balance = Money.from({ amount: '75.50', currency: 'USD' });

    const wallet = Wallet.rehydrate({
      id: walletId,
      playerId,
      balance,
      version: 7,
      createdAt,
      updatedAt,
    });

    expect(wallet.id).toBe(walletId);
    expect(wallet.playerId).toBe(playerId);
    expect(wallet.currency).toBe('USD');
    expect(wallet.balance.toJSON()).toEqual(balance.toJSON());
    expect(wallet.version).toBe(7);
    expect(wallet.createdAt).toEqual(createdAt);
    expect(wallet.updatedAt).toEqual(updatedAt);
  });

  test('rehydrates a zero balance without resetting its version', () => {
    const wallet = Wallet.rehydrate({
      id: walletId,
      playerId,
      balance: Money.zero('BRL'),
      version: 12,
      createdAt: new Date('2026-01-01T10:00:00.000Z'),
      updatedAt: new Date('2026-02-01T15:30:00.000Z'),
    });

    expect(wallet.balance.isZero()).toBe(true);
    expect(wallet.version).toBe(12);
  });
});
