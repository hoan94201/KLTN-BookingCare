import specialtyService from '../services/specialtyService'


let createSpecialty = async(req, res) => {
    try {
        const image = req.file
        let infor = await specialtyService.createSpecialty(req.body , image)
        return res.status(200).json(infor)
            
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                errCode: -1,
                errMessage : ' error from server '
            })
        }
}

let deleteSpecialty = async(req, res) => {
    try {
        let infor = await specialtyService.deleteSpecialty(req.query.id)
        return res.status(200).json(infor)
            
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                errCode: -1,
                errMessage : ' error from server '
            })
        }
}
let handleEditSpecial = async (req, res) =>{
    let data = req.body;
    let image = req.file

    let message = await specialtyService.handleEditSpecial(data , image)
    return res.status(200).json(message)
    }
let getAllSpecialty = async (req, res) => {
    try {
        let { page, size } = req.query;
        if(!page || !size){
            page = 0 ;
            size = 5 ;
            }

        let infor = await specialtyService.getAllSpecialty(page , size)
        return res.status(200).json(infor)
            
        } catch (e) {
            console.log(e);
            return res.status(200).json({
                errCode: -1,
                errMessage : ' error from server '
            })
        }
}
let getAllSpecialtyAll = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialtyAll();
        return res.status(200).json(infor);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: " error from server ",
        });
    }
};
let getDetailSpecialtyById = async (req, res) => {
    try {
        let infor = await specialtyService.getDetailSpecialtyById(req.query.id);
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
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    deleteSpecialty,
    handleEditSpecial,
    getAllSpecialtyAll
};