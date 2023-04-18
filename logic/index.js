const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const perhitungan = (a, m, k) => {
  const arrayLoop = a.length - m + 1;
  let hasil = 0;
  for (let i = 0; i < arrayLoop; i++) {
    const array1 = a.slice(i, i + m);
    let proses = 0;
    for (let s = 0; s < array1.length; s++) {
      for (let t = 1; t < array1.length; t++) {
        const jumlah = array1[s] + array1[t];
        if (jumlah === k && s !== t) {
          proses = 1;
          break;
        }
      }
      if (proses === 1) break;
    }
    if (proses === 1) hasil += 1;
  }
  return hasil;
};

// const a = [2, 4, 7, 5, 3, 5, 8, 5, 1, 7];
// let m = 4;
// let k = 10;

// const a = [15, 8, 8, 2, 6, 4, 1, 7]
// let m = 2
// let k = 8

// example 1
console.log(perhitungan([2, 4, 7, 5, 3, 5, 8, 5, 1, 7], 4, 10));

// example 2
console.log(perhitungan([15, 8, 8, 2, 6, 4, 1, 7], 2, 8));

app.get("/", (req, res) => res.send("index page"));
app.listen(port, () => console.log(`server berjalan di port ${port}`));
