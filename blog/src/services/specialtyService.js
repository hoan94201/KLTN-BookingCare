import db from "../models/index";

let createSpecialty = (data, image) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !image || !data.descriptionHTML) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameters",
                });
            } else {
                await db.Specialty.create({
                    name: data.name,
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
let deleteSpecialty = (specialId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Specialty.findOne({
                where: { id: specialId },
            });
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: "the isnt exits",
                });
            }
            await db.Specialty.destroy({
                where: { id: specialId },
            });
            await db.DoctorInfor.destroy({
                where: { specialtyId: specialId },
            });
            resolve({
                errCode: 0,
                errMessage: "the special id delete",
            });
        } catch (error) {
            reject(error);
        }
    });
};
let handleEditSpecial = (data, image) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "missing required param",
                });
            }
            let special = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false,
            });
            if (special) {
                if (image) {
                    special.image = image.path;
                    special.name = data.name;
                    special.descriptionHTML = data.descriptionHTML;
                    special.descriptionMarkdown = data.descriptionMarkdown;

                    await special.save();
                } else {
                    special.name = data.name;
                    special.descriptionHTML = data.descriptionHTML;
                    special.descriptionMarkdown = data.descriptionMarkdown;

                    await special.save();
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
let getAllSpecialty = (page, size) => {
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

            let list = await db.Specialty.findAndCountAll({
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

let getAllSpecialtyAll = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specials = await db.Specialty.findAll();
            resolve({
                errCode: 0,
                data: specials,
            });
        } catch (e) {
            reject(e);
        }
    });
};

let getDetailSpecialtyById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameters",
                });
            } else {
                let data = await db.Specialty.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: ["descriptionHTML", "descriptionMarkdown" , "name"],
                    //   include: [
                    //         {
                    //             model: db.DoctorInfor , as : 'specialtyData' ,
                    //             attributes: ['doctorId' , 'provinceId'],
                    //         },
                    //     ],
                    //     raw : false ,
                    //      nest: true
                });
                if (data) {
                    let doctorSpecialty = [];

                    doctorSpecialty = await db.DoctorInfor.findAll({
                        where: {
                            specialtyId: inputId,
                        },
                         attributes: ["doctorId"] ,
                        
                        raw: false,
                        nest: true,
                    });

                    data.doctorSpecialty = doctorSpecialty;
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
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    deleteSpecialty,
    handleEditSpecial,
    getAllSpecialtyAll,
};
