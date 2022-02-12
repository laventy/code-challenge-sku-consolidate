const run = require("../index");

const expectedScenario1 = require("./fixtures/scenario1/output/expected");
const expectedScenario2 = require("./fixtures/scenario2/output/expected");
const expectedScenario3 = require("./fixtures/scenario3/output/expected");

test("sample input", async () => {
  const INPUT_PATHS = {
    catelogAPath: "tests/fixtures/scenario1/input/catalogA.csv",
    catelogBPath: "tests/fixtures/scenario1/input/catalogB.csv",
    barcodeAPath: "tests/fixtures/scenario1/input/barcodesA.csv",
    barcodeBPath: "tests/fixtures/scenario1/input/barcodesB.csv",
  };

  const result = await run(INPUT_PATHS);

  expect(result).toEqual(expectedScenario1);
});

test("Empty catelog B", async () => {
  const INPUT_PATHS = {
    catelogAPath: "tests/fixtures/scenario2/input/catalogA.csv",
    catelogBPath: "tests/fixtures/scenario2/input/catalogB.csv",
    barcodeAPath: "tests/fixtures/scenario2/input/barcodesA.csv",
    barcodeBPath: "tests/fixtures/scenario2/input/barcodesB.csv",
  };

  const result = await run(INPUT_PATHS);

  expect(result).toEqual(expectedScenario2);
});

test("Empty catelog A", async () => {
  const INPUT_PATHS = {
    catelogAPath: "tests/fixtures/scenario3/input/catalogA.csv",
    catelogBPath: "tests/fixtures/scenario3/input/catalogB.csv",
    barcodeAPath: "tests/fixtures/scenario3/input/barcodesA.csv",
    barcodeBPath: "tests/fixtures/scenario3/input/barcodesB.csv",
  };

  const result = await run(INPUT_PATHS);

  expect(result).toEqual(expectedScenario3);
});
