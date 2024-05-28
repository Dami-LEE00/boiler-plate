const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

const config = require('./config/key');

const { User } = require('./models/User');

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.post('/register', async (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면, 그것들을 DB에 넣는다
  // body parser를 통해 body에 담긴 정보를 가져온다
  const user = new User(req.body);

  // mongoDB 메서드, user 모델에 저장
  const result = await user.save()
    .then(() => {
      res.status(200).json({
        success: true
      })
    })
    .catch((err) => {
      res.json({
        success: false,
        err
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

