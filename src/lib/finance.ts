export type ModelInputs = {
  propertyValue: number;
  years: number;
  grossYield: number;
  appreciation: number;
  occupancy: number;
};

export type ModelOutputs = {
  futureValue: number;
  rentalIncome: number;
  capitalGain: number;
  totalProfit: number;
  totalRoi: number;
  annualisedRoi: number;
  irr: number;
  cashflows: number[];
};

export function irr(cashflows: number[]): number {
  let lo = -0.95;
  let hi = 2;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    const npv = cashflows.reduce((acc, cf, t) => acc + cf / Math.pow(1 + mid, t), 0);
    if (npv > 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

export function runModel(i: ModelInputs): ModelOutputs {
  const futureValue = i.propertyValue * Math.pow(1 + i.appreciation / 100, i.years);
  const annualRent = i.propertyValue * (i.grossYield / 100) * (i.occupancy / 100);
  const rentalIncome = annualRent * i.years;
  const capitalGain = futureValue - i.propertyValue;
  const totalProfit = capitalGain + rentalIncome;
  const totalRoi = (totalProfit / i.propertyValue) * 100;
  const annualisedRoi = totalRoi / i.years;

  const cashflows: number[] = [-i.propertyValue];
  for (let y = 1; y <= i.years; y++) {
    cashflows.push(annualRent + (y === i.years ? futureValue : 0));
  }

  return {
    futureValue,
    rentalIncome,
    capitalGain,
    totalProfit,
    totalRoi,
    annualisedRoi,
    irr: irr(cashflows) * 100,
    cashflows,
  };
}
