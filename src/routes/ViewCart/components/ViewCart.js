import React from 'react';
import './ViewCart.scss';
import PlaceOrder from './PlaceOrder';
import ServiceMethod from './ServiceMethodOptions';
import DeliveryAddress from './DeliveryAddress';
import AdditionalInstruction from './AdditionalInstruction';
// import Alert from "components/Alert";
import Detail from './Detail';
import PaymentMethod from './PaymentMethod';
import OrderOptions from './OrderOptions';
import {Url,Tax} from 'config/Config';
import {Link,browserHistory} from 'react-router';
import moment from 'moment';
import PropTypes, { object } from 'prop-types'
import backImage from '../../../../public/newimages/backImage.png'
import { saveLocalStorage, getLocalStorage } from 'components/Helpers';
import { Button } from "reactstrap";
// import NewHeader from '../../../../src/components/NewHeader';
import editIcon from '../../../../public/newimages/edit.png';
import EmptyCart from './EmptyCart';
// import OrderModal from './OrderModal';
import ConfirmBox from '../../../../src/components/ConfirmBox';
import { CommaFormatted } from '../../../components/Helpers'
import Loader from '../../../components/Loader';
import Captha from "./ReCaptcha.js"
// import sha256 from 'crypto-js/sha256';
import {find} from "lodash"
import { sha256, sha224 } from 'js-sha256'
import { Row } from "reactstrap";
import FreeModal from "./freeModal"
import Image from "../../../../public/newimages/caret-down.png"
import QuantityModal from "./QuantityModal"

const OrderCount = (props) => {
  const limitData = getLocalStorage("configData")
  const maxItem = _.get(limitData , "max_item.data.limit" , "");
   const {index} = props;
    let quantity = 0;
       var restrictedCoupons =JSON.parse(localStorage.getItem("restrictedCoupon"));
       var toRemove = 'RCNTKTOK';
        var indexVal = restrictedCoupons[0].indexOf(toRemove);
        if (indexVal > -1) { //Make sure item is present in the array, without if condition, -n indexes will be considered from the end of the array.
          restrictedCoupons[0].splice(indexVal, 1);
        }
    let selectedProducts = JSON.parse(localStorage.getItem("cartItems"));
            let totalQuantity = 0;
            let productId = ''
            let productQunaity = 0
            let restrictedQuanityProduct = []
    for (var i=0; i<selectedProducts.length; i++) {
          totalQuantity += selectedProducts[i].quantity;
    }



    for(let i=0;i<selectedProducts.length;i++){
        if(props.pizza === true && props.item.default_topping===selectedProducts[i].default_topping && props.totalToppings.length===selectedProducts[i].current_topping.length){
          let temp = []
          props.totalToppings.map(cT => {
            temp.push(cT.code)
          })
          selectedProducts[i].current_topping.map(ct => {
            let flag = false
            temp.map(ele => {
              if(ct.code===ele){
                flag = true
              }
            })
            if(flag == false){
              temp.push(ct.code)
            }
          })
          if(temp.length==props.totalToppings.length && props.item.sku===selectedProducts[i].item.sku){
            quantity = selectedProducts[i].quantity
          }
        }
        else if((props.promo===true||props.valueDeals===true) && props.item.sku===selectedProducts[i].id){
            let same = 0
            const smallArray = props.product.length > selectedProducts[i].product.length ? selectedProducts[i].product.length : props.product.length
            for(let j=0;j<smallArray;j++){
                if(props.product[j].item.sku===selectedProducts[i].product[j].item.sku){
                    same = same+1
                }
            }
            if(same === smallArray){
                quantity = selectedProducts[i].quantity
            }

        }
        else if(props.pizza===false && props.promo===false && props.item.sku===selectedProducts[i].id){
            quantity = selectedProducts[i].quantity
        }
    }
   return(

        <div className='text-right row mx-0'>
            <div className='col-8 row mx-0 px-0 item-increase'>
                <div className="col-4 decrease-icon" onClick={() => props.removeCart(props.category,props.item,selectedProducts,props.product,"",props.totalToppings)}>-</div>
                <div className="col-4 item-count">{quantity}</div>
             {
              (selectedProducts[index].id === "RCNTKTOK")
              ? 
              (restrictedCoupons[0].indexOf(selectedProducts[index].id) <= -1)  && (totalQuantity < maxItem) && ( quantity < 4)
             ?  
             <div className="col-4 increase-icon" onClick={() =>props.addToCart(props.category,props.item,selectedProducts,props.product,"",props.totalToppings)}>+</div>
             :
            <div className="col-4 increase-icon disabledButton">+</div>
              : 
             (restrictedCoupons[0].indexOf(selectedProducts[index].id) <= -1) && (totalQuantity < maxItem) 
             ?  
             <div className="col-4 increase-icon" onClick={() =>props.addToCart(props.category,props.item,selectedProducts,props.product,"",props.totalToppings)}>+</div>
             :
            <div className="col-4 increase-icon disabledButton">+</div>
              }

            </div>
                {props.pizza === true && <Link to = {{
                        pathname: `${Url.TOPPINGS}/${props.product.url_key}`,
                        state : {
                            product : props.product,
                            fromCart: true,
                            index : props.index,
                            sku : props.item.sku,
                            toppings : props.totalToppings,
                            size: props.item.size,
                        }
                    }} className="edit-icon col-3 px-0 mr-auto text-center ml-1"><img src={editIcon} alt='edit' title='edit' className='img-fluid'/></Link>}
                {props.promo === true && <Link to = {{
                        pathname: `${Url.NEW_PROMOTION_DETAIL}/${props.item.url_key}`,
                        state : {
                            sku : props.item.sku,
                            fromCart: true,
                            page : Url.VIEW_CART,
                            index : props.index,
                            product : props.product
                        }
                }} className="edit-icon col-3 px-0 mr-auto text-center ml-1"><img src={editIcon} alt='edit' title='edit' className='img-fluid'/></Link>}
                {props.valueDeals === true && <Link to = {{
                        pathname: `${Url.NEW_PAKET_HEMAT}/${props.item.url_key}`,
                        state : {
                            sku : props.item.sku,
                            fromCart: true,
                            page : Url.VIEW_CART,
                            index: props.index,
                            product : props.product
                        }
                }} className="edit-icon col-3 px-0 mr-auto text-center ml-1"><img src={editIcon} alt='edit' title='edit' className='img-fluid'/></Link>}
    </div>
    )

}

class ViewCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            additionalInstruction : "",
            firstName : "",
            lastName : "",
            mobile : "",
            email : "",
            paymentMethod: "cash",
            agree : true,
            isShowLaterOrder: false,
            isDisabled: true,
            selectLaterOrder: false,
            laterDate: "",
            laterTime: "",
            showFavouriteConfirm : false,
            render : false,
            tax:false,
            showTax:false,
            showButton:true,
            showFreeModal:false,
            showDetails:false,
            aboveOrderPrice:false,
            productModal:false,
            limitMsg:""
        }
        this.saveOrderTime = this.saveOrderTime.bind(this)
        this.changeLaterOrderOption = this.changeLaterOrderOption.bind(this)
        this.placeOrder = this.placeOrder.bind(this)
        this.handleField = this.handleField.bind(this)
        this.handleAlertBox = this.handleAlertBox.bind(this)
        this.replaceOrder = this.replaceOrder.bind(this)
        this.handleConfirmBox = this.handleConfirmBox.bind(this)

        // branch.logEvent(
        //   "Cart Screen",
        //   function(err) { console.log(err); }
        //    )
    }

    handleField(e,fieldName){
        this.setState({
            [fieldName] : e.target.value
        })
        if(fieldName==="additionalInstruction"){
          saveLocalStorage("additionalInstruction",e.target.value)
        }
    }

    handlePaymentMethod(e){
        this.setState({
            paymentMethod: e.target.value
        })
        const paymentMode = {option:e.target.value}
        saveLocalStorage('payment', paymentMode);
        e.preventDefault()
    }

    handleAgreement(e){
        this.setState({
            agree : e.target.checked
        })
        this.props.fetchUser();
    }

    replaceOrder(){
        this.setState({
            replace : true
        })
    }

    componentDidMount() {
      // let menu = "ViewCart";
      // saveLocalStorage("page", menu);
       let data = getLocalStorage("receivedLoginDetail");

        this.props.fetchConfig()

      const cartItem = JSON.parse(localStorage.getItem("cartItems"));
      const page = JSON.parse(localStorage.getItem("page"));

      if(page!="ViewCart"){
        for (var i = 0; i < cartItem.length; i++)
      if (cartItem[i].id && cartItem[i].id === "DELVYFEE") {
        cartItem.splice(i, 1);
        localStorage.setItem("cartItems",JSON.stringify(cartItem))
        break;
     }
      }
      this.props.detailForm();
      this.props.getTaxData();
    }

    componentWillUnmount(){
     this.props.setDelivery(false)
    }

    componentWillMount(){

      const cart = JSON.parse(localStorage.getItem('cartItems'));
      if(cart===null){
        browserHistory.push({
          pathname: Url.MENU_PAGE,
        })
      } else {
        this.props.fetchUser();
        this.props.getStoreTime();
        this.saveOrderTime("time", this.props.selectedTime);
        //this.props.calculateLateOrderDateTime("today");
        let order = getLocalStorage('order');
        if(typeof order.orderDate !== "undefined"){
            if(order.advanceOrder === true){
                this.props.calculateLateOrderDateTime(order.orderDate);
                this.setState({selectLaterOrder: true, laterDate: order.orderDate, laterTime: order.orderTime, isShowLaterOrder: true, isDisabled: false});
            }
        } else{
          this.changeLaterOrderOption(false);
        }
      }
    }

    componentWillReceiveProps(props) {
         let orderedItems = {
        quantity : 0,
        amount: 0,
        tax : 0,
        delivery: 0,
        total: 0
      };
      let taxPrice = 0
      let allToppings = JSON.parse(localStorage.getItem("allToppings"))
      let selectedProducts = JSON.parse(localStorage.getItem("cartItems"))
      let config = JSON.parse(localStorage.getItem("configData"))
      const cartItem = JSON.parse(localStorage.getItem("cartItems"));

      selectedProducts!==null && selectedProducts.map(item => {
          orderedItems.quantity = orderedItems.quantity + item.quantity
         orderedItems.amount = orderedItems.amount + (item.price*item.quantity)
          if(item.item.id === "DELVYFEE"){
            taxPrice=item.price
          }
          orderedItems.tax = Math.round(orderedItems.amount*Tax.rate/100);
      })
      let percents = selectedProducts.filter(item => item.id === "FRB75K");

      if(config != null && config != undefined) {
          if(orderedItems.amount > config[0].freeproduct.data.minimum_check && percents.length === 0 && config[0].freeproduct.data.status === "TRUE"){
          this.setState({
            showFreeModal:true
          })
        }
     }


     for (var i = 0; i < cartItem.length; i++)
      orderedItems.total = orderedItems.amount + orderedItems.tax + orderedItems.delivery
         if(orderedItems.amount > (50000 + parseInt(taxPrice)) || this.props.user.deliveryType === "Carryout" ){

        for (var i = 0; i < cartItem.length; i++)
      if (cartItem[i].id && cartItem[i].id === "DELVYFEE") {
        cartItem.splice(i, 1);
        localStorage.setItem("cartItems",JSON.stringify(cartItem))
        this.props.setDelivery(true)
        break;
      }
      }


      for (var i = 0; i < cartItem.length; i++)
      if ((cartItem[i].id && cartItem[i].id === "DELVYFEE" || cartItem[i].id && cartItem[i].id === "FRB75K") && cartItem.length===1) {
        cartItem.splice(i, 1);
        localStorage.setItem("cartItems",JSON.stringify(cartItem))
        break;
    }
       for (var i = 0; i < cartItem.length; i++)
      if ( cartItem[i].id && cartItem[i].id === "FRB75K" && orderedItems.amount < 75000) {
          this.setState({
            showFreeModal:false
          })
        cartItem.splice(i, 1);
        localStorage.setItem("cartItems",JSON.stringify(cartItem))
        break;
    }



      let cartItems = JSON.parse(localStorage.getItem("cartItems"));
      for(let i=0;i<cartItems.length;i++){
        for(let j=i+1;j<cartItems.length;j++){
          if(cartItems[i].category==='pizza'&&i!==j&&cartItems[i].id===cartItems[j].id&&cartItems[i].current_topping.length===cartItems[j].current_topping.length){
            let flag = true;
            for(let x=0;x<cartItems[i].current_topping.length;x++){
              let toppingFlag = false;
              for(let y=0;y<cartItems[j].current_topping.length;y++){
                if(cartItems[i].current_topping[x].code===cartItems[j].current_topping[y].code){
                  toppingFlag = true
                }
              }
              if(toppingFlag===false){
                flag = false
              }
            }
            if(flag===true){
              cartItems[i].quantity = cartItems[i].quantity + cartItems[j].quantity;
              cartItems[i][cartItems[i].item.sku+"_"+cartItems[i].category].qty = cartItems[i][cartItems[i].item.sku+"_"+cartItems[i].category].qty + cartItems[j][cartItems[j].item.sku+"_"+cartItems[j].category].qty;
              cartItems.splice(j,1);

            }
          }
          if((cartItems[i].category==='promotion'||cartItems[i].category==='valueDeals')&&i!==j&&cartItems[i].id===cartItems[j].id){
            let item1 = cartItems[i][cartItems[i].item.sku+"_"+cartItems[i].category].additionalInfo;
            let item2 = cartItems[j][cartItems[j].item.sku+"_"+cartItems[j].category].additionalInfo;
            if(JSON.stringify(item1) == JSON.stringify(item2)){
              cartItems[i].quantity = cartItems[i].quantity + cartItems[j].quantity;
              cartItems[i][cartItems[i].item.sku+"_"+cartItems[i].category].qty = cartItems[i][cartItems[i].item.sku+"_"+cartItems[i].category].qty + cartItems[j][cartItems[j].item.sku+"_"+cartItems[j].category].qty;
              cartItems.splice(j,1);
            }
          }
        }
      }
      if(orderedItems.total > 500000){
        this.setState({
          aboveOrderPrice:true
        })
      }
      else if(orderedItems.total < 500000){
         this.setState({
          aboveOrderPrice:false
        })
      }

             let totalQuantity = 0;
    for (var i=0; i<selectedProducts.length; i++) {
        totalQuantity += selectedProducts[i].quantity;
    }
    const limitData = getLocalStorage("configData")
    const maxItem = _.get(limitData , "max_item.data.limit" , "");
    const msg = _.get(limitData , "max_item.msg.en" , "")
    if(totalQuantity > maxItem){
      this.setState({
        productModal:true,
        limitMsg: msg
      })
    }
    else if(totalQuantity < maxItem)
     this.setState({
        productModal:false,
        limitMsg: msg

      })


  }



    saveOrderTime(type, value){
      let order = getLocalStorage('order');
      if(type == "date" && typeof value !== "undefined"){
        order['orderDate'] = value;
        this.setState({laterDate: value});
      } else if(type == "time" && typeof value !== "undefined"){
        this.props.setSelectedTimeState(value);
        this.setState({laterTime: value});
        order['orderTime'] = value;
      }
      saveLocalStorage('order', order);
    }
    handleAlertBox(){
      this.props.resetAlertBox(false, "");
    }
    componentWillUpdate() {
      let order = getLocalStorage('order');
      if(order.advanceOrder === false) {
        let time = moment().format('HH:mm');
        saveLocalStorage('time',time);
      } else if(order.advanceOrder === true){
        let time = this.props.selectedTime;
        saveLocalStorage('time',time);
      }
    }

    confirmOrder(){
      saveLocalStorage('confirmOrderAtViewCart', true);
      this.saveOrderTime("time", this.props.selectedTime);
      let order = getLocalStorage('order');
      order.confirmOrder = true;
      saveLocalStorage('order', order);
      // let addressSelected = false;
      // let discountPrice = this.findDiscountPrice();
      let storeOpen = getLocalStorage('store_open');
      let storeClose = getLocalStorage('store_close');
      let userOrderTime = getLocalStorage('time');
      if((typeof storeOpen !== 'undefined') && (typeof storeClose !=='undefined') && (typeof storeOpen !== 'object') && (typeof storeClose !=='object')) {
          if((userOrderTime < storeOpen) || (userOrderTime > storeClose)){
            if(this.storeAlert(storeOpen,storeClose,userOrderTime)){
              return ' ';
            }
          }
      }
    }

    taxToggle = () =>{
      this.setState({
        tax:true
      })

    }

    storeAlert(storeOpen,storeClose,userOrderTime) {
      if((typeof storeOpen !== 'object') && (typeof storeClose !=='object') && (typeof this.props.selectedTime !== 'undefined')){
        storeOpen = getLocalStorage('store_open');
        storeClose = getLocalStorage('store_close');
        userOrderTime = getLocalStorage('time');
        if((userOrderTime < storeOpen) || (userOrderTime > storeClose)) {
        this.props.resetAlertBox(true, translate('Currently our operational hour is closed, please choose another order time. Then click Next'));
        return true;
        }
      }
    }

      changeLaterOrderOption(isShowLaterOrder){
        this.setState({selectLaterOrder: isShowLaterOrder});
        let time = "";
        let date = moment().format('DD-MM-YYYY');
        if(isShowLaterOrder){
          time = this.props.time[0];
        } else{
          time = moment().format('HH:mm');
        }
        this.saveOrderTime("time", time);
        this.saveOrderTime("date", date);
        this.setState({isShowLaterOrder: isShowLaterOrder, isDisabled: false});

        let advanceOrder = (isShowLaterOrder === true) ? true : false;
        let order = getLocalStorage('order');
        order.advanceOrder = advanceOrder;
        saveLocalStorage('order', order);
      }

      async placeOrder(formValue) {

        if (this.state.agree === true) {
          // set payment detail and order detail (address, store) in case of login user
          const loggedinUserInfo = getLocalStorage('receivedLoginDetail');
          if (typeof loggedinUserInfo !== 'undefined' && typeof loggedinUserInfo.customer_id !== 'undefined') {
            this.setState({showFavouriteConfirm: true, additionalInstruction: formValue.additional_instruction});

          } else{
            let lstorage = getLocalStorage('order_id');
            this.props.setPaymentOnline(lstorage);
          }
        } else {
          this.props.resetAlertBox(true, 'Please check agreed to continue order');
        }
      }


      async handleConfirmBox(status = null){
        this.setState({showFavouriteConfirm: false});
        //await this.props.setLoginUserPaymentMethod();
        //await this.props.setOrderDetail();
        this.setState({showFavouriteConfirm: false});
        let order = getLocalStorage('order');
        order.favouriteOrder = status;
        saveLocalStorage('order', order);
        this.props.placeOrder({ additional_instruction: this.state.additionalInstruction });
      }

    render() {
      // console.log("aboveOrderPrice",this.state.aboveOrderPrice)
      //  console.log('configuration', this.props.configuration);
       let timeStamp = getLocalStorage('timeStamp')

      let productName = {};
      let price = {}
      _.map(this.props.user.cart, (product, index) => {
        switch(product.category) {
          case 'pizza':
            productName[index] = product.product.name_en;
            break;
          case 'promotion':
            productName[index] = product.item.name_en;
            break;
            case 'side_Desert':
            productName[index] = product.item.name_en;
            break;
            case 'valueDeals':
            productName[index] = product.item.name_en;
            break;
            case 'beverage':
            productName[index] = product.item.name_en;
            break;
        }
      });
      _.map(this.props.user.cart, (product, index) => {
        switch(product.category) {
          case 'pizza':
            price[index] = product.price;
            break;
          case 'promotion':
            price[index] = product.price;
            break;
            case 'side_Desert':
            price[index] = product.price;
            break;
            case 'valueDeals':
            price[index] = product.price;
            break;
            case 'beverage':
            price[index] = product.price;
            break;
        }
      });
     let commaName = Object.values(productName).join(",");
     let commaPrice = Object.values(productName).join(",");

    let config = JSON.parse(localStorage.getItem("configData"))
     let orderedItems = {
        quantity : 0,
        amount: 0,
        tax : 0,
        delivery: 0,
        total: 0
      };
      let taxPrice = 0
      let allToppings = JSON.parse(localStorage.getItem("allToppings"))
      let selectedProducts = JSON.parse(localStorage.getItem("cartItems"))
       selectedProducts!==null && selectedProducts.map(item => {
          orderedItems.quantity = orderedItems.quantity + item.quantity
          orderedItems.amount = orderedItems.amount + (item.price*item.quantity)
                  if(item.item.id === "DELVYFEE"){
            taxPrice=item.price
          }
          orderedItems.tax = Math.round(orderedItems.amount*Tax.rate/100);
      })

       if(orderedItems.amount > 50000){
        this.props.setDelivery(true)
       }
       const cartItem = JSON.parse(localStorage.getItem("cartItems"));

      orderedItems.total = orderedItems.amount + orderedItems.tax + orderedItems.delivery
      const taxes = JSON.parse(localStorage.getItem("showTax"));
      
      return(
          <div style={{color: "black"}} className="col-12">
            {this.props.showLoader===true && <Loader loading={this.props.showLoader}/>}
            {this.state.productModal === true &&<QuantityModal message={this.state.limitMsg}/>}
            <ConfirmBox
              showConfirmBox={this.state.showFavouriteConfirm}
              boxMessage={this.context.t('Add this order to your favorite order?')}
              handleConfirmBox={this.handleConfirmBox}
            />
              <div className='row'>
              <header className='track hm-header text-center fixed-top'>
                  <div className="row d-flex align-items-center px-3 mx-0">
                    <div className='col-2 back-icon px-0 text-left'><img onClick={() => browserHistory.push(Url.MENU_PAGE)} src={backImage} className="mx-auto img-fluid"/></div>
                    <div className='col-auto hm-title'>My Cart</div>
                  </div>
              </header>
                  <div className='col-12 pt-4 view-cart-wrapper pb-3'>
                           {(selectedProducts===null || selectedProducts.length===0) ?  <EmptyCart /> : null}
                           {this.state.showFreeModal === true &&
                           <FreeModal data={config[0].freeproduct} getCouponProductDetail={this.props.getCouponProductDetail} couponProduct={this.props.couponProduct}/>}
                          <div>
                          <div className='row cart-product-list'>
                              {
                                  selectedProducts!==null && selectedProducts.map((product,ind) => {
                                      let src = ""
                                      let description = ""
                                      let size = ""
                                      let pizza = false
                                      let promo = false
                                      let valueDeals = false
                                      let category = product.category

                                      if(product.item.url_key&& (product.item.type==="simple" || product.item.type==="configurable")){

                                          src = product.item.thumbnail
                                          description = product.item.description_en
                                      }
                                      else if(product.item.type==="bundle"){

                                        if(product.category==="promotion")
                                            promo = true
                                        else if(product.category==="valueDeals"){
                                            valueDeals = true
                                        }
                                        description = []
                                        src = product.item.thumbnail
                                        product.product.map((desc,index) => {
                                            let descrip =(desc.item.size ? desc.item.size : "") + " " + desc.item.name_en + " " + (desc.item.crust ? desc.item.crust : "")
                                            description.push(descrip)
                                        })

                                      }
                                      else if(!product.item.url_key && !product.item.type && product.item.crust_image){
                                          src = product.product.thumbnail
                                          pizza = true
                                          let addedToppings = []
                                          //let default_topping = product.default_topping.split(",")
                                          product.current_topping.length > 0 && product.current_topping.map(current => {
                                            // let present = false
                                            // default_topping.map(def => {
                                            //   if(current.code===def){
                                            //     present = true
                                            //   }
                                            // })
                                            if(current.from==='extra' || current.from==='both'){
                                              addedToppings.push(current.name)
                                            }
                                          })
                                        description = addedToppings

                                      }
                                      else if(!product.item.url_key && !product.item.type && !product.item.crust_image && product.item.sauce !== null){

                                          src = product.item.thumbnail
                                          description = product.item.description_en
                                      }
                                      // if(typeof description === "string" && description.toLowerCase().includes("no ")){
                                      //   description = ""
                                      // }
                                      return(
                                          <div key={product.id+product.item.default_topping+ind} className='col-12'>
                                              <div className="row mx-0">
                                                  <div className="col-4 pl-0">
                                                      <div className="item-img">
                                                        <img src={src} alt="Offer Image" className="img-fluid"/>
                                                      </div>
                                                  </div>

                                                  <div className="col-8 text-left pb-3 item-details px-0">
                                                          <h2 className='item-title'>{product.item.name_en}</h2>

                                                          {typeof description==="object" ? description.map((ele,i) => {
                                                              return(
                                                                <p key={ele+"_"+i} className="text-black-50 mb-0 small-text">{ele}</p>
                                                              )
                                                          }) : <p className="text-black-50 mb-0 small-text">{description}</p>}
                                                          <div className="row mx-0 mt-3 d-flex align-items-center">
                                                            <div className='col-7 px-0 col-sm-4'>
                                                            {product.item.name_en === "DOMINO'S DELIVERY FEE" || product.item.name_en === "Selamat! Anda Mendapatkan Gratis Pizza Mania!" ? null :  <OrderCount
                                                                    addToCart={this.props.addToCart}
                                                                    removeCart={this.props.removeCart}
                                                                    deleteToCart={this.props.deleteToCart}
                                                                    item={product.item}
                                                                    product={product.product}
                                                                    pizza={pizza}
                                                                    promo={promo}
                                                                    valueDeals={valueDeals}
                                                                    category={category}
                                                                    index={ind}
                                                                    totalToppings={product.current_topping}
                                                                    config={this.props.config}
                                                                />}

                                                            </div>
                                                            <div className='item-price col-5 col-sm-8 px-0 text-right ml-auto'>
                                                                Rp. {CommaFormatted(Math.round(parseFloat(product.price*product.quantity)))}
                                                            </div>
                                                          </div>
                                                  </div>
                                              </div>
                                          </div>
                                      )
                                  })
                              }
                              {/* {this.state.tax === true && this.props.taxData != undefined && this.props.taxData != null &&
                                <React.Fragment>
                                <div className="col-4 pl-0">
                                <div className="item-img">
                                  <img src={this.props.taxData.baseimage} alt="Offer Image" className="img-fluid"/>
                                </div>
                            </div>
                            <div className="col-8 text-left pb-3 item-details px-0">
                                    <h2 className='item-title'>{this.props.taxData.name}</h2>
                                    <div className='item-price col-3 col-sm-8 px-0 ml-auto'>
                                   Rp. {CommaFormatted(Math.round(parseFloat(this.props.taxData.price)))}
                                      </div>
                              </div> </React.Fragment>}  */}

                              </div>
                              <div className='row mx-0'>
                                <div className='col-12 cart-total-amount mb-3'>
                                    <div className='row'>
                                        <div className='col-8 text-left px-0' style={{fontSize:'15px'}}>Sub Total</div>
                                        <div className='col-4 text-right theme-text px-0' style={{fontSize:'13px',fontWeight: '700'}}>Rp. {CommaFormatted(Math.round(parseFloat(orderedItems.amount)))}</div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-8 text-left px-0' style={{fontSize:'15px'}}>{this.context.t('Tax')}</div>
                                        <div className='col-4 text-right theme-text px-0' style={{fontSize:'13px',fontWeight: '700'}}>Rp. {CommaFormatted(Math.round(parseFloat(orderedItems.tax)))}</div>
                                    </div>
                                    { this.props.delivery===true &&  <div className='row'>
                                        <div className='col-8 text-left px-0' style={{fontSize:'15px'}}>{this.context.t('Delivery Fee')} </div>
                                        <div className='col-4 text-right theme-text px-0' style={{fontSize:'13px',fontWeight: '700'}}>Rp. {CommaFormatted(Math.round(parseFloat(orderedItems.delivery)))}</div>
                                    </div>}

                                    <div className='row grand-total py-2 mt-2'>
                                        <div className='col-6 text-left px-0' style={{fontSize:'17px',fontWeight: '700'}}>{this.context.t('Total')}</div>
                                        <div className='col-6 text-right theme-text px-0' style={{fontSize:'13px',fontWeight: '700'}}>Rp. {CommaFormatted(Math.round(parseFloat(orderedItems.total)))}</div>
                                    </div>

                                </div>
                              </div>
                            <div className='row item-details'>
                                <div className="serviceMethod col-12 my-2">
                                    <ServiceMethod
                                    setProps={this.props.setProps}
                                    { ...this.props}
                                    selectedProductsInCart={selectedProducts}
                                    // configuration={this.props.configuration}
                                    />
                                </div>
                                <div className="deliveryAddress col-12 my-2">
                                    <DeliveryAddress/>
                                </div>
                                <div className="col-12 my-2">
                                    <OrderOptions
                                        {...this.props}
                                        changeLaterOrderOption={this.changeLaterOrderOption}
                                        saveOrderTime={this.saveOrderTime}
                                        selectedLaterDate={this.state.laterDate}
                                        fetchUser={this.props.fetchUser}
                                    />
                                </div>
                                <div className='col-12 my-2'>
                                    <AdditionalInstruction
                                    {...this.props}
                                    detailForm={this.props.detailForm}
                                    additionalInstruction={this.state.additionalInstruction}
                                    handleInstruction={this.handleField}
                                    />
                                </div>
                                <div className='col-12 my-2'>
                                 <Button
                                    onClick={() => this.setState({
                                      showDetails:!this.state.showDetails
                                    })}
                                    className="btn py-0 d-flex align-items-center justify-content-between mb-2 w-100 px-0"
                                    style={{backgroundColor: "#fff",borderColor: "#fff"}}
                                  >
                                    <h2 style={{fontSize:"16px",fontWeight:"600"}}>Your Details</h2>
                                    <span className="mt-1" style={{marginBottom:"10px"}}>
                                    {this.state.showDetails === true ?   <img src = {Image} className="img-pizza" style={{height:"13px", transform: "rotate(180deg)"}}/> :   <img src = {Image} className="img-pizza" style={{height:"13px"}}/>}


                                    </span>
                                  </Button>

                                {this.state.showDetails === true &&  <Detail
                                    {...this.props}
                                    detailForm={this.props.detailForm}
                                    firstName={this.state.firstName}
                                    lastName={this.state.lastName}
                                    mobile={this.state.mobile}
                                    email={this.state.email}
                                    items={this.props.items}
                                    handleDetails={this.handleField}/>}

                                </div>
                                <div className='col-12 my-2'>
                                    <PaymentMethod
                                        paymentMethod={this.state.paymentMethod}
                                        handlePaymentMethod={(e) => this.handlePaymentMethod(e)}
                                        handleAgreement={(e) => this.handleAgreement(e)}
                                        getPaymentMethod={this.props.getPaymentMethod}
                                        paymentMethods={this.props.paymentMethods}
                                        aboveOrderPrice={this.state.aboveOrderPrice}
                                    />
                                </div>
                            </div>
                            </div>
                </div>
                <div className='col-12 my-2 mb-5'>
                   <Captha
                    quantity={orderedItems.quantity}
                    total={orderedItems.total}
                    agree={this.state.agree}
                    placeOrder={this.placeOrder}
                    additionalInstruction={this.state.additionalInstruction}
                    replaceOrder = {this.replaceOrder}
                    amount = {orderedItems.total}
                    loader ={this.props.loader}
                    loadingImage={this.props.loadingImage}
                    placing={this.props.placing}
                     handleAgreement={(e) => this.handleAgreement(e)}
                    />
                </div>

                <PlaceOrder
                    quantity={orderedItems.quantity}
                    total={orderedItems.total}
                    agree={this.state.agree}
                    placeOrder={this.placeOrder}
                    additionalInstruction={this.state.additionalInstruction}
                    replaceOrder = {this.replaceOrder}
                    amount = {orderedItems.amount}
                    loader ={this.props.loader}
                    loadingImage={this.props.loadingImage}
                    placing={this.props.placing}
                    fetchTimeStamp={this.props.fetchTimeStamp}
                    timeStamp={this.props.timeStamp}
                    taxToggle={this.taxToggle}
                    tax={this.state.tax}
                    addToCart={this.props.addToCart}
                    {...this.props}
                    sentOrderVeriOtp = {this.props.sentOrderVeriOtp}
                    orderPlaceStatus = {this.props.orderPlaceStatus}
                    geCustomerOrders={this.props.geCustomerOrders}
                    sentOrderPlacedStatus = {this.props.sentOrderPlacedStatus}
                />
            </div>
          </div>
        )
    }
  }


ViewCart.contextTypes = {
  t: PropTypes.func.isRequired
}
export default ViewCart;
