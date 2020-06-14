const express = require('express');
const formidable = require('formidable');
const { body } = require('express-validator');
const morgan = require('morgan');
const { getReposByUsername } = require(__dirname + '/../helpers/github.js');
const { save, findAll } = require(__dirname + '/../database/index.js');
let app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  const form = formidable();
  form.parse(req, (err, fields) => {
    if(err) {
      console.log('e')
      res.send(err);
    } else {
        getReposByUsername(fields.user, (err, data) => {
          if(err) {
            console.log('e1:', err);
            res.send(err);
          } else {
            save(data);
            findAll((query)=>{
             res.status(201).send(query);
            });
          }
        });
    }
  });
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
    findAll((query)=>{
      res.status(200).send(query);
    });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

//[body('user').escape()],