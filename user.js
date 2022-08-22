const HttpError = require("./HttpError");

const users = [];
let autoId = 1;

function createUser(email, password) {
  const isExist = users.find(user => user.email === email);
  if (isExist) throw new HttpError('user already exist', 400);
  const user = {
    id: autoId++,
    email,
    password
  };
  users.push(user);
  return user;
}

function readUserByEmail(email) {
  const user = users.find(user => user.email === email);
  if (!user) throw new HttpError('user not found', 404);
  return user;
}

function readUserById(id) {
  const user = users.find(user => user.id === id);
  if (!user) throw new HttpError('user not found', 404);
  delete user.password;
  return user;
}

module.exports = { createUser, readUserByEmail, readUserById }