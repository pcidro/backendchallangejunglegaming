import { Money } from './money';

describe('Money', () => {
  test('creates a valid monetary value', () => {
    const money = Money.from({
      amount: '25.00',
      currency: 'BRL',
    });

    expect(money.toJSON()).toEqual({
      amount: '25.00',
      currency: 'BRL',
    });
  });

  test('creates a zero monetary value', () => {
    expect(Money.zero('BRL').toJSON()).toEqual({
      amount: '0.00',
      currency: 'BRL',
    });
  });

  test('rejects more than two decimal places', () => {
    expect(() => Money.from({ amount: '25.001', currency: 'BRL' })).toThrow();
  });

  test('rejects negative amounts', () => {
    expect(() => Money.from({ amount: '-25.00', currency: 'BRL' })).toThrow();
  });

  test('rejects empty amounts', () => {
    expect(() => Money.from({ amount: '', currency: 'BRL' })).toThrow();
  });

  test('rejects scientific notation', () => {
    expect(() => Money.from({ amount: '1e3', currency: 'BRL' })).toThrow();
  });

  test('rejects NaN', () => {
    expect(() => Money.from({ amount: 'NaN', currency: 'BRL' })).toThrow();
  });

  test('rejects Infinity', () => {
    expect(() => Money.from({ amount: 'Infinity', currency: 'BRL' })).toThrow();
  });

  test('rejects lowercase currency codes', () => {
    expect(() => Money.from({ amount: '25.00', currency: 'brl' })).toThrow();
  });

  test('identifies zero', () => {
    const money = Money.zero('BRL');

    expect(money.isZero()).toBe(true);
    expect(money.isPositive()).toBe(false);
    expect(money.isNegative()).toBe(false);
  });

  test('identifies a positive amount', () => {
    const money = Money.from({
      amount: '25.00',
      currency: 'BRL',
    });

    expect(money.isZero()).toBe(false);
    expect(money.isPositive()).toBe(true);
    expect(money.isNegative()).toBe(false);
  });

  test('identifies a negative amount', () => {
    const money = Money.from({
      amount: '25.00',
      currency: 'BRL',
    }).negate();

    expect(money.isZero()).toBe(false);
    expect(money.isPositive()).toBe(false);
    expect(money.isNegative()).toBe(true);
  });

  test('identifies a smaller amount', () => {
    const smaller = Money.from({ amount: '20.00', currency: 'BRL' });
    const larger = Money.from({ amount: '25.00', currency: 'BRL' });

    expect(smaller.isLessThan(larger)).toBe(true);
    expect(larger.isLessThan(smaller)).toBe(false);
  });

  test('does not consider equal amounts smaller', () => {
    const first = Money.from({ amount: '25.00', currency: 'BRL' });
    const second = Money.from({ amount: '25.00', currency: 'BRL' });

    expect(first.isLessThan(second)).toBe(false);
  });

  test('rejects comparing amounts in different currencies', () => {
    const brl = Money.from({ amount: '20.00', currency: 'BRL' });
    const usd = Money.from({ amount: '25.00', currency: 'USD' });

    expect(() => brl.isLessThan(usd)).toThrow();
  });

  test('considers matching amounts and currencies equal', () => {
    const first = Money.from({ amount: '25.00', currency: 'BRL' });
    const second = Money.from({ amount: '25.00', currency: 'BRL' });

    expect(first.equals(second)).toBe(true);
  });

  test('considers different amounts unequal', () => {
    const first = Money.from({ amount: '25.00', currency: 'BRL' });
    const second = Money.from({ amount: '20.00', currency: 'BRL' });

    expect(first.equals(second)).toBe(false);
  });

  test('considers different currencies unequal', () => {
    const brl = Money.from({ amount: '25.00', currency: 'BRL' });
    const usd = Money.from({ amount: '25.00', currency: 'USD' });

    expect(brl.equals(usd)).toBe(false);
  });

  test('formats an amount with its currency', () => {
    const money = Money.from({ amount: '25.00', currency: 'BRL' });

    expect(money.toString()).toBe('25.00 BRL');
  });

  test('formats zero with two decimal places', () => {
    expect(Money.zero('BRL').toString()).toBe('0.00 BRL');
  });

  test('formats a negative amount', () => {
    const money = Money.from({
      amount: '25.00',
      currency: 'BRL',
    }).negate();

    expect(money.toString()).toBe('-25.00 BRL');
  });

  test('adds decimal amounts precisely without changing the originals', () => {
    const first = Money.from({ amount: '0.10', currency: 'BRL' });
    const second = Money.from({ amount: '0.20', currency: 'BRL' });

    expect(first.add(second).toString()).toBe('0.30 BRL');
    expect(first.toString()).toBe('0.10 BRL');
    expect(second.toString()).toBe('0.20 BRL');
  });

  test('subtracts amounts and allows a negative result', () => {
    const first = Money.from({ amount: '10.00', currency: 'BRL' });
    const second = Money.from({ amount: '25.00', currency: 'BRL' });

    expect(first.subtract(second).toString()).toBe('-15.00 BRL');
    expect(first.toString()).toBe('10.00 BRL');
    expect(second.toString()).toBe('25.00 BRL');
  });

  test('rejects arithmetic between different currencies', () => {
    const brl = Money.from({ amount: '25.00', currency: 'BRL' });
    const usd = Money.from({ amount: '10.00', currency: 'USD' });

    expect(() => brl.add(usd)).toThrow();
    expect(() => brl.subtract(usd)).toThrow();
  });

  test('negates an amount without changing the original', () => {
    const money = Money.from({ amount: '25.00', currency: 'BRL' });
    const negative = money.negate();

    expect(negative.toString()).toBe('-25.00 BRL');
    expect(negative.negate().equals(money)).toBe(true);
    expect(money.toString()).toBe('25.00 BRL');
  });
});
