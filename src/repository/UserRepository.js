const database = require("../database/db");

class UserRepository {
  insert(
    {
      name,
      address,
      country,
      steamit_id,
      referrer,
      join_date,
      intro_post_link,
      impo_post_link,
      negative_comment,
      admin_special_comment,
      moderator_special_comment,
      user_level,
      profile,
    },
    onError,
    onSuccess
  ) {
    if (database === "undefined")
      return onError("UserRepository::insert -> database not found!");
    let query =
      "insert into user(name, address, country, steamit_id, referrer, join_date, intro_post_link, important_post_link, negative_comment, admin_special_comment, moderator_special_comment, user_level, profile) values(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    database.query(
      query,
      [
        name,
        address,
        country,
        steamit_id,
        referrer,
        join_date,
        intro_post_link,
        impo_post_link,
        negative_comment,
        admin_special_comment,
        moderator_special_comment,
        user_level,
        profile,
      ],
      (err, res, f) => {
        if (err)
          return onError(
            "UserRepository::insert-> data inserting problem, error: " +
              err.message
          );
        return onSuccess("New user created successfully");
      }
    );
  }

  readById(id, onError, onSuccess) {
    if (database === "undefined")
      return onError("UserRepository::pageCount -> database not found!");
    let query = "select * from user where id=?";
    database.query(query, [id], (err, res, f) => {
      if (err) {
        return onError(
          "Error occured while quering id(" + id + "), Error: " + err.message
        );
      }
      onSuccess(res);
    });
  }

  userCount({ searchText, colName }, onError, onSuccess) {
    if (database === "undefined")
      return onError("UserRepository::userList -> database not found!");
    if (colName === "") {
      return onError("You've to specify a colName");
    }
    let query =
      "select count(*) as total from user where " +
      colName.replace("'", "\\'") +
      " like '%" +
      searchText.replace("'", "\\'") +
      "%'";
    database.query(query, (err, res, f) => {
      if (err) {
        return onError(
          "Counting total data points having trouble on database, error: " +
            err.message
        );
      }
      if (res.length > 0) {
        return onSuccess({
          count: res[0].total,
          content_per_page: process.env.SHOW_USER_LIMIT,
        });
      } else {
        return onSuccess({
          count: 0,
          content_per_page: process.env.SHOW_USER_LIMIT,
        });
      }
    });
  }

  userList({ pageNo, searchText, colName }, onError, onSuccess) {
    if (database === "undefined")
      return onError("UserRepository::userList -> database not found!");
    let offset = pageNo * process.env.SHOW_USER_LIMIT;
    if (colName === "") {
      return onError("You've to specify a colName");
    }
    let query =
      "select id, name, steamit_id, referrer, country, join_date, user_level, profile from user where " +
      colName.replace("'", "\\'") +
      " like '%" +
      searchText.replace("'", "\\'") +
      "%' order by " +
      colName.replace("'", "\\'") +
      " asc limit " +
      process.env.SHOW_USER_LIMIT +
      " offset " +
      offset;
    database.query(query, (err, res, f) => {
      if (err)
        return onError(
          "database problem occured while querying, Error: " + err.message
        );
      return onSuccess(res);
    });
  }

  update(
    id,
    {
      name,
      address,
      country,
      steamit_id,
      referrer,
      join_date,
      intro_post_link,
      impo_post_link,
      negative_comment,
      admin_special_comment,
      moderator_special_comment,
      user_level,
      profile,
    },
    onError,
    onSuccess
  ) {
    if (database === "undefined")
      return onError("UserRepository::update -> database not found!");
    let query =
      "update user set name=" +
      database.escape(name) +
      ", address=" +
      database.escape(address) +
      ", country=" +
      database.escape(country) +
      ", steamit_id=" +
      database.escape(steamit_id) +
      ", referrer=" +
      database.escape(referrer) +
      ", join_date=" +
      database.escape(join_date) +
      ", intro_post_link=" +
      database.escape(intro_post_link) +
      ", important_post_link=" +
      database.escape(impo_post_link) +
      ", negative_comment=" +
      database.escape(negative_comment) +
      ", admin_special_comment=" +
      database.escape(admin_special_comment) +
      ", moderator_special_comment=" +
      database.escape(moderator_special_comment) +
      ", user_level=" +
      database.escape(user_level) +
      ", profile=" +
      database.escape(profile) +
      " where id=" +
      database.escape(id) +
      "";
    database.query(query, (err, res, f) => {
      if (err)
        return onError(
          "updating data of user by id (" +
            id +
            ") having trouble, Error: " +
            err.message
        );
      return onSuccess("User(" + id + ") data updated successfully");
    });
  }

  delete(id, onError, onSuccess) {
    if (database === "undefined")
      return onError("UserRepository::update -> database not found!");
    let query = "delete from user where id=?";
    database.query(query, [id], (err, res, f) => {
      if (err) {
        return onError(
          "Problem occuring while row user(" +
            id +
            ") deleting, Error: " +
            err.message
        );
      }
      return onSuccess("Successfully deleted user with id(" + id + ")");
    });
  }
}

module.exports = new UserRepository();
