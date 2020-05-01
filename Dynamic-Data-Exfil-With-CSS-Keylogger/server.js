const app = require('polka')();

app.get("/:key", (req, res) => {
  console.log(req.params.key);
  return res.end();
});

app.listen(3000)