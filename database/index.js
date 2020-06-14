const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher', {
  useMongoClient: true
 });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected')
});

  let repoSchema = mongoose.Schema({
    id: Number,
    name: String,
    avatar_url: String,
    html_url: String,
    forks: Number,
    watchers: Number,
    stargazers: Number,
    created: String
  });

let Repo = mongoose.model('Repo', repoSchema);

  let save = data => {
    for(let i=0;i<data.data.length;i++){
      let item = new Repo({
        id: data.data[i].id,
        name: data.data[i].name,
        forks: data.data[i].forks,
        avatar_url: data.data[i].owner.avatar_url,
        html_url: data.data[i].owner.html_url,
        watchers: data.data[i].watchers_count,
        stargazers: data.data[i].stargazers_count,
        created: data.data[i].created_at
      });
      let update = {
        id: data.data[i].id,
        name: data.data[i].name,
        forks: data.data[i].forks,
        avatar_url: data.data[i].owner.avatar_url,
        html_url: data.data[i].owner.html_url,
        watchers: data.data[i].watchers_count,
        stargazers: data.data[i].stargazers_count,
        created: data.data[i].created_at
      };
    Repo.findOne({ id: data.data[i].id }, (err, data) => {
      if (!data) {
        item.save(function (err, item) {
          if (err) return console.error(err);
        });
        return 'created';
      } else {
        Repo.update({ id: data.id }, update, function (err, item) {
          if (err) return console.error(err);
        });
        return 'updated';
      }
    });
  }
};



function findAll(cb) {
   Repo.find({}).sort('-forks').limit(25).exec( (err, data) => {
      if(err) {
        return err;
      } else {
        cb(data);
      }
   })
}


module.exports.save = save;
module.exports.findAll = findAll;


