
export const is1 = (value: any): value is 1 => value === 1;
export const is0 = (value: any): value is 0 => value === 0;

export const transformIs1 = { transform: is1 };
export const transformIs0 = { transform: is0 };
