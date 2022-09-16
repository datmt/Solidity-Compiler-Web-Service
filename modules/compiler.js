const solc = require("solc");

function findImports(path) {
  if (path === "lib.sol")
    return {
      contents:
        "library L { function f() internal returns (uint) { return 7; } }",
    };
  else return { error: "File not found" };
}

function produceImport(contractContent) {
  return {
    language: "Solidity",
    sources: {
      "contract.sol": {
        content: contractContent,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };
}

module.exports = function (contractContent) {
  return JSON.parse(
    solc.compile(JSON.stringify(produceImport(contractContent)), {
      import: findImports,
    })
  );
};
