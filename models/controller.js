const csv = require("csvtojson");

class Controller {
  catelogs;
  barcodes;

  constructor(catelogs, barcodes) {
    this.catelogs = catelogs;
    this.barcodes = barcodes;
  }

  // Go through all catelog items one by one within B to compare with each item of A
  // Ignore it if a duplicate. otherwise, consider it.
  findExclusiveItemsFromB() {
    return this.catelogs.catelogB
      .filter((itemB) => !this.isDuplicateWithinA(itemB))
      .map((itemB) => this.catelogs.addSourceSingle(itemB, "B"));
  }

  isDuplicateWithinA(catelogItemB) {
    return this.catelogs.catelogA.some((itemA) =>
      this.barcodes.isDuplicate(itemA.SKU, catelogItemB.SKU)
    );
  }
}

module.exports = Controller;
