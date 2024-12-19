const express = require("express");
const cors = require('cors'); 
const app = express();


app.use(express.static('public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(cors());

const port = 3000;

app.get("*", (req, res) => {
  res.status(200);
  res.render('index'); 
});


app.listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${port}`);
});

