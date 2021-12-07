const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const userRepository = require("../repository/UserRepository");
const ResizeRepository = require("../repository/ResizeRepository");

const upload = multer();
router.post("/create_user", upload.single("image"), async (req, res) => {
  if (!req.authenticated)
    return res.send({
      error: "You are not authenticated of userId=" + req.userId,
    });

  if (!req.file) {
    return res.send({ error: "Please provide an image" });
  }
  if (!req.body.userLevel || req.body.userLevel === "") {
    return res.send({ error: "Please select user level" });
  }
  if (!req.body.joinDate || req.body.joinDate === "") {
    return res.send({ error: "Please provide a join date" });
  }
  if (
    !!req.body.name &&
    !!req.body.address &&
    !!req.body.country &&
    !!req.body.referrer &&
    !!req.body.steamitId &&
    !!req.body.introPostLink &&
    !!req.body.impoPostLink &&
    !!req.body.negComment &&
    !!req.body.adminSpecialComment &&
    !!req.body.modSpecialComment
  ) {
    try {
      const fileUpload = new ResizeRepository();
      const filename = await fileUpload.save(req.file.buffer);
      if (filename !== "") {
        userRepository.insert(
          {
            name: req.body.name,
            address: req.body.address,
            country: req.body.address,
            steamit_id: req.body.steamitId,
            referrer: req.body.referrer,
            join_date: req.body.joinDate,
            intro_post_link: req.body.introPostLink,
            impo_post_link: req.body.impoPostLink,
            negative_comment: req.body.negComment,
            admin_special_comment: req.body.adminSpecialComment,
            moderator_special_comment: req.body.modSpecialComment,
            user_level: req.body.userLevel,
            profile: filename,
          },
          (err) => {
            fileUpload.deleteFile(filename);
            return res.send({ error: err });
          },
          (successData) => {
            return res.send({ success: successData });
          }
        );
      } else {
        return res.send({
          error:
            "Error occured while saving profile image! Cause: no filename returned",
        });
      }
    } catch (e) {
      return res.send({
        error: "Profile Image saving error!, Error: " + e,
      });
    }
  } else {
    return res.send({
      error: "You've to initialize other field with empty value",
    });
  }
});

router.get("/user/:id", (req, res) => {
  if (!req.authenticated)
    return res.send({
      error: "You are not authenticated of userId=" + req.userId,
    });
  if (!req.params.id) {
    return res.send({ error: "User id doesn't provided in the url" });
  }
  userRepository.readById(
    req.params.id,
    (error) => {
      return res.send({ error: error });
    },
    (successData) => {
      if (successData.length > 0) {
        return res.send({ success: successData[0] });
      } else {
        return res.send({ success: {} });
      }
    }
  );
});

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
