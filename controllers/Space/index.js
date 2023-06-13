require("dotenv").config();
const model = require("../../models");
const jwt = require("jsonwebtoken");
const short = require("short-uuid");

const cloudinary = require("../../utils/cloudinary");

module.exports = {
  // post auth/login
  addSpace: (req, res) => {
    const requestBody = req.body;
    const authorization = req.headers.authorization.slice(6).trim();
    const decoded = jwt.verify(authorization, process.env.APP_SECRET_KEY);
    const uuid = short.generate();
    const { photo_profile } = req?.files ?? {};

    if (!decoded || !decoded.id) {
      res.status(401).json({
        status: "ERROR",
        messages: "Invalid token",
        data: null,
      });
    }

    let mimeType = photo_profile.mimetype.split("/")[1];
    let allowFile = ["jpeg", "jpg", "png", "webp"];

    // cari apakah tipe data yang di upload terdapat salah satu dari list yang ada diatas
    if (!allowFile?.find((item) => item === mimeType)) {
      res.status(400).send({
        status: false,
        message: "Only accept jpeg, jpg, png, webp",
      });
    }

    // validate size image
    if (photo_profile.size > 2000000) {
      res.status(400).send({
        status: false,
        message: "File to big, max size 2MB",
      });
    }

    const upload = cloudinary.uploader.upload(photo_profile.tempFilePath, {
      public_id: new Date().toISOString(),
    });

    upload
      .then((result) => {
        model.space
          .create({
            ...{
              ...requestBody,
              slug: `${decoded?.fullname}-${uuid}`,
              photo_profile: result.url,
            },
            createdBy: decoded.id,
          })
          .then((result) => {
            if (!result) throw new Error("Failed insert data");

            res.status(201).json({
              status: "OK",
              messages: "insert success",
              data: null,
            });
          })
          .catch((error) =>
            res.status(400).json({
              status: "ERROR",
              messages: error.message || "Something wrong",
              data: null,
            })
          );
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message || "Upload error",
          data: null,
        })
      );
  },
  getSpaceList: (req, res) => {
    const authorization = req.headers.authorization.slice(6).trim();
    const decoded = jwt.verify(authorization, process.env.APP_SECRET_KEY);

    if (!decoded || !decoded.id) {
      res.status(401).json({
        status: "ERROR",
        messages: "Invalid token",
        data: null,
      });
    }

    model.space
      .findAll({
        where: { createdBy: decoded.id },
      })
      .then((result) => {
        if (!result) throw new Error("Failed get data");

        res.status(200).json({
          status: "OK",
          messages: "get success",
          data: result,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message || "Something wrong",
          data: null,
        })
      );
  },
  getSpaceDetail: (req, res) => {
    const authorization = req.headers.authorization.slice(6).trim();
    const decoded = jwt.verify(authorization, process.env.APP_SECRET_KEY);

    if (!decoded || !decoded.id) {
      res.status(401).json({
        status: "ERROR",
        messages: "Invalid token",
        data: null,
      });
    }

    model.space
      .findOne({
        where: { slug: req.params.id },
      })
      .then((result) => {
        if (!result) throw new Error("Failed get data");

        res.status(200).json({
          status: "OK",
          messages: "get success",
          data: result,
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: "ERROR",
          messages: error.message || "Something wrong",
          data: null,
        })
      );
  },
};
