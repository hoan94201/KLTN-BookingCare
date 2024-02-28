import userSevices from "../services/userSevices";

let refreshtokenData = [];

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    // check email exist
    if (!email || !password) {
        return res.status(500).json({
            errCode: "1",
            message: "missing inputs  parameter",
        });
    }
    let userData = await userSevices.handleUserLogin(email, password);
    refreshtokenData.push(userData.refreshToken);
    if (userData.errCode === 0) {
        return res.status(200).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage,
            data: {
                user: userData.user ? userData.user : {},
                accessToken: userData.accessToken,
            },
        });
    }
    if (userData.errCode === 3) {
        return res.status(401).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage,
        });
    } else {
        return res.status(400).json({
            errCode: userData.errCode,
            errMessage: userData.errMessage,
        });
    }
};
let handleGetUserDetails = async (req, res) => {
    let id = req.query.id;

    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Misiggggggggggggg",
            users: [],
        });
    }
    let users = await userSevices.handleGetUserDetails(id);

    return res.status(200).json({
        errCode: 0,
        errMessage: "0",
        users,
    });
};
let handleGetAllUsers = async (req, res) => {
    let { page, size, type, q } = req.query;

    if (!page || !size) {
        page = 0;
        size = 5;
    }
    if (!type) {
        type = "ALL";
    }
    let users = await userSevices.getAllUsers(page, size, type, q);

    return res.status(200).json({
        errCode: 0,
        errMessage: "0",
        users,
    });
};
let handleCreateNewUser = async (req, res) => {
    let data = req.body;
    let image = req.file.path;
    if (data && data !== undefined) {
        let message = await userSevices.createNewUser(data, image);
        return res.status(200).json(message);
    }
};
let handleEditUser = async (req, res) => {
    let data = req.body;
    let image = req.file;

    let message = await userSevices.updateUserData(data, image);
    return res.status(200).json(message);
};
let handleDeleteUser = async (req, res) => {
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "mising id",
        });
    }
    let message = await userSevices.deleteUser(req.query.id);
    return res.status(200).json(message);
};
let getAllCode = async (req, res) => {
    try {
        //    setTimeout( async() =>{
        let data = await userSevices.getAllCodeService(req.query.type);
        return res.status(200).json(data);
        //  }, 5000)
    } catch (e) {
        console.log("getallcode err", e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "eror from sever",
        });
    }
};
let handleConfirmPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email || !password) {
            return res.status(403).json({
                  message : "Missing parameter"
              });
        }
        let data = await userSevices.confirmPassword(password , email );
        return res.status(200).json(data);
    } catch (e) {
        return res.status(401).json({
            errCode: -1,
            errMessage: "error from sever",
        });
    }
};
module.exports = {
    handleLogin,
    handleGetUserDetails,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
    getAllCode,
    handleConfirmPassword,
};
