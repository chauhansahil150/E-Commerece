import './productItem.css'
import Button from '../Button';
import { useContext, useState } from 'react';
import ProductItemDetail from '../productDetails';
import UserContext from '../../context/user/userContext';
import UserState from '../../context/user/userState';
import { BACKEND_URL } from '../../config.jsX';
import { useNavigate } from 'react-router-dom';


const ProductItem=(props)=>{
    const [isClicked,setIsclicked]=useState(false);
    const [product,setProduct]=useState(props.product);
    const [isAddedToCart,setIsAddedToCart]=useState(false);
    const userData=useContext(UserContext);
    const navigate=useNavigate();
    function onClickProductItem(ev){
        setIsclicked(!isClicked);
    }
    async function addItemToCart() {
if(!userData.user.isLogin){
    navigate('/user/login');
    return;
}
      console.log('object:'+userData);
        const res = await fetch(`${BACKEND_URL}/cart/${userData?.user?.id}/${product?.id}`, {
          method: "post",
        })
        setIsAddedToCart(true);
        
      }
    return (
        <>
        {isClicked?<ProductItemDetail onClickProductItem={onClickProductItem} product={props.product}/>:<></>}
       <div key={props.product.id} className="product-item">
            <img className='block m-auto' src={props.product.thumbnail} alt="" />
            <h3 key='title'>{props.product.name}</h3>
            <h3 key='price'>${props.product.price}</h3>
           <div className="btn-section">
           <Button  onClick={addItemToCart} name={isAddedToCart?'Added':'Add to cart'} />
           <Button onClick={()=>(
            setIsclicked(!isClicked)
    )} name='View Details' />
           </div>
       </div>
       </>
    )
 
}

export default ProductItem;