export const decimaleRound = (num: number, nrOfDecimals: number): number => {
    const mult: number = 10 ** nrOfDecimals;
    return Math.round(num * mult) / mult;
};
