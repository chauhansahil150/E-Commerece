import { BACKEND_URL } from "../config.jsX"
export const GET_ALL_CARTiTEMS=`${BACKEND_URL}/cart`;
export const REMOVE_CART_PRODUCT=`${BACKEND_URL}/cart/delete/`;
export const UPDATE_CART_PRODUCT_QUANTITY=`${BACKEND_URL}/cart/product-quantity`
export const PLACE_ORDER_API=`${BACKEND_URL}/cart/place-order`
export const USER_ORDERS=`${BACKEND_URL}/user/orders`
export const ORDER_CANCEL=`${BACKEND_URL}/user/order/cancel/`
export const BECOMING_SELLER_REQUEST=`${BACKEND_URL}/admin/seller-request`;
export const CHECK_IS_LOGGED_IN=`${BACKEND_URL}/is-logged-in`;
export const REJECT_SELLER=`${BACKEND_URL}/admin/seller/reject/`;
export const APPROVE_SELLER=`${BACKEND_URL}/admin/seller/approve/`;
export const LOGOUT=`${BACKEND_URL}/logout`
export const ADD_PRODUCT=`${BACKEND_URL}/seller/products`;
export const ALLPRODUCTS_TO_BE_APPROVED_BY_ADMIN=`${BACKEND_URL}/admin/product-request`;
export const ADMIN_REJECT_PRODUCT=`${BACKEND_URL}/admin/product/reject/`;
export const ADMIN_APPROVE_PRODUCT=`${BACKEND_URL}/admin/product/approve/`;
export const ALL_PLACED_ORDERS_API=`${BACKEND_URL}/seller/customer-placed-order`;
export const DISPATCH_ORDER_BY_SELLER=`${BACKEND_URL}/seller/order/dispatch/`;

//transporter
export const ALL_PLACED_ORDERS_FOR_TRANSPORTER_API=`${BACKEND_URL}/transporter`;
export const DISPATCH_ORDER_BY_TRANSPORTER=`${BACKEND_URL}/transporter/order/status/`;

// forgot-password
export const USER_FORGOT_PASSWORD=`${BACKEND_URL}/user/forgot-password`;
// export const USER_CHANGE_PASSWORD=``