const express = require("express");
const { create } = require("express-handlebars");

const { google } = require("googleapis");

const cors = require("cors")

const app = express();

app.use(cors());

// app.use(express.static(__dirname+"/frontend"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


const hbs = create({
    extname: ".hbs",
});


app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./views");

app.use(express.static(__dirname + "/public"));

// var mostrar1 = [];

// ------inicio api google-----

app.get("/api", async (req, res) => {
    // const { request, name } = req.body;

const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "18fO7iU5VIwNT_tGsk2BE4Hm2RZKHx4nhu4PWusVw-hU";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows1 = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "PRODUTOS!A:S",
  });

  const getRows2 = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "CATEGORIAS!A:B",
  });

  const getRows3 = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "PORTADAS!A:B",
  });

  const getRows4 = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "DETALLES!A:E",
  });

const rows1 = getRows1.data.values;
const rows2 = getRows2.data.values;
const rows3 = getRows3.data.values;
const rows4 = getRows4.data.values;
//-----------Video https://www.youtube.com/watch?v=il34MBQi7Uc minuto 19:55
const produts4 = rows4.map((row2) => ({
  nombreTienda: row2[0],
  nombreImagenLogo: row2[1],
  slogan: row2[2],
  nombreImgSlogan: row2[3],
  colorPrincipalPagina: row2[4]
}));

const produts3 = rows3.map((row2) => ({
  frasePortada: row2[0],
  imagenNombrePortada: row2[1],
}));

const produts2 = rows2.map((row2) => ({
  categoria: row2[0],
  nombreImagenCategoria: row2[1],
}));

const produts1 = rows1.map((row) => ({
  categoria: row[0],
  nombre: row[1],
  precio: row[2],
  imagen1: row[3],
  imagen2: row[4],
  imagen3: row[5],
  imagen4: row[6],
  imagen5: row[7],
  descuento: row[8],
  descripcion1: row[9],
  imgDescripcion1: row[10],
  descripcion2: row[11],
  imgDescripcion2: row[12],
  descripcion3: row[13],
  imgDescripcion3: row[14],
  descripcion4: row[15],
  imgDescripcion4: row[16],
  descripcion5: row[17],
  imgDescripcion5: row[18],
}));

var desmadre = [];
desmadre.push(produts1);
desmadre.push(produts2);
desmadre.push(produts3);
desmadre.push(produts4);

console.log(desmadre);

    res.send(desmadre);

})
// ------------fin google apis---

app.get("/login", (req, res) =>{
    res.render("login");
})

app.listen(5090, (req, res) => console.log("11 activo con exito"));