import { Currency } from "./types";

export const rates = {
	[Currency.USD]: {
		symbol: "$",
		conversionRate: 1,
	},
	[Currency.EUR]: {
		symbol: "€",
		conversionRate: 0.87,
	},
	[Currency.GBP]: {
		symbol: "£",
		conversionRate: 0.75,
	},
	[Currency.KES]: {
		symbol: "Ksh",
		conversionRate: 129.5,
	},
	[Currency.UGX]: {
		symbol: "Ush",
		conversionRate: 3606.64,
	},
	[Currency.TZS]: {
		symbol: "Tsh",
		conversionRate: 2573.67,
	},
};

export const getRate = (
	currency: Currency,
): { symbol: string; conversionRate: number } => {
	return rates[currency];
};
