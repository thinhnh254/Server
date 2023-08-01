const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const {
  genneralAccessToken,
  genneralRefreshToken,
} = require("../routes/JwtService");

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({
        email: userEmail,
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};

      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await User.findOne({
          email: email,
        });

        if (user) {
          let check = await bcrypt.compareSync(password, user.password);

          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Ok";
            delete user.password;
            userData.user = user;
            const access_token = await genneralAccessToken({
              id: user.id,
              isAdmin: user.isAdmin,
            });
            userData.token = access_token;

            const refresh_token = await genneralRefreshToken({
              id: user.id,
              isAdmin: user.isAdmin,
            });

            userData.rftoken = refresh_token;
          } else {
            userData.errCode = 3;
            userData.errMessage = "!Password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = "User's not found!";
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Email does not exist";
      }

      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // check email is exist?
      let check = await checkUserEmail(data.email);
      if (check) {
        resolve({
          errCode: 1,
          message: "Your email is already in used, Try another email",
        });
      }
      let hashPasswordFromBcrypt = await hashUserPassword(data.password);
      await User.create({
        name: data.name,
        email: data.email,
        password: hashPasswordFromBcrypt,
        confirm: data.confirmPassword,
        phone: data.phone,
      });

      resolve({
        errCode: 0,
        message: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let updateUserData = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({
        _id: id,
      });
      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "The user is not required",
        });
      }
      const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser,
  handleUserLogin,
  updateUserData,
};
