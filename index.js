const Catelogs = require("./models/catelogs");
const Barcodes = require("./models/barcodes");
const Controller = require("./models/controller");

const writeJsonToCsvFile = require("./utils/json2csv");

const INPUT_PATHS = {
  catelogAPath: "input/catalogA.csv",
  catelogBPath: "input/catalogB.csv",
  barcodeAPath: "input/barcodesA.csv",
  barcodeBPath: "input/barcodesB.csv",
};

const OUTPUT_PATH = "output/output.csv";

const run = async (
  { catelogAPath, catelogBPath, barcodeAPath, barcodeBPath },
  outputPath = undefined
) => {
  console.log({ catelogAPath, catelogBPath, barcodeAPath, barcodeBPath });
  const result = [];

  const catelogs = new Catelogs(catelogAPath, catelogBPath);
  await catelogs.init();

  const barcodes = new Barcodes(barcodeAPath, barcodeBPath);
  await barcodes.init();

  const controller = new Controller(catelogs, barcodes);

  // Put all catelog items within A into result as the base
  result.push(...catelogs.addSourceMultiple(catelogs.catelogA, "A"));

  result.push(...controller.findExclusiveItemsFromB());

  if (outputPath) return writeJsonToCsvFile(result, outputPath);
  return result;
};

// only run if this file is the running file
if (!module.parent) run(INPUT_PATHS, OUTPUT_PATH);

module.exports = run;
