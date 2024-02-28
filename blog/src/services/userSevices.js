import db from "../models/index";
import { Op } from 'sequelize';
import bcrypt from "bcryptjs";
var jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
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
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        // user all ready exist
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
        });
        if (user) {
          // compare password
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "Oke";
            delete user.password;
            userData.user = user;
            userData.accessToken = jwt.sign(
              {
                id: user.id,
                roleId: user.roleId,
              },
              process.env.JWT_ACCESS_KEY,
              { expiresIn: "30d" }
            );
            userData.refreshToken = jwt.sign(
              {
                id: user.id,
                roleId: user.roleId,
              },
              process.env.JWT_REFRESH_KEY,
              { expiresIn: "365d" }
            );
          } else {
            userData.errCode = 3;
            userData.errMessage = "wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your Email isn't exist please enter your email!`;
      }
      resolve(userData);
    } catch (error) {
      reject(error);
    }
  });
};
let confirmPassword = (password , email) => {
    return new Promise(async (resolve, reject) => {
        try {
            // user all ready exist
        let user = await db.User.findOne({
          where: { email: email },
          raw: true,
        });
          if (user) {
            // compare password
            let check = await bcrypt.compareSync(password, user.password);
            if (check) {
              resolve({
                  message : "Check password successfully"
              });
            } else {
              reject({
                  message: "Check password fail",
              });
             }
          }
        } catch (error) {
            reject(error);
        }
    });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleGetUserDetails = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({
        where: { id: userId },
      });
      // if (users && users.length > 0) {
      //   users.map(item => {
      //       item.image = Buffer.from(item.image , 'base64').toString('binary');
      //       return item
      //   })

      //}
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
let getAllUsers = (page, size , type , q) => {
  return new Promise(async (resolve, reject) => {
    try {
      const pageAsNumber = Number.parseInt(page);
      const sizeAsNumber = Number.parseInt(size);

      // let page = 0 ;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
      }
      //let size = 10 ;
      if (
        !Number.isNaN(sizeAsNumber) &&
        sizeAsNumber > 0 &&
        sizeAsNumber < 11
      ) {
        size = sizeAsNumber;
      }
      if (type === 'ALL') {
        if (q) {
          const users = await db.User.findAndCountAll({
            where:{
              [Op.or]: [{ firstName: { [Op.like]: "%" + q + "%" } }],
            } ,
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcode,
                as: "positionData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "roleData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw: true,
            nest: true,
    
            limit: size,
            offset: page * size,
            order: [["createdAt", "DESC"]],
          });
          resolve({
            data: users.rows,
            totalPages: Math.ceil(users.count / size),
          });
        } else {
          const users = await db.User.findAndCountAll({
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcode,
                as: "positionData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "roleData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw: true,
            nest: true,
    
            limit: size,
            offset: page * size,
            order: [["createdAt", "DESC"]],
          });
  
          resolve({
            data: users.rows,
            totalPages: Math.ceil(users.count / size),
          });
        }
      }else if (type === 'DOCTOR') {
        if (q) {
          const users = await db.User.findAndCountAll({
            where: {
              roleId : 'R2',
              [Op.or]: [{ firstName: { [Op.like]: "%" + q + "%" } }],
            } ,
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcode,
                as: "positionData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "roleData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw: true,
            nest: true,
    
            limit: size,
            offset: page * size,
            order: [["createdAt", "DESC"]],
          });
    
          resolve({
            data: users.rows,
            totalPages: Math.ceil(users.count / size),
          });
        } else {
          const users = await db.User.findAndCountAll({
            where: {
              roleId : 'R2'
            },
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcode,
                as: "positionData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "roleData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw: true,
            nest: true,
    
            limit: size,
            offset: page * size,
            order: [["createdAt", "DESC"]],
          });
          resolve({
            data: users.rows,
            totalPages: Math.ceil(users.count / size),
          });
        }
      }else if (type === 'ADMIN') {
        if (q) {
          const users = await db.User.findAndCountAll({
            where: {
              roleId : 'R1',
              [Op.or]: [{ firstName: { [Op.like]: "%" + q + "%" } }],
            } ,
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcode,
                as: "positionData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "roleData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw: true,
            nest: true,
    
            limit: size,
            offset: page * size,
            order: [["createdAt", "DESC"]],
          });
    
          resolve({
            data: users.rows,
            totalPages: Math.ceil(users.count / size),
          });
        } else {
          const users = await db.User.findAndCountAll({
            where: {
              roleId : 'R1'
            },
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcode,
                as: "positionData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "roleData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw: true,
            nest: true,
    
            limit: size,
            offset: page * size,
            order: [["createdAt", "DESC"]],
          });

          resolve({
            data: users.rows,
            totalPages: Math.ceil(users.count / size),
          });
        }
      }else if (type === 'PATIENT') {
        if (q) {
          const users = await db.User.findAndCountAll({
            where: {
              roleId : 'R3',
              [Op.or]: [{ firstName: { [Op.like]: "%" + q + "%" } }],
            } ,
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcode,
                as: "positionData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "roleData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw: true,
            nest: true,
    
            limit: size,
            offset: page * size,
            order: [["createdAt", "DESC"]],
          });
          resolve({
            data: users.rows,
            totalPages: Math.ceil(users.count / size),
          });
        } else {
          const users = await db.User.findAndCountAll({
            where: {
              roleId : 'R3'
            },
            attributes: {
              exclude: ["password"],
            },
            include: [
              {
                model: db.Allcode,
                as: "positionData",
                attributes: ["valueEn", "valueVi"],
              },
              {
                model: db.Allcode,
                as: "roleData",
                attributes: ["valueEn", "valueVi"],
              },
            ],
            raw: true,
            nest: true,
    
            limit: size,
            offset: page * size,
            order: [["createdAt", "DESC"]],
          });
          resolve({
            data: users.rows,
            totalPages: Math.ceil(users.count / size),
          });
        }
      }
      
    
    } catch (error) {
      reject(error);
    }
  });
};
let createNewUser = (data , image) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('check' , image);
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage: "email is already in use",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: image,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "the isnt exits",
        });
      }
      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        errMessage: "the user id delete",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let updateUserData = (data , image) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "missing required param",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        if (image) {
          user.firstName = data.firstName;
          user.lastName = data.lastName;
          user.address = data.address;
          user.phoneNumber = data.phoneNumber;
          user.gender = data.gender;
          user.roleId = data.roleId;
          user.positionId = data.positionId;
          user.image = image.path;
  
          await user.save();
        }
        else {
          user.firstName = data.firstName;
          user.lastName = data.lastName;
          user.address = data.address;
          user.phoneNumber = data.phoneNumber;
          user.gender = data.gender;
          user.roleId = data.roleId;
          user.positionId = data.positionId;  
          await user.save();
        }
        resolve({
          errCode: 0,
          errMessage: "update is success",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "do not is found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "missing param type",
        });
      } else {
        let res = {};
        let allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin,
  confirmPassword ,
  handleGetUserDetails,
  getAllUsers,
  createNewUser,
  deleteUser,
  updateUserData,
  getAllCodeService,
};
