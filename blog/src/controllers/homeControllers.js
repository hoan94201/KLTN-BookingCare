import db from '../models/index'
import CRUDservice from '../services/CRUDservice'


let getHomePage = async(req, res) =>{

  try {
    let data = await db.User.findAll()

    return res.render('homePage.ejs',{
      data : JSON.stringify(data)
    })
  } catch (e) {
    console.log(e)
  }
}
 let getCRUD = async(req, res) =>{
    return res.render('crud.ejs')
 }
let postCRUD = async(req, res) =>{
  
  let message = await CRUDservice.createNewUser(req.body);
  console.log(message)
   
    return res.send('da post  ')
  }


 // -----------------
 
  let displayGetCRUD = async(req, res) =>{

    let data = await CRUDservice.getAllUser({
      raw : true,
    });
    console.log('-------------')
    console.log(data)
    console.log('-------------')
    return res.render('displayCRUD.ejs' ,{
      dataTable : data
    })
  }
   let getEditCRUD = async(req, res) =>{
        let userId = req.query.id ;
        if(userId){

          let userData = await   CRUDservice.getUserInfoByID(userId);
          return res.render('editCRUD.ejs' ,{
            user : userData
          })
        } else {
          return res.send('get user id not found');
        }
   }
   let putCRUD = async(req, res) =>{
        let data = req.body ;
       let allUsers = await CRUDservice.updateUserData(data)
       return res.render('displayCRUD.ejs' ,{
        dataTable : allUsers
      })
   }
   let deleteCRUD = async(req, res) =>{
      let id  = req.query.id 
      await CRUDservice.deleteUserData(id)
      return res.send('delete succed ')
   }

module.exports = {
    getHomePage ,
    getCRUD ,
    postCRUD ,
    displayGetCRUD ,
    getEditCRUD ,
    putCRUD ,
    deleteCRUD
}