const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const compileContract = require("./compiler");
const fs = require("fs");
const solc = require("solc");
// Contract upload
const contractStorage = multer.diskStorage({
  destination: "contracts", // Destination to store image
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const contractUpload = multer({
  storage: contractStorage,
  limits: {
    fileSize: 10000000, // 10000000 Bytes = 10 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(sol|txt)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a contract"));
    }
    cb(undefined, true);
  },
});

router.get("/", (req, res) => {
  res.send({
    "you know": "Solidity!",
    version: solc.version,
  });
});
router.post(
  "/compile",
  contractUpload.single("contract"),
  (req, res) => {
    const contractContent = fs.readFileSync(req.file.path).toString("utf-8");
    console.log("Contract content", contractContent);
    const compiled = compileContract(contractContent);
    console.log("compiled data", compiled);
    res.send(compiled);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

module.exports = router;
