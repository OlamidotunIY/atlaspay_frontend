import { Currency } from "../types/money.types.js";

export const formatCurrency = (amount: number, currency: Currency, locale?: string): string => {
    const formatter = new Intl.NumberFormat(locale || undefined, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatter.format(amount / Math.pow(10, 2));
}

export const toMinorUnits = (amount: number): number => {
    return Math.round(amount * Math.pow(10, 2));
}

export const toMajorUnits = (amount: number): number => {
    return amount / Math.pow(10, 2);
}