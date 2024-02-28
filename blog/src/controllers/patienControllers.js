import patientService from '../services/patientService'

let postBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body)
        return res.status(200).json({
            infor
        })
        
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Erorr from sever lỗi từ serve'
        })
    }

}
let postVerifyBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postVerifyBookAppointment(req.query)
        return res.status(200).json({
            infor
        })
        
    } catch (e) {
        return res.status(403).json({
            errCode: -1,
            errMessage: e.errMessage
        })
        
    }
 }
module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment
}