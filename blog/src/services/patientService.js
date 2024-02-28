import db from "../models/index";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_WEBSITE}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.date ||
        !data.timeType ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "missing parameters",
        });
      } else {
        let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

        await emailService.sendSimpleEmail({
          reciveEmail: data.email,
          patientName: data.fullName,
          timeType: data.timeString,
          doctorName: data.doctorName,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        //update schedule
        let dataSchedule = await db.Schedule.findOne({
          where: {
            doctorId: data.doctorId,
            date: data.date,
            timeType: data.timeType,
          },
          raw: false,
        });
        if (dataSchedule) {
          dataSchedule.currentNumber = "1";
          await dataSchedule.save();
        }

        //upsert user
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullName,
            phoneNumber : data.phoneNumber
          },
        });

        // create Booking recod
        if (user && user[0]) {
          const handle = await db.Booking.create({
            statusId: "S1",
            doctorId: data.doctorId,
            patientId: user[0].id,
            date: data.date,
            timeType: data.timeType,
            token: token,
          });
          setTimeout(async () => {
            let check = await db.Booking.findOne({
              where: {
                token: token,
              },
            });
            if (check && check.statusId === "S1") {
              await db.Booking.destroy({
                where: {
                  token: token,
                },
              });
              dataSchedule.currentNumber = "0";
              await dataSchedule.save();
            } else {
            }
          }, 600000);
        }
        resolve({
          errCode: 0,
          errMessage: "save infor patient success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let postVerifyBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token) {
        reject({
            errCode: 1,
            errMessage: "missing parameters",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "update appointment success",
          });
        } else {
          reject({
              errCode: 2,
              errMessage: "appointment has already been exits",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointment,
  postVerifyBookAppointment,
};
