const bodyParser = require("body-parser");
const db = require("../Config/connection");
const response = require("../response");

exports.getMahasiswa = (req, res) => {
  const sql = "SELECT * FROM mahasiswa";
  db.query(sql, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Something When Wrong!", error: error });
    }
    response(200, result, "Data Berhasil Ditampilkan", res);
  });
};

exports.postMahasiswa = (req, res) => {
  const data = { ...req.body };

  const sql = "INSERT INTO mahasiswa SET ?";

  db.query(sql, data, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Something When Wrong!", error: error });
    }
    response(201, result, "Data Berhasil Ditambahkan", res);
  });
};

exports.putMahasiswa = (req, res) => {
  const id = req.params.id;
  const data = { ...req.body };

  const sqlsearch = "SELECT * FROM mahasiswa WHERE id = ?";
  const sql = "UPDATE mahasiswa SET ? WHERE id = ?";

  db.query(sqlsearch, id, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Something When Wrong!", error: error });
    }

    if (result.length) {
      db.query(sql, [data, id], (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Something When Wrong!", error: error });
        }
        response(201, result, "Data Berhasil Diubah", res);
      });
    } else {
      return res.status(404).json({ message: "Data Tidak Ditemukan"});
    }
  });
};

exports.deleteMahasiswa = (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM mahasiswa WHERE id = ?";

  db.query(sql, id, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Something When Wrong!", error: error });
    }
    response(201, result, "Data Berhasil Dihapus", res);
  });
};

exports.searchMahasiswa = (req, res) => {
  function sql() {
    const reqNim = req.query.nim;
    const reqKelas = req.query.kelas;

    const query = "SELECT * FROM mahasiswa ";

    if (reqNim && !reqKelas) {
      const sql = query + `WHERE nim = ${reqNim}`;
      return sql;
    }

    if (reqKelas && !reqNim) {
      const sql = query + `WHERE kelas = "${reqKelas}"`;
      return sql;
    }

    if (reqKelas && reqNim) {
      const sql = query + `WHERE nim = ${reqNim} AND kelas = "${reqKelas}"`;
      return sql;
    }
  }

  db.query(sql(), (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Something When Wrong!", error: error });
    }
    response(200, result, "Data Berhasil Ditemukan", res);
  });
};
