import { connect } from 'react-redux';
import Promotion from '../components/Promotion';
import {getCouponProductDetail,addToCart,receivedCoupon,getProductPrice,saveCart,getPromotionList} from '../../../store/newcart';
import { EditorAttachFile } from 'material-ui/svg-icons';
import { loadingImage } from "../../../store/app";
import {geCustomerOrders} from "../../Dashboard/modules/dashboard.js"
import {fetchConfig} from "../modules/promotion"

const mapStateToProps = (state) => {
  return ({
    couponProduct: state.myCart.couponProduct,
    voucherCodeDetail: state.myCart.voucherCodeDetail,
    loader: state.app.loader,
    applying: state.myCart.applying,
    promotionList:state.myCart.promotionList,
    config:state.Promotion.config,
    applyVoucherCode:state.Promotion.applyVoucherCode
  });
};

const mapDispatchToProps= (dispatch) => {
  return ({
    getCouponProductDetail: (sku) => dispatch(getCouponProductDetail(sku)),
    addToCart : (category,item,selectedProducts,product,edit,toppings,index) => dispatch(addToCart(category,item,selectedProducts,product,edit,toppings,index)),
    receivedCoupon: () => dispatch(receivedCoupon()),
    getProductPrice:(sku,option) => dispatch(getProductPrice(sku,option)),
    saveCart:(container,productId,productSku) => dispatch(saveCart(container,productId,productSku)),
    loadingImage: (status) => dispatch(loadingImage(status)),
    getPromotionList:() => dispatch(getPromotionList()),
       geCustomerOrders:(id) =>dispatch(geCustomerOrders(id)),
       fetchConfig:() =>dispatch(fetchConfig())
  });
};

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);