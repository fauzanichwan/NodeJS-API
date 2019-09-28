const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');

app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs_api'
});

conn.connect((err) => {
  if (err) throw err;
  console.log('Mysql Connected');
});

app.get('/api/products', (req, res) => {
  let qry = conn.query("SELECT * FROM products", (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify({
        "status"  : 200,
        "error"   : null,
        "response": results
      }));
    }
  });
});

app.get('/api/products/:id', (req, res) => {
  let qry = conn.query("SELECT * FROM products WHERE product_id = "+req.params.id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify({
        "status"  : 200,
        "error"   : null,
        "response": results
      }));
    }
  });
});

app.post('/api/products/', (req, res) => {
  let data = { product_name: req.body.product_name, product_price: req.body.product_price };
  let qry  = conn.query("INSERT INTO products SET ?", data, (err, results) => {
    if (err) {
      console.log(err)
    } else {
      res.send(JSON.stringify({
        "status"  : 200,
        "error"   : null,
        "response": results
      }));
    }
  }); 
});

app.put('/api/products/:id', (req, res) => {
  let qry = conn.query("UPDATE products SET product_name = "+req.body.product_name+
  ", product_price = "+req.body.product_price+" WHERE product_id = "+req.params.id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify({
        "status"  : 200,
        "error"   : null,
        "response": results
      }));
    }
  });
});

app.delete('/api/products/:id', (req, res) => {
  let qry = conn.query("DELETE products WHERE product_id = "+req.params.id, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify({
        "status"  : 200,
        "error"   : null,
        "response": results
      }));
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
})