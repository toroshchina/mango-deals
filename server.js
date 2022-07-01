import express from 'express';
import { Low, JSONFile } from 'lowdb';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
await db.read();
let app = express();
const srcPath = __dirname;
app.use(express.static(path.join(srcPath, 'build')));
let urlencodedParser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json());

// Initial set of deals
let defaultDeals = [
  { id: 0, date: 1652621670000, value: 200 },
  { id: 1, date: 1652621671000, value: 68 },
];
db.data.deals = [];
db.write();
defaultDeals.forEach((deal) => {
  db.data.deals.push(deal);
  db.write();
});

app.get('/deals/:page', (req, res) => {
  const deals = [...db.data.deals].reverse();
  const filtered = deals.splice(req.params.page * 10, 10);
  res.send(filtered);
});

app.post('/new', urlencodedParser, (req, res) => {
  db.data.deals.push(req.body);
  db.write();
  res.sendStatus(200);
});

app.delete('/delete/:id', urlencodedParser, (req, res) => {
  for (let i = 0; i < db.data.deals.length; i++) {
    if (db.data.deals[i].id === +req.params.id) {
      db.data.deals.splice(i, 1);
      db.write();
      break;
    }
  }
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(srcPath, 'build', 'index.html'));
});

const listener = app.listen(process.env.PORT || 8080, '0.0.0.0', function () {
  console.log('Listening on port ' + listener.address().port);
});
