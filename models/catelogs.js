const csv = require("csvtojson");

class Catelogs {
  catelogA;
  catelogB;

  constructor(catelogAPath, catelogBPath) {
    this.catelogAPath = catelogAPath;
    this.catelogBPath = catelogBPath;
  }

  async init() {
    this.catelogA = await csv().fromFile(this.catelogAPath);
    this.catelogB = await csv().fromFile(this.catelogBPath);
  }

  addSourceMultiple(catelog, sourceName) {
    return catelog.map((item) => ({ ...item, Source: sourceName }));
  }

  addSourceSingle(catelogItem, sourceName) {
    return { ...catelogItem, Source: sourceName };
  }
}

module.exports = Catelogs;
