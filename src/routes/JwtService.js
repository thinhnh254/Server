const jwt = require("jsonwebtoken");

const genneralAccessToken = (payload) => {
  console.log("payload", payload);
  const access_token = jwt.sign(
    {
      payload,
    },
    "access_token",
    { expiresIn: "1h" }
  );

  return access_token;
};

const genneralRefreshToken = (payload) => {
  console.log("payload", payload);
  const refresh_token = jwt.sign(
    {
      payload,
    },
    "refresh_token",
    { expiresIn: "365d" }
  );

  return refresh_token;
};

module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
};
