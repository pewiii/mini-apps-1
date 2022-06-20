const mysql = require('mysql');
const Sequelize = require('sequelize');

const db = new Sequelize('checkout', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

console.log('Connected to DB');

var Users = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  fullname: Sequelize.STRING,
  email: Sequelize.STRING,
  pword: Sequelize.STRING,
  phone: Sequelize.STRING
});

var Addresses = db.define('addresses', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  address1: Sequelize.STRING,
  address2: Sequelize.STRING,
  city: Sequelize.STRING,
  st: Sequelize.STRING,
  zip: Sequelize.STRING
});

var CCData = db.define('ccdata', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cnum: Sequelize.STRING,
  cexp: Sequelize.STRING,
  ccvv: Sequelize.STRING,
  czip: Sequelize.STRING
})

Addresses.belongsTo(Users);
CCData.belongsTo(Users);

db.sync({alter: true})
.then(() => {
  console.log('SYNCED');
}).catch(err => {
  console.log(err);
});

var save = (data, callback) => {
  var userId;
  Users.create({
    fullname: data.name,
    email: data.email,
    pword: data.password,
    phone: data.phone
  }).then(user => {
    userId = user.id
    return Addresses.create({
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      st: data.state,
      zip: data.zip,
      userId
    });
  }).then(() => {
    return CCData.create({
      cnum: data.cc_num,
      cexp: data.cc_exp,
      ccvv: data.cc_cvv,
      czip: data.cc_zip,
      userId
    });
  }).then(() => {
    callback(null)
  }).catch(err => {
    callback(err);
  });
}

module.exports = save;