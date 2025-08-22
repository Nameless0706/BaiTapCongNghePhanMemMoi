import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log('----------------');
        console.log(data);
        console.log('----------------');
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let getFindAllCRUD = async (req, res) => {
    let data = await CRUDService.getFindAllUser();
    console.log('----------------');
    console.log(data);
    console.log('----------------');
    return res.render('users/findAllUser.ejs', {
        datalist: data
    });
}

let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId);
        // check user data not found
        if (userData) {
            return res.render('users/editCRUD.ejs', {
                data: userData
            });
        } else {
            return res.send('User not found!');
        }
    } else {
        return res.send('User not found!');
    }
}


let putCRUD = async (req, res) => {
    let data = req.body;
    let data1 = await CRUDService.updateUser(data);
    return res.render('users/finaAllUser.ejs', {
        datalist: data1
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.send('Delete the user succeed!');
    } else {
        return res.send('User not found!');
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    getFindAllCRUD: getFindAllCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}



