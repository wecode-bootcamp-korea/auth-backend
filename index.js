const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { createUser, readUserByEmail, readUserById } = require('./user');
const HttpError = require('./HttpError');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email)
    throw new HttpError('email is empty', 400);
  if (!password)
    throw new HttpError('password is empty', 400);

  const user = createUser(email, password);
  const message = `${user.email} created`;
  console.info(201, message);
  res.status(201).json({ message });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email)
    throw new HttpError('email is empty', 400);
  if (!password)
    throw new HttpError('password is empty', 400);

  const user = readUserByEmail(email);
  if (user.password !== password)
    throw new HttpError(
      `invalid request ${email}/${Array(password.length).fill('*').join('')}`, 400
    );

  const token = jwt.sign(
    { user_id: user.id },
    'secretkey',
    { expiresIn: '31d' }
  );
  res.json({ access_token: token });
});

app.get('/me', (req, res) => {
  const token = req.headers.authorization;
  if (!token)
    throw new HttpError('token not provided', 400);
  const verified = jwt.verify(token, 'secretkey');
  const user = readUserById(verified.user_id);
  delete user.password;
  res.json(user);
});

app.use((err, req, res, next) => {
  console.error(err.statusCode, err.message);
  res.status(err.statusCode).json({ message: err.message });
});

app.listen(10010);