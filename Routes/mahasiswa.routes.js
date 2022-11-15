const express = require("express");
const { getMahasiswa, searchMahasiswa, postMahasiswa, putMahasiswa, deleteMahasiswa } = require("../Controllers/mahasiswa");
const { body } = require("express-validator");
const router = express.Router();

router.get("/list", getMahasiswa);
router.post("/post", postMahasiswa);
router.put("/put/:id", putMahasiswa);
router.delete("/delete/:id", deleteMahasiswa);
router.get("/search", searchMahasiswa);

module.exports = router;
