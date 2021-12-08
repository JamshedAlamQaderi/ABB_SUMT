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

router.post("/update_user/:id", upload.single("image"), async (req, res) => {
  if (!req.authenticated)
    return res.send({
      error: "You are not authenticated of userId=" + req.userId,
    });

  // if (!req.file) {
  //   return res.send({ error: "Please provide an image" });
  // }

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
      let userId = req.params.id;
      userRepository.readById(
        userId,
        (idError) => {
          return res.send({ error: idError });
        },
        async (idSuccessData) => {
          if (idSuccessData.length > 0) {
            let userDetail = idSuccessData[0];
            let filename = "";
            if (req.file) {
              const fileRepository = new ResizeRepository();
              filename = await fileRepository.save(req.file.buffer);
            } else {
              filename = userDetail.profile;
            }
            userRepository.update(
              userId,
              {
                name: req.body.name,
                address: req.body.address,
                country: req.body.country,
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
                fileRepository.deleteFile(filename);
                return res.send({ error: err });
              },
              (successData) => {
                if (req.file && userDetail.profile !== "") {
                  let fileRepository = new ResizeRepository();
                  fileRepository.deleteFile(userDetail.profile);
                }
                return res.send({ success: successData });
              }
            );
          } else {
            return res.send({ error: "No user found on provided id" });
          }
        }
      );
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
  userRepository.userCount(
    {
      searchText: req.query.search_text || "",
      colName: req.query.col_name || "",
    },
    (errorMsg) => {
      res.send({ error: errorMsg });
    },
    (successData) => {
      res.send({ success: successData });
    }
  );
});

router.get("/userlist", (req, res) => {
  if (!req.authenticated)
    return res.send({
      error: "You are not authenticated of userId=" + req.userId,
    });
  userRepository.userList(
    {
      pageNo: req.query.page_no || 0,
      searchText: req.query.search_text || "",
      colName: req.query.col_name || "id",
    },
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
  userRepository.readById(
    req.params.id,
    (idError) => {
      return res.send({ error: idError });
    },
    (idSuccessData) => {
      if (idSuccessData.length > 0) {
        let userDetail = idSuccessData[0];
        userRepository.delete(
          req.params.id,
          (errorMsg) => {
            res.send({ error: errorMsg });
          },
          (successData) => {
            let resizeRepository = new ResizeRepository();
            resizeRepository.deleteFile(userDetail.profile);
            res.send({ success: successData });
          }
        );
      } else {
        return res.send({
          error: "Data not found by id(" + req.params.id + ")",
        });
      }
    }
  );
});

module.exports = router;
