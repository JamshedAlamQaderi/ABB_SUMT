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
        onSuccess("New user created successfully");
      }
    );
  }

  pageCount(onError, onSuccess) {
    if (database === "undefined") return onError("UserRepository::pageCount -> database not found!");
    let query = "select count(*) as total from user"
    database.query(query, (err, res, f)=>{
        if(err) onError("Counting total data points having trouble on database, error: " + err.message)
        onSuccess({count: res[0].total})
    })
  }

  userList(pageNo, onError, onSuccess) {
    if (database === "undefined")
        return onError("UserRepository::userList -> database not found!");
    let offset = pageNo * process.env.SHOW_USER_LIMIT
    let query = "select * from user order by id asc limit ? offset ?";
    database.query(query, [process.env.SHOW_USER_LIMIT, offset], (err, res, f)=>{
        if(err) return onError("database problem occured while querying, Error: " + err.message)
        onSuccess(res)
    })
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
      "update user set name=?, address=?, country=?, stemit_it=?, referrer=?, join_date=?, intro_post_link=?, important_post_link=?, negative_comment=?, admin_special_comment=?, moderator_special_comment=?, user_level=?, profile=? where id=?";
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
        id,
      ],
      (err, res, f) => {
        if (err)
          return onError(
            "updating data of user by id (" +
              id +
              ") having trouble, Error: " +
              err.message
          );
        onSuccess("User(" + id + ") data updated successfully");
      }
    );
  }

  delete(id, onError, onSuccess) {
    if (database === "undefined")
        return onError("UserRepository::update -> database not found!");
    let query = "delete from user where id=?";
    database.query(query, [id], (err, res, f) => {
      if (err)
        onError(
          "Problem occuring while row user(" +
            id +
            ") deleting, Error: " +
            err.message
        );
      onSuccess("Successfully delete of user(" + id + ")");
    });
  }
}

module.exports = UserRepository;
