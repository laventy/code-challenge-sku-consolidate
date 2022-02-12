const csv = require("csvtojson");

class Barcodes {
  barcodesA;
  barcodesB;

  constructor(barcodesAPath, barcodesBPath) {
    this.barcodesAPath = barcodesAPath;
    this.barcodesBPath = barcodesBPath;
  }

  async init() {
    this.barcodesA = await csv().fromFile(this.barcodesAPath);
    this.barcodesB = await csv().fromFile(this.barcodesBPath);
  }

  isDuplicate(skuA, skuB) {
    const allBarcodesOfSkuA = this.barcodesA
      .filter((item) => item.SKU === skuA)
      .map((item) => item.Barcode);

    const allBarcodesOfSkuB = this.barcodesB
      .filter((item) => item.SKU === skuB)
      .map((item) => item.Barcode);

    return allBarcodesOfSkuA.some((item) => allBarcodesOfSkuB.includes(item));
  }
}

module.exports = Barcodes;
