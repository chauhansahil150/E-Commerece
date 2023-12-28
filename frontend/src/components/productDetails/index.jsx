import Button from '../Button';
import ImageSlider from '../slider/SimpleSlider';
import style from './index.module.css';
import Slider from "react-slick";

// import './index.css'
const ProductItemDetail=(props)=>{
    const {onClickProductItem }=props;
    return(
    <div className={style.product_detail}>
        <ImageSlider images={JSON.parse(props.product.images)} />
        <h3 key='title'>{props.product.name}</h3>
        <h3 key='price'>${props.product.price}</h3>
        <h3 key='description'>{props.product.description}</h3>
        <Button name='Close' className={style.close} onClick={onClickProductItem}/>
    </div>
    )
}
export default ProductItemDetail;