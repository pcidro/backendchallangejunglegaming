import Decimal from 'decimal.js';
const MoneyDecimal = Decimal.clone({ precision: 20 });
const MAX_AMOUNT = '9999999999999999.99';

export interface MoneyProps {
  amount: string;
  currency: string;
}

export class Money {
  private constructor(
    private readonly value: Decimal,
    public readonly currency: string,
  ) {
    if (!value.isFinite() || value.abs().greaterThan(MAX_AMOUNT)) {
      throw new Error('Amount exceeds the supported monetary range.');
    }
  }

  static from(props: MoneyProps): Money {
    const { amount, currency } = props;

    if (typeof amount !== 'string' || !/^\d+\.\d{2}$/.test(amount)) {
      throw new Error('O valor deve ser uma string como "25.00".');
    }

    if (typeof currency !== 'string' || !/^[A-Z]{3}$/.test(currency)) {
      throw new Error('A moeda deve conter três letras maiúsculas.');
    }

    return new Money(new MoneyDecimal(amount), currency);
  }

  static zero(currency: string): Money {
    return Money.from({
      amount: '0.00',
      currency,
    });
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) {
      throw new Error('Cannot operate on different currencies.');
    }
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);

    return new Money(this.value.plus(other.value), this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);

    return new Money(this.value.minus(other.value), this.currency);
  }

  negate(): Money {
    return new Money(this.value.negated(), this.currency);
  }

  isZero(): boolean {
    return this.value.isZero();
  }

  isPositive(): boolean {
    return this.value.greaterThan(0);
  }

  isNegative(): boolean {
    return this.value.lessThan(0);
  }

  isLessThan(other: Money): boolean {
    this.assertSameCurrency(other);

    return this.value.lessThan(other.value);
  }

  equals(other: Money): boolean {
    return this.currency === other.currency && this.value.equals(other.value);
  }

  toString(): string {
    return `${this.value.toFixed(2)} ${this.currency}`;
  }

  toJSON(): MoneyProps {
    return {
      amount: this.value.toFixed(2),
      currency: this.currency,
    };
  }
}
