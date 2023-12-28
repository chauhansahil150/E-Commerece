const db=require('../services/dbTransporterQuery');
const dbSeller=require('../services/sellerDBQuery');
const dbProduct=require('../services/dbQuery');


const loadtransporterPage= async (req, res)=>{
    try {
        const areaAlloted=req?.session?.user?.area_allotted;
        const allOrders=await db.getAllPlacedOrders(areaAlloted);
        // res.json(allOrders);
        // res.render('transporter/deliverer',{
        //     name:req.session.user.name,
        //     area_allotted:req.session.user.area_allotted,
        //     userId:req.session.user.id,
        //     role:req.session.user.role,
        //     allOrders
        // });
        res.status(200).json({
                allOrders
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Internal Server Error"});
    
    }
}
const loadLoginPage= async(req, res)=>{
 try {
        res.render('transporter/transporterLoginPage',{
            error:null,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Internal Server Error"});
    
    }
}
const login= async (req, res) => {
    try {
        const user = await db.findUserByEmail(req.body.email);
        if(!user){
        //      res.render('transporter/transporterLoginPage',{
        //     error:'Email does not exists',
        // })
        res.status(404).json({
            msg:"User Does not exist",
            success:false
        })
        // }else if(user.password !== req.body.password){
        //     res.render('transporter/transporterLoginPage',{
        //     error:'Incorrect Password',
        // })
        res.status(401).json({
            msg:"Incorrect Password",
            success:false
        })
        
        }
        // else{
        //     req.session.user={
        //         name:user.name,
        //         role:'transporter',
        //         id:user.id,
        //         email:req.body.email,
        //         area_allotted:user.area_allotted
        //     };
        //     res.status(200).redirect("/transporter");
        //     return;
        // }
        else{
            req.session.user={
                name:user.name,
                role:'transporter',
                id:user.id,
                email:req.body.email,
                area_allotted:user.area_allotted
            };
            res.status(200).json({
                name:user.name,
                role:'transporter',
                id:user.id,
                email:req.body.email,
                area_allotted:user.area_allotted,  
                msg:"login successfully",
                success:true

            })
        }
    
    }catch (error) {
         console.log(error);
        res.status(500).send({error:"Internal Server Error"});
    }
}
const changeOrderStatus= async(req, res)=>{
    try {
        idWithStatus=req.params.id_status.split('-');
        const [id,status]=idWithStatus;
        let dispatchedTo;
        const productId=await dbProduct.getProductIdFromOrders(id);
        if(status=='cancelled'|| status=='returned'){
            dispatchedTo='seller';
            if(status=='returned'){
               dbProduct.updateReturnedCount(productId);
            }
        }else if(status=='delivered'){
            dispatchedTo='user'
             dbProduct.updateDeliveredCount(productId);
        } 
        const response=dbSeller.dispatchOrder(id,dispatchedTo,status);
        if(response){
            res.status(200).json({success:true});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({error:"Internal Server Error"});
    }
}

module.exports={
    loadtransporterPage,
    loadLoginPage,
    login,
    changeOrderStatus
}