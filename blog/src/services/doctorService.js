import db from "../models/index";
import { Op } from "sequelize";
require("dotenv").config();
import _ from "lodash";
import emailService from "../services/emailService";
let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: "R2" },
                order: [["createdAt", "DESC"]],
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
                        as: "genderData",
                        attributes: ["valueEn", "valueVi"],
                    },
                ],
                raw: true,
                nest: true,
            });

            resolve({
                errCode: 0,
                data: users,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: "R2" },
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
                    {
                        model: db.DoctorInfor,
                        include: [
                            {
                                model: db.Specialty,
                                as: "specialtyData",
                                attributes: ["name"],
                            },
                        ],
                    },
                ],
                raw: true,
                nest: true,
            });
            resolve({
                errCode: 0,
                data: doctors,
            });
        } catch (e) {
            reject(e);
        }
    });
};
let getDoctorBySpecial = (id, page, size) => {
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
            let doctors = await db.DoctorInfor.findAndCountAll({
                where: { specialtyId: id },
                include: [
                    {
                        model: db.User,
                        attributes: {
                            exclude: ["password"],
                        },
                        include: [
                            {
                                model: db.Allcode,
                                as: "positionData",
                                attributes: ["valueEn", "valueVi"],
                            },
                        ],
                    },
                ],
                raw: true,
                nest: true,
                limit: size,
                offset: page * size,
                order: [["createdAt", "DESC"]],
            });
            resolve({
                errCode: 0,
                data: {
                    data: doctors.rows,
                    totalPages: Math.ceil(doctors.count / size),
                },
            });
        } catch (e) {
            reject(e);
        }
    });
};
let getDoctorByClinic = (id, page, size) => {
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
            let doctors = await db.DoctorInfor.findAndCountAll({
                where: { clinicId: id },
                include: [
                    {
                        model: db.User,
                        attributes: {
                            exclude: ["password"],
                        },
                        include: [
                            {
                                model: db.Allcode,
                                as: "positionData",
                                attributes: ["valueEn", "valueVi"],
                            },
                        ],
                    },
                ],
                raw: true,
                nest: true,
                limit: size,
                offset: page * size,
                order: [["createdAt", "DESC"]],
            });
            resolve({
                errCode: 0,
                data: {
                    data: doctors.rows,
                    totalPages: Math.ceil(doctors.count / size),
                },
            });
        } catch (e) {
            reject(e);
        }
    });
};
let saveDetailInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !inputData.doctorId ||
                !inputData.contentHTML ||
                !inputData.action ||
                !inputData.priceId ||
                !inputData.specialtyId ||
                !inputData.paymentId ||
                !inputData.clinicId
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter ",
                });
            } else {
                // update to markdown
                if (inputData.action === "ADD") {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        description: inputData.description,
                        doctorId: inputData.doctorId,
                        contentMarkdowmn: inputData.contentMarkdowmn,
                    });
                } else if (inputData.action === "EDIT") {
                    let doctorMarkdown = await db.Markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false,
                    });
                    if (doctorMarkdown) {
                        doctorMarkdown.contentHTML = inputData.contentHTML;
                        doctorMarkdown.contentMarkdowmn =
                            inputData.contentMarkdowmn;

                        doctorMarkdown.description = inputData.description;
                        doctorMarkdown.doctorId = inputData.doctorId;
                        doctorMarkdown.updatedAt = new Date();

                        await doctorMarkdown.save();
                    }
                }

                // upsert to info table

                let doctorInfor = await db.DoctorInfor.findOne({
                    where: {
                        doctorId: inputData.doctorId,
                    },
                    raw: false,
                });
                if (doctorInfor) {
                    //update
                    (doctorInfor.priceId = inputData.priceId),
                        (doctorInfor.provinceId = inputData.provinceId),
                        (doctorInfor.specialtyId = inputData.specialtyId),
                        (doctorInfor.clinicId = inputData.clinicId);

                    await doctorInfor.save();
                    resolve({
                        errCode: 0,
                        errMessage: "update info success",
                    });
                } else {
                    // create
                    await db.DoctorInfor.create({
                        doctorId: inputData.doctorId,
                        priceId: inputData.priceId,
                        provinceId: inputData.provinceId,
                        paymentId: inputData.paymentId,
                        specialtyId: inputData.specialtyId,
                        clinicId: inputData.clinicId,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "Save info success",
                    });
                }
            }
        } catch (error) {
            console.log("looi r");
            reject(error);
        }
    });
};
let getSearchDoctor = (q, type) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (type === "ALL") {
                if (q) {
                    let data = await db.User.findAll({
                        where: {
                            [Op.or]: [
                                { firstName: { [Op.like]: "%" + q + "%" } },
                            ],
                        },
                        attributes: {
                            exclude: ["image"],
                        },
                        raw: true,
                        nest: true,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "search success",
                        data,
                    });
                } else {
                    let data = await db.User.findAll({
                        attributes: {
                            exclude: ["image"],
                        },
                        raw: true,
                        nest: true,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "search success",
                        data,
                    });
                }
            } else if (type === "DOCTOR") {
                if (q) {
                    let data = await db.User.findAll({
                        where: {
                            roleId: "R2",
                            [Op.or]: [
                                { firstName: { [Op.like]: "%" + q + "%" } },
                            ],
                        },
                        attributes: {
                            exclude: ["image"],
                        },
                        raw: true,
                        nest: true,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "search success",
                        data,
                    });
                } else {
                    let data = await db.User.findAll({
                        where: {
                            roleId: "R2",
                        },
                        attributes: {
                            exclude: ["image"],
                        },
                        raw: true,
                        nest: true,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "search success",
                        data,
                    });
                }
            } else if (type === "ADMIN") {
                if (q) {
                    let data = await db.User.findAll({
                        where: {
                            roleId: "R1",
                            [Op.or]: [
                                { firstName: { [Op.like]: "%" + q + "%" } },
                            ],
                        },
                        attributes: {
                            exclude: ["image"],
                        },
                        raw: true,
                        nest: true,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "search success",
                        data,
                    });
                } else {
                    let data = await db.User.findAll({
                        where: {
                            roleId: "R1",
                        },
                        attributes: {
                            exclude: ["image"],
                        },
                        raw: true,
                        nest: true,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "search success",
                        data,
                    });
                }
            } else if (type === "PATIENT") {
                if (q) {
                    let data = await db.User.findAll({
                        where: {
                            roleId: "R3",
                        },
                        attributes: {
                            exclude: ["image"],
                        },
                        raw: true,
                        nest: true,
                    });
                    resolve({
                        errCode: 0,
                        errMessage: "search success",
                        data,
                    });
                } else {
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter id",
                });
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId,
                    },
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        {
                            model: db.Markdown,
                            attributes: [
                                "description",
                                "contentHTML",
                                "contentMarkdowmn",
                            ],
                        },
                        {
                            model: db.Allcode,
                            as: "positionData",
                            attributes: ["valueEn", "valueVi"],
                        },
                        {
                            model: db.DoctorInfor,
                            attributes: {
                                exclude: ["id", "doctorId"],
                            },
                            include: [
                                {
                                    model: db.Allcode,
                                    as: "priceData",
                                    attributes: ["valueEn", "valueVi"],
                                },
                                {
                                    model: db.Allcode,
                                    as: "provinceData",
                                    attributes: ["valueEn", "valueVi"],
                                },
                                {
                                    model: db.Allcode,
                                    as: "paymentData",
                                    attributes: ["valueEn", "valueVi"],
                                },
                                {
                                    model: db.Specialty,
                                    as: "specialtyData",
                                    attributes: ["name"],
                                },
                            ],
                        },
                    ],
                    raw: false,
                    nest: true,
                });

                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.arrSchedule || !data.doctorId || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter required ",
                });
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map((item) => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    });
                }
                // get all exis
                // let existing = await db.Schedule.findAll({
                //   where: { doctorId: data.doctorId, date: data.date },
                //   attributes: ["timeType", "date", "doctorId", "maxNumber"],
                //   raw: true,
                // });
                // create data
                // let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                //   return a.timeType === b.timeType && +a.date === +b.date;
                // });
                await db.Schedule.destroy({
                    where: { doctorId: data.doctorId, date: data.date },
                });
                if (data.arrSchedule && data.arrSchedule.length > 0) {
                    await db.Schedule.bulkCreate(data.arrSchedule);
                }
                resolve({
                    errCode: 0,
                    errMessage: "OK",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getScheduleByDate = (id, dateInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !dateInput) {
                resolve({
                    errCode: -1,
                    errMessage: "missing parameter",
                });
            } else {
                let dataSchedule = await db.Schedule.findAll({
                    where: {
                        doctorId: id,
                        date: dateInput,
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: "timeTypeData",
                            attributes: ["valueEn", "valueVi"],
                        },
                        {
                            model: db.User,
                            as: "doctorData",
                            attributes: ["firstName", "lastName"],
                        },
                    ],
                    raw: false,
                    nest: true,
                });
                if (!dataSchedule) dataSchedule = [];

                resolve({
                    errCode: 0,
                    data: dataSchedule,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getExtraInforDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter id",
                });
            } else {
                let data = await db.DoctorInfor.findOne({
                    where: { doctorId: inputId },
                    raw: false,
                    nest: true,
                    attributes: {
                        exclude: ["id", "doctorId"],
                    },
                    include: [
                        {
                            model: db.Allcode,
                            as: "priceData",
                            attributes: ["valueEn", "valueVi"],
                        },
                        {
                            model: db.Allcode,
                            as: "provinceData",
                            attributes: ["valueEn", "valueVi"],
                        },
                        {
                            model: db.Allcode,
                            as: "paymentData",
                            attributes: ["valueEn", "valueVi"],
                        },
                    ],
                });
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getProfileDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter id",
                });
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    raw: false,
                    nest: true,
                    attributes: {
                        exclude: ["password"],
                    },
                    include: [
                        { model: db.Markdown, attributes: ["description"] },
                        {
                            model: db.Allcode,
                            as: "positionData",
                            attributes: ["valueEn", "valueVi"],
                        },
                        {
                            model: db.DoctorInfor,
                            attributes: {
                                exclude: ["id", "doctorId"],
                            },
                            include: [
                                {
                                    model: db.Allcode,
                                    as: "priceData",
                                    attributes: ["valueEn", "valueVi"],
                                },
                                {
                                    model: db.Allcode,
                                    as: "provinceData",
                                    attributes: ["valueEn", "valueVi"],
                                },
                                {
                                    model: db.Allcode,
                                    as: "paymentData",
                                    attributes: ["valueEn", "valueVi"],
                                },
                            ],
                        },
                    ],
                });

                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data,
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

let getListPatientForDoctor = (doctorId, date, statusId, page, size) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date || !statusId) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter id",
                });
            } else {
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
                let data = await db.Booking.findAndCountAll({
                    where: {
                        statusId: statusId,
                        doctorId: doctorId,
                        date: date,
                    },
                    include: [
                        {
                            model: db.User,
                            as: "patientData",
                            attributes: [
                                "email",
                                "firstName",
                                "address",
                                "gender",
                            ],
                            include: [
                                {
                                    model: db.Allcode,
                                    as: "genderData",
                                    attributes: ["valueEn", "valueVi"],
                                },
                            ],
                        },
                        {
                            model: db.Allcode,
                            as: "timeTypeDataPatient",
                            attributes: ["valueEn", "valueVi"],
                        },
                    ],
                    raw: false,
                    nest: true,
                    limit: size,
                    offset: page * size,
                    order: [["createdAt", "DESC"]],
                });

                resolve({
                    errCode: 0,
                    data: {
                        data: data.rows,
                        totalPages: Math.ceil(data.count / size),
                    },
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let getListHistoryPatient = (doctorId, date, page, size) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter id",
                });
            } else {
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
                let data = await db.History.findAndCountAll({
                    where: {
                        doctorId: doctorId,
                        date: date,
                    },
                    include: [
                        {
                            model: db.User,
                            as: "patientHistoryData",
                            attributes: ["email", "firstName", "address"],
                        },
                    ],
                    raw: true,
                    nest: true,
                    limit: size,
                    offset: page * size,
                    order: [["createdAt", "DESC"]],
                });

                resolve({
                    errCode: 0,
                    data: {
                        data: data.rows,
                        totalPages: Math.ceil(data.count / size),
                    },
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};
let sendRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.email ||
                !data.doctorId ||
                !data.patientId ||
                !data.timeType ||
                !data.pdf
            ) {
                resolve({
                    errCode: 1,
                    errMessage: "missing parameter id",
                });
            } else {
                //update patient status
                
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: "S2",
                    },
                    raw: false,
                });
                if (appointment) {
                    appointment.statusId = "S3";
                    await appointment.save();
                }
                // set history
                await db.History.create({
                    patientId: data.patientId,
                    doctorId: data.doctorId,
                    date: data.date,
                    files: data.pdf,
                });
                // send email remedy
                await emailService.sendAttachment(data);

                resolve({
                    errCode: 0,
                    errMessage: "OKE",
                });
            }
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    getDoctorBySpecial,
    getDoctorByClinic,
    getSearchDoctor,
    saveDetailInfoDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    getListPatientForDoctor,
    getListHistoryPatient,
    sendRemedy,
};
