module.exports = {
  volume: {
    TSP: 'tsp',
    TBSP: 'tbsp',
    FLOZ: 'floz',
    CUP: 'cup',
    PINT: 'pint',
    GAL: 'gal',
    ML: 'ml',
    L: 'l',
  },
  mass: {
    LB: 'lb',
    OZ: 'oz',
    MG: 'mg',
    G: 'g',
    KG: 'kg',
  },
  ratio: {
    [this.TSP]: {
      [this.TBSP]: 0.333,
      [this.FLOZ]: 0.169,
      [this.CUP]: 0.02,
      [this.PINT]: 0.011,
      [this.GAL]: 0.001,
      [this.ML]: 5,
      [this.L]: 0.005,
    },
    [this.TBSP]: {
      [this.TSP]: 3,
      [this.FLOZ]: 0.507,
      [this.CUP]: 0.06,
      [this.PINT]: 0.032,
      [this.GAL]: 0.004,
      [this.ML]: 15,
      [this.L]: 0.015,
    },
    [this.FLOZ]: {
      [this.TSP]: 5.915,
      [this.TBSP]: 1.972,
      [this.CUP]: 0.118,
      [this.PINT]: 0.063,
      [this.GAL]: 0.008,
      [this.ML]: 30,
      [this.L]: 0.030,
    },
    [this.CUP]: {
      [this.TSP]: 50,
      [this.TBSP]: 16.666,
      [this.FLOZ]: 8.454,
      [this.PINT]: 0.528,
      [this.GAL]: 0.066,
      [this.ML]: 250,
      [this.L]: 0.250,
    },
    [this.GAL]: {
      [this.TSP]: 757.082,
      [this.TBSP]: 252.361,
      [this.FLOZ]: 128,
      [this.PINT]: 8,
      [this.CUP]: 15.142,
      [this.ML]: 3785.412,
      [this.L]: 3785,
    },
    [this.ML]: {
      [this.TSP]: 0.2,
      [this.TBSP]: 0.066,
      [this.FLOZ]: 0.034,
      [this.PINT]: 0.002,
      [this.CUP]: 0.004,
      [this.GAL]: 1/3785.412,
      [this.L]: 0.001,
    },
    [this.L]: {
      [this.TSP]: 200,
      [this.TBSP]: 66.666,
      [this.FLOZ]: 33.814,
      [this.PINT]: 2.113,
      [this.CUP]: 4,
      [this.GAL]: 0.264,
      [this.ML]: 1000,
    },
  },
  vAlias: {
    // Teaspoon
    tsp: this.TSP,
    teaspoon: this.TSP,

    // Tablespoon
    tbsp: this.TBSP,
    tbs: this.TBSP,
    tbl: this.TBSP,
    tablespoon: this.TBSP,

    // Fluid ounce
    'fluid ounce': this.FLOZ,
    'fl oz': this.FLOZ,
    floz: this.FLOZ,

    // Cup
    cup: this.CUP,
    c: this.CUP,

    // Pint
    pint: this.PINT,
    p: this.PINT,
    pt: this.PINT,
    'fl pt': this.PINT,

    // Gallon
    gallon: this.GAL,
    gal: this.GAL,

    // Milliliter
    milliliter: this.ML,
    millilitre: this.ML,
    cc: this.ML,
    ml: this.ML,

    // Liter
    liter: this.L,
    litre: this.L,
    l: this.L,
  },
  mAlias: {
    // Pound
    pound: this.LB,
    lb: this.LB,

    // Ounce
    ounce: this.OZ,
    oz: this.OZ,

    // Milligram
    milligram: this.MG,
    milligramme: this.MG,
    mg: this.mg,

    // Gram
    gram: this.G,
    gramme: this.G,
    g: this.G,

    // Kilo
    kilo: this.KG,
    kilogram: this.KG,
    kilogramme: this.KG,
    kg: this.KG,
  },
}