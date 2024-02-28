import clinicService from '../services/clinicService'


let createClinic = async(req, res) => {
    try {
        const image = req.file

        let infor = await clinicService.createClinic(req.body , image)
        return res.status(200).json(infor)
            
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                errCode: -1,
                errMessage : ' error from server '
            })
        }
}
let deleteClinic = async(req, res) => {
    try {
        let infor = await clinicService.deleteClinic(req.query.id)
        return res.status(200).json(infor)
            
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                errCode: -1,
                errMessage : ' error from server '
            })
        }
}
let handleEditClinic = async (req, res) =>{
    let data = req.body;
    let image = req.file

    let message = await clinicService.handleEditClinic(data , image)
    return res.status(200).json(message)
    }
let getAllClinic = async (req, res) => {
    try {
        let { page, size } = req.query;
        if(!page || !size){
            page = 0 ;
            size = 5 ;
            }
        let infor = await clinicService.getAllClinic(page , size)
        return res.status(200).json(infor)
            
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                errCode: -1,
                errMessage : ' error from server '
            })
        }
}
let getAllClinicAll = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinicAll();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: " error from server ",
        });
    }
};
let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(infor)
            
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                errCode: -1,
                errMessage : ' error from server '
            })
        }
 }
module.exports = {
    createClinic,
    getAllClinic,
    getDetailClinicById,
    deleteClinic,
    handleEditClinic,
    getAllClinicAll
};