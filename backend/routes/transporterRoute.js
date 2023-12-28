const express= require('express');
const transporterRoute=express.Router();
const {
    loadtransporterPage,
    loadLoginPage,
    login,
    changeOrderStatus
}=require('../controllers/transporterController');
const userControllers=require('../controllers/userController');
transporterRoute.get('/login',loadLoginPage);
transporterRoute.get('/',loadtransporterPage);
transporterRoute.post('/login',login);
transporterRoute.put('/order/status/:id_status',changeOrderStatus);
transporterRoute.post('/change-password/:id', userControllers.changePassword)
module.exports=transporterRoute;