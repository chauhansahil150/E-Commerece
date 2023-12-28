const express= require('express');
const adminRoute= express();
const auth=require('../services/auth');
const {
    changePassword
}=require('../controllers/userController');
const {
    loadAdminPage,
    addNewProducts,
    loadSellerRequestsPage,
    rejectSellerRequest,
    approveSellerRequest,
    loadProductRequestsPage,
    rejectSellerProductRequest,
    approveSellerProductRequest,
}=require('../controllers/adminControllers');
const sellerController=require('../controllers/sellerController');

adminRoute.get('/',loadAdminPage);
adminRoute.post('/products',addNewProducts);
adminRoute.get('/seller-request',loadSellerRequestsPage);
adminRoute.get('/seller/reject/:id',rejectSellerRequest);
adminRoute.get('/seller/approve/:id',approveSellerRequest);
adminRoute.get('/product/reject/:id',rejectSellerProductRequest);
adminRoute.get('/product/approve/:id',approveSellerProductRequest);
adminRoute.get('/product-request',loadProductRequestsPage);
adminRoute.post('/change-password/:id', changePassword);
adminRoute.get('/chart',auth.isAdmin,sellerController.loadChartPage);


module.exports=adminRoute;