import db from "../models/index";

let createClinic = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.address || !image || !data.descriptionHTML) {
        resolve({
          errCode: 1,
          errMessage: "missing parameters",
        });
      } else {
        await db.Clinic.create({
            name: data.name,
            address: data.address,
            image: image.path,
            descriptionHTML: data.descriptionHTML,
            descriptionMarkdown: data.descriptionMarkdown,
        });
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllClinic = (page, size) => {
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
        sizeAsNumber < 10
      ) {
        size = sizeAsNumber;
      }

      let list = await db.Clinic.findAndCountAll({
        raw: true,
        nest: true,
        limit: size,
        offset: page * size,
        order: [["createdAt", "DESC"]],
      });
      resolve({
        errCode: 0,
        errMessage: "ok",
        data: {
          data: list.rows,
          totalPages: Math.ceil(list.count / size),
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllClinicAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinics = await db.Clinic.findAll();
            resolve({
                errCode: 0,
                data: clinics,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let deleteClinic = (clinicId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Clinic.findOne({
        where: { id: clinicId },
      });
      if (!user) {
        resolve({
          errCode: 2,
          errMessage: "the isnt exits",
        });
      }
      await db.Clinic.destroy({
        where: { id: clinicId },
      });
      await db.DoctorInfor.destroy({
        where: { clinicId: clinicId },
      });
      resolve({
        errCode: 0,
        errMessage: "the clinic id delete",
      });
    } catch (error) {
      reject(error);
    }
  });
};
let handleEditClinic = (data, image) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "missing required param",
        });
      }
      let clinic = await db.Clinic.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (clinic) {
        if (image) {
          clinic.image = image.path;
          clinic.name = data.name;
          clinic.address = data.address;
          clinic.descriptionHTML = data.descriptionHTML;

          await clinic.save();
        } else {
          clinic.name = data.name;
          clinic.address = data.address;

          clinic.descriptionHTML = data.descriptionHTML;
          await clinic.save();
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
let getDetailClinicById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "missing parameters",
        });
      } else {
        let data = await db.Clinic.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data) {
          let doctorClinic = [];
          doctorClinic = await db.DoctorInfor.findAll({
            where: {
              clinicId: inputId,
            },
            attributes: ["doctorId", "provinceId"],
          });

          data.doctorClinic = doctorClinic;
        } else {
          data = {};
        }
        resolve({
          errCode: 0,
          errMessage: "ok",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
    createClinic,
    getAllClinic,
    getDetailClinicById,
    deleteClinic,
    handleEditClinic,
    getAllClinicAll
};
