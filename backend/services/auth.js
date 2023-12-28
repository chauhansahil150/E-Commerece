const isLogin = async (req, res, next) => {
    // try {
    //     if (req?.session.user) {
    //         next();
    //     } else {
    //         res.status(401).redirect("/login");
    //     }
    // } catch (error) {
    //     console.error('Error in isLogin middleware:', error);
    //     res.status(500).send('Internal Server Error');
    // }
    next();
};

const isLogout = async (req, res, next) => {
    // try {
    //     if (req?.session.user) { 
    //         res.status(200).redirect("/user/dashboard");
    //     } else {
    //         next();
    //     }
    // } catch (error) {
    //     console.error('Error in isLogout middleware:', error);
    //     res.status(500).send('Internal Server Error');
    // }
    next();
};

const isAdmin = async (req, res, next) => {
    // try {
    //     if (req?.session?.user?.role === 'admin') { 
    //         next();
    //     } else {
    //         res.status(403).send("Unauthorized access");
    //     }
    // } catch (error) {
    //     console.error('Error in isAdmin middleware:', error);
    //     res.status(500).send('Internal Server Error');
    // }
    next();
};
const canAddProduct = async (req, res, next) => {
    // try {
    //     if (req?.session?.user?.role === 'admin' || req?.session?.user?.role == 'seller') { 
    //         next();
    //     } else {
    //        res.redirect('/seller/login');
    //     }
    // } catch (error) {
    //     console.error('Error in isAdmin middleware:', error);
    //     res.status(500).send('Internal Server Error');
    // }
    next();
};
const isSeller = async (req, res, next) => {
    // try {
    //     if (req?.session?.user?.role == 'seller') { 
    //         next();
    //     } else {
    //         res.redirect('/seller/login');
    //     }
    // } catch (error) {
    //     console.error('Error in isAdmin middleware:', error);
    //     res.status(500).send('Internal Server Error');
    // }
    next();
};
module.exports = {
    isLogin,
    isLogout,
    isAdmin,
    canAddProduct,
    isSeller
};
