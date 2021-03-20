const volume = {
  TSP: 'tsp',
  TBSP: 'tbsp',
  FLOZ: 'floz',
  CUP: 'cup',
  PINT: 'pint',
  GAL: 'gal',
  ML: 'ml',
  L: 'l',
}

const mass = {
  LB: 'lb',
  OZ: 'oz',
  G: 'g',
  KG: 'kg',
}

const ratio = {
  // Volume
  [volume.TSP]: {
    [volume.TBSP]: 0.333,
    [volume.FLOZ]: 0.169,
    [volume.CUP]: 0.02,
    [volume.PINT]: 0.011,
    [volume.GAL]: 0.001,
    [volume.ML]: 5,
    [volume.L]: 0.005,
  },
  [volume.TBSP]: {
    [volume.TSP]: 3,
    [volume.FLOZ]: 0.507,
    [volume.CUP]: 0.06,
    [volume.PINT]: 0.032,
    [volume.GAL]: 0.004,
    [volume.ML]: 15,
    [volume.L]: 0.015,
  },
  [volume.FLOZ]: {
    [volume.TSP]: 5.915,
    [volume.TBSP]: 1.972,
    [volume.CUP]: 0.118,
    [volume.PINT]: 0.063,
    [volume.GAL]: 0.008,
    [volume.ML]: 30,
    [volume.L]: 0.030,
  },
  [volume.CUP]: {
    [volume.TSP]: 50,
    [volume.TBSP]: 16.666,
    [volume.FLOZ]: 8.454,
    [volume.PINT]: 0.528,
    [volume.GAL]: 0.066,
    [volume.ML]: 250,
    [volume.L]: 0.250,
  },
  [volume.GAL]: {
    [volume.TSP]: 757.082,
    [volume.TBSP]: 252.361,
    [volume.FLOZ]: 128,
    [volume.PINT]: 8,
    [volume.CUP]: 15.142,
    [volume.ML]: 3785.412,
    [volume.L]: 3785,
  },
  [volume.ML]: {
    [volume.TSP]: 0.2,
    [volume.TBSP]: 0.066,
    [volume.FLOZ]: 0.034,
    [volume.PINT]: 0.002,
    [volume.CUP]: 0.004,
    [volume.GAL]: 1/3785.412,
    [volume.L]: 0.001,
  },
  [volume.L]: {
    [volume.TSP]: 200,
    [volume.TBSP]: 66.666,
    [volume.FLOZ]: 33.814,
    [volume.PINT]: 2.113,
    [volume.CUP]: 4,
    [volume.GAL]: 0.264,
    [volume.ML]: 1000,
  },

  // Mass
  [mass.LB]: {
    [mass.OZ]: 16,
    [mass.G]: 453.592,
    [mass.KG]: 0.454
  },
  [mass.OZ]: {
    [mass.LB]: 0.063,
    [mass.G]: 28.350,
    [mass.KG]: 0.028
  },
  [mass.G]: {
    [mass.OZ]: 0.002,
    [mass.LB]: 0.035,
    [mass.KG]: 0.001
  },
  [mass.KG]: {
    [mass.OZ]: 2.205,
    [mass.LB]: 35.274,
    [mass.G]: 1000
  },
}

const vAlias = {
  // Teaspoon
  tsp: volume.TSP,
  teaspoon: volume.TSP,

  // Tablespoon
  tbsp: volume.TBSP,
  tbs: volume.TBSP,
  tbl: volume.TBSP,
  tablespoon: volume.TBSP,

  // Fluid ounce
  'fluid ounce': volume.FLOZ,
  'fl oz': volume.FLOZ,
  floz: volume.FLOZ,

  // Cup
  cup: volume.CUP,
  c: volume.CUP,

  // Pint
  pint: volume.PINT,
  p: volume.PINT,
  pt: volume.PINT,
  'fl pt': volume.PINT,

  // Gallon
  gallon: volume.GAL,
  gal: volume.GAL,

  // Milliliter
  milliliter: volume.ML,
  millilitre: volume.ML,
  cc: volume.ML,
  ml: volume.ML,

  // Liter
  liter: volume.L,
  litre: volume.L,
  l: volume.L,
}

const mAlias = {
  // Pound
  pound: mass.LB,
  lb: mass.LB,

  // Ounce
  ounce: mass.OZ,
  oz: mass.OZ,

  // Gram
  gram: mass.G,
  gramme: mass.G,
  g: mass.G,

  // Kilo
  kilo: mass.KG,
  kilogram: mass.KG,
  kilogramme: mass.KG,
  kg: mass.KG,
}

const labels = {
  [volume.TSP]: 'Teaspoon',
  [volume.TBSP]: 'Tablespoon',
  [volume.FLOZ]: 'Fluid Ounces',
  [volume.PINT]: 'Pint',
  [volume.CUP]: 'Cup',
  [volume.GAL]: 'Gallon',
  [volume.ML]: 'Milliliter',
  [volume.L]: 'Liter',

  [mass.LB]: 'Pound',
  [mass.OZ]: 'Ounce',
  [mass.G]: 'Gram',
  [mass.KG]: 'Kilogram',
}
const unit = {
  [volume.TSP]: 'tsp',
  [volume.TBSP]: 'tbsp',
  [volume.FLOZ]: 'fl oz',
  [volume.PINT]: 'pint',
  [volume.CUP]: 'cup',
  [volume.GAL]: 'gal',
  [volume.ML]: 'ml',
  [volume.L]: 'L',

  [mass.LB]: 'lb',
  [mass.OZ]: 'oz',
  [mass.G]: 'g',
  [mass.KG]: 'kg',
}

module.exports = {
  labels,
  mAlias,
  mass,
  ratio,
  u: unit,
  vAlias,
  volume,
}