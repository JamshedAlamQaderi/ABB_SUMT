const router = require("express").Router();
const authRepository = require("../repository/AuthRepository");
const adminRepository = require("../repository/AdminRepostory");

router.post("/login", (req, res) => {
  if (req.body.username != "" && req.body.password != "") {
    adminRepository.login(
      { username: req.body.username, password: req.body.password },
      (errorMsg) => {
        res.send({ error: errorMsg });
      },
      (successData) => {
        if (successData.length > 0) {
          let userId = successData[0].id;
          const token = authRepository.generateAccessToken(
            userId,
            req.body.rememberMe
          );
          res.send({ JWT_TOKEN: token });
        } else {
          res.send({ error: "Username & password are invalid" });
        }
      }
    );
  } else {
    res.send({ error: "username & password fields empty" });
  }
});

module.exports = router;
