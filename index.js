const Catelogs = require("./models/catelogs");
const Barcodes = require("./models/barcodes");
const writeJsonToCsvFile = require("./utils/json2csv");

const INPUT_PATHS = {
  catelogAPath: "sample/input/catalogA.csv",
  catelogBPath: "sample/input/catalogB.csv",
  barcodeAPath: "sample/input/barcodesA.csv",
  barcodeBPath: "sample/input/barcodesB.csv",
};

const OUTPUT_PATH = "output/output.csv";

const run = async (
  { catelogAPath, catelogBPath, barcodeAPath, barcodeBPath },
  outputPath,
  isWriteFile = true
) => {
  const result = [];

  const catelogs = new Catelogs(catelogAPath, catelogBPath);
  await catelogs.init();

  const barcodes = new Barcodes(barcodeAPath, barcodeBPath);
  await barcodes.init();

  // Put all catelog items within A into result as the base
  result.push(...catelogs.addSourceMultiple(catelogs.catelogA, "A"));

  result.push(...findExclusiveItemsFromB(catelogs, barcodes));

  console.log(result);
  if (isWriteFile) return writeJsonToCsvFile(result, outputPath);
  return result;
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

run(INPUT_PATHS, OUTPUT_PATH);
