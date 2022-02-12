const Catelogs = require("./models/catelogs");
const Barcodes = require("./models/barcodes");
const writeJsonToCsvFile = require("./utils/json2csv");

const CATELOG_A_PATH = "sample/input/catalogA.csv";
const CATELOG_B_PATH = "sample/input/catalogB.csv";

const BARCODES_A_PATH = "sample/input/barcodesA.csv";
const BARCODES_B_PATH = "sample/input/barcodesB.csv";

const OUTPUT_PATH = "output/output.csv";

const run = async () => {
  const result = [];

  const catelogs = new Catelogs(CATELOG_A_PATH, CATELOG_B_PATH);
  await catelogs.init();

  const barcodes = new Barcodes(BARCODES_A_PATH, BARCODES_B_PATH);
  await barcodes.init();

  // Put all catelog items within A into result as the base
  result.push(...catelogs.addSourceMultiple(catelogs.catelogA, "A"));

  result.push(...findExclusiveItemsFromB(catelogs, barcodes));

  writeJsonToCsvFile(result, OUTPUT_PATH);
};

// Go through all catelog items one by one within B to compare with each item of A
// Ignore it if a duplicate. otherwise, consider it.
const findExclusiveItemsFromB = (catelogs, barcodes) => {
  return catelogs.catelogB
    .filter((itemB) => !isDuplicateWithinA(itemB, catelogs.catelogA, barcodes))
    .map((itemB) => catelogs.addSourceSingle(itemB, "B"));
};

const isDuplicateWithinA = (catelogItemB, catelogA, barcodes) =>
  catelogA.some((itemA) => barcodes.isDuplicate(itemA.SKU, catelogItemB.SKU));

run();
