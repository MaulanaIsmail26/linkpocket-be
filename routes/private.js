const version = "/v1";

module.exports = [
  {
    path: `${version}/users`,
    controllers: require("../controllers/Users").getUser,
    method: "get",
    cache: false,
  },
  {
    path: `${version}/space`,
    controllers: require("../controllers/Space").addSpace,
    method: "post",
    cache: false,
  },
  {
    path: `${version}/space`,
    controllers: require("../controllers/Space").getSpaceList,
    method: "get",
    cache: false,
  },
  {
    path: `${version}/space/:id`,
    controllers: require("../controllers/Space").getSpaceDetail,
    method: "get",
    cache: false,
  },
];
