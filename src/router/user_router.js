const router = require("express").Router();
const userRepository = require("../repository/UserRepository");

router.get("/user_count", (req, res) => {
  if (!req.authenticated)
    return res.send({
      error: "You are not authenticated of userId=" + req.userId,
    });
  userRepository.pageCount(
    (errorMsg) => {
      res.send({ error: errorMsg });
    },
    (successData) => {
      res.send({ success: successData });
    }
  );
});

router.get("/userlist/:page_no", (req, res) => {
  if (!req.authenticated)
    return res.send({
      error: "You are not authenticated of userId=" + req.userId,
    });
  userRepository.userList(
    req.params.page_no,
    (errorMsg) => {
      res.send({ error: errorMsg });
    },
    (successData) => {
      res.send({ success: successData });
    }
  );
});

router.get("/delete/:id", (req, res) => {
  if (!req.authenticated)
    return res.send({
      error: "You are not authenticated of userId=" + req.userId,
    });
  userRepository.delete(
    req.params.id,
    (errorMsg) => {
      res.send({ error: errorMsg });
    },
    (successData) => {
      res.send({ success: successData });
    }
  );
});

module.exports = router;
