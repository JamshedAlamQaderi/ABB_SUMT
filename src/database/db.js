const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) return console.error("DB Error: " + err.message);
  console.log("Successfully connected to db");
  let adminTableQuery = `create table if not exists admin(
                        id integer primary key auto_increment,
                        username varchar(50) not null,
                        password varchar(50) not null,
                        role varchar(10) not null
                    )`;
  connection.query(adminTableQuery, (err, res, field) => {
    if (err) console.log("TABLE(admin) ERROR-> " + err.message);
  });

  let userTableQuery = `create table if not exists user(
                          id integer primary key auto_increment,
                          name varchar(50),
                          address varchar(150),
                          country varchar (50),
                          steamit_id varchar(50),
                          referrer varchar(50),
                          join_date date,
                          intro_post_link varchar(200),
                          important_post_link varchar(200), 
                          negative_comment varchar (1000),
                          admin_special_comment varchar(1000),
                          moderator_special_comment varchar(1000),
                          user_level varchar(30),
                          active_list varchar(30),
                          super_active_list varchar(30),
                          under_admin_mod varchar(50),
                          profile varchar(150)
                          )`;
  connection.query(userTableQuery, (err, res, field) => {
    if (err) console.log("TABLE(user) ERROR-> " + err.message);
    console.log("Successfully Created table(user)");
  });

  /*connection.end((err)=>{
        if(err) return console.log('DB END ERROR: ' + err.message)
    })*/
});

module.exports = connection;
