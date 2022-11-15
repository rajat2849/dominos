import React from 'react';
import YourOrder from './YourOrder';
import backImage from '../../../../public/newimages/backImage.png'
import { saveSessionStorage,getLocalStorage,saveLocalStorage } from '../../../../src/components/Helpers';
import PropTypes from 'prop-types';
import Loader from "../../../components/Loader";
import { closestIndexTo } from 'date-fns';
import NewHeader from "../../../../src/components/NewHeader";
import {Url} from 'config/Config';
import {Link, browserHistory} from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import{ _ ,get} from 'lodash';
import './Promotion.scss'
import NewCustomer from "./newCustomer"
import Customer from "./CustomerAlert"

class Promotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      defaultItems: [],
      changeProduct : false,
      itemId : "",
      sessionArr : [],
      choosenProduct:[],
      size : 'Medium',
      crust :"Classic Handtossed",
      directUrl:[],
      pizzaOptions:{},
      showAlert:false,
       modal: true,
      backdrop: false,
      newcustomerModal:false,
      message:""
    }
    // branch.logEvent(
    //   "Promotion",
    //   function(err) { console.log(err); }
    //  )
    this.handleChangeProduct = this.handleChangeProduct.bind(this)
    this.handleSelectProduct = this.handleSelectProduct.bind(this)
    this.toggle = this.toggle.bind(this);
  }

  async componentWillMount(){
    if (this.props.location.state !== undefined) {
      this.props.getCouponProductDetail(this.props.location.state.sku);
    } else {
      await this.props.getPromotionList();
      // const list = this.props.promotionList;
      // fetch the sku or product details based on url_ket coming in url
      const url = this.props.location.pathname;
      const splitUrls = url.split('/');
      const urlKey = splitUrls[2];

      // fetch all product list
      const product = this.props.promotionList.filter(item => {
        if (item.url_key === urlKey) {
          return item;
        }
      });
    //  const product = _.filter(this.props.promotionList, (item) => (item.url_key === urlKey));

      this.props.getCouponProductDetail(product[0].sku);
      
      this.setState({
        directUrl:product,
        // pizzaOptions:this.props.couponProduct.options[0]
      })
    }
   }

   toggle() {
    this.setState({
      modal: false
    });
    browserHistory.push(Url.DASHBOARD);
  }


  componentWillReceiveProps(nextProps){
    const defaultArr = []
    const sessionArr = {}
    let choosenItems = []
    let size = ""
    let crust = ""
    nextProps.couponProduct.options && nextProps.couponProduct.options.map((option,index) => {
      let item = []
      if(nextProps.location.state != undefined){
           nextProps.location.state.fromCart===true ?
      option.item.map(ele => {
        if(nextProps.location.state.product[index] && nextProps.location.state.product[index].item.parent_sku===ele.parent_sku){
          item.push(ele)
        }
      })
      :
      option.item.map(ele => {
        if(option.item[0].parent_sku===ele.parent_sku){
          item.push(ele)
        }
      })
      }

      // if(option.item[0].size && option.item[0].crust){
      //   size = option.item[0].size
      //   crust = option.item[0].crust
      // }
      //item.option_id = option.option_id
      if(nextProps.location.state != undefined){
      const items = {
        item : item,
        id : option.option_id,
        title: option.title
      }
      
      let tempItem = nextProps.location.state.fromCart===true && nextProps.location.state.product[index] ? nextProps.location.state.product[index].item : option.item[0]
      tempItem.option_id = nextProps.location.state.fromCart===true && nextProps.location.state.product[index] ? nextProps.location.state.product[index].id :option.option_id
      const chooseItem = {
        item : tempItem,
        id : nextProps.location.state.fromCart===true && nextProps.location.state.product[index] ? nextProps.location.state.product[index].id :option.option_id,
        title: nextProps.location.state.fromCart===true && nextProps.location.state.product[index] ? nextProps.location.state.product[index].title :option.title
      }
      let it = chooseItem.item
      it.option_id = chooseItem.id
      defaultArr.push(items)
      choosenItems.push(chooseItem)
      sessionArr[index] = it
      }
      else{
        option.item.map(ele => {
        if(option.item[0].parent_sku===ele.parent_sku){
          item.push(ele)
        }
      })
        if(nextProps.location.state === undefined){
      const items = {
        item : item,
        id : option.option_id,
        title: option.title
      }
      let tempItems =  option.item[0]
      tempItems.option_id = option.option_id
      const chooseItem = {
        item : tempItems,
        id :  option.option_id,
        title: option.title
      }
      let it = chooseItem.item
      it.option_id = chooseItem.id
      defaultArr.push(items)
      choosenItems.push(chooseItem)
      sessionArr[index] = it
      }
      }
    })

    var list = nextProps.couponProduct;
    list.url_key = nextProps.routeParams.slug;
   localStorage.setItem(`defaultPromoProduct${list.url_key}`,JSON.stringify(choosenItems))
    this.setState({
      defaultItems : defaultArr,
      list : list,
      sessionArr : sessionArr,
      choosenProduct : choosenItems,
      // size : size,
      // crust : crust
    })   
  }

  closeModalNewCust = () =>{
     this.setState({
                newcustomerModal:false
              })
  }

  handleChangeProduct(e,id){
    e.preventDefault();
    this.setState({
      changeProduct: true,
      itemId : id
    },() => {
      let id = "change"
      let element = document.getElementById(id);
      element !== null && element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      });
    })
    
  }
    
  

  handleSelectProduct(e,index,item){
    e.preventDefault();

    let items = this.state.defaultItems
    let choosenProduct = this.state.choosenProduct
    let arr = this.state.sessionArr
    let item1 = []
    this.state.list.options[index].item.map(option => {
      if((item.parent_sku && option.parent_sku && item.parent_sku === option.parent_sku) || item.sku === option.sku){
        item1.push(option)
      }
    })
    items[index].item = item1
    item.option_id = choosenProduct[index].id;
    choosenProduct[index].item = item
    arr[index] = item
    arr[index].option_id = this.state.list.options[index].option_id
    this.setState({
      defaultItems : items,
      changeProduct : false,
      sessionArr : arr,
      choosenProduct: choosenProduct
    })
  }

  handleChooseCrust(e,index){
    let choosenProduct = this.state.choosenProduct
    for(let i=0;i<this.state.defaultItems[index].item.length;i++){
      if(this.state.defaultItems[index].item[i].crust.replace(/ +/g, "")===e.target.value.replace(/ +/g, "") && this.state.defaultItems[index].item[i].size.includes(this.state.size)){
        let tempItem = this.state.defaultItems[index].item[i]
        tempItem.option_id = choosenProduct[index].id
        choosenProduct[index].item = tempItem
        this.setState({
          crust : e.target.value,
          choosenProduct : choosenProduct,
          size : this.state.defaultItems[index].item[i].size
        })
        break;
      }
    }
  }

  handleChooseSize(e,index){
    let choosenProduct = this.state.choosenProduct
    for(let i=0;i<this.state.defaultItems[index].item.length;i++){
      if(this.state.defaultItems[index].item[i].size.replace(/ +/g, "")===e.target.value.replace(/ +/g, "")){
        let tempItem = this.state.defaultItems[index].item[i]
        tempItem.option_id = choosenProduct[index].id
        choosenProduct[index].item = tempItem
        this.setState({
          size : e.target.value,
          crust : "Classic Handtossed",
          choosenProduct : choosenProduct
        })
        break;
      }
    }
  }

   componentDidMount(){
       let data = getLocalStorage("receivedLoginDetail");
   localStorage.setItem("couponIs",JSON.stringify(this.props.couponProduct.sku))
     if(data != null || data != undefined || data.length!= 0){
        this.props.geCustomerOrders(data.customer_id)
       }
       this.props.fetchConfig()
  }

  render() {
    let data = getLocalStorage("receivedLoginDetail");
      let couponDetail = JSON.parse(localStorage.getItem("couponDetail"))
    const fromCart = this.props.location.state && (this.props.location.state.fromCart||this.props.location.state.fromMenu) ? true : false
    let index = -1
    let defaultPrice = parseFloat(this.props.couponProduct.price)

    let defaultSides = this.state.choosenProduct.length > 0 && this.state.choosenProduct.map((option,index) => {
      
      const sizesArray = []
      const crustsArray = []
      let crusts = ""
      let sizes = ""

      if(option.item.size && option.item.crust){
        this.state.defaultItems[index].item.map(el => {
          sizesArray.push(el.size)
          if(el.size.replace(/ +/g, "")===option.item.size.replace(/ +/g, ""))
            crustsArray.push(el.crust)
        })
  
  
        let uniqueSizeArray = [...new Set(sizesArray)]
        let uniqueCrustArray = [...new Set(crustsArray)]

        crusts = uniqueCrustArray.map(el => {
          return <option value={el} key={el}>{el}</option>
        })
        sizes = uniqueSizeArray.map(el => {
          return <option value={el} key={el}>{el}</option>
        })
      }

      return <div key={option.item.option_id+"_"+index} className='col-12 px-0'>
      {/* {this.props.config.includes(couponDetail[0].couponCode) && <Customer message="This offer is only valid for Domino's Pizza App. Please download the Andorid or iOS App from app store to use this offer." closeModalNewCust={this.closeModalNewCust}/>} */}
              
      {this.props.config.includes(couponDetail[0].couponCode) && !this.props.config.includes("RCNTKTOK") && <Customer message="This offer is only valid for Domino's Pizza App. Please download the Andorid or iOS App from app store to use this offer." closeModalNewCust={this.closeModalNewCust}/>}
               <h1 className='text-left option-title'>{option.title}</h1>
              <div className="row item-listing mx-0">
                <div className="col-4 item-img px-0">
                  <img src={option.item.thumbnail} alt="Offer Image" className="img-fluid" />
                </div>
                <div className="col-8 item-details pr-0">
                    <h2 className='item-title'>{option.item.name_en}</h2>
                    <p className='item-description'>{option.item.description_en}</p>
                    {option.item.crust && option.item.size && 
                      <form className='row mx-0'>
                        <div className='col-12 col-sm-6 px-0 item-option'>
                            <label className='option-label'>Size</label>
                            <select className='form-control option-select' value={option.item.size} onChange={(e) => this.handleChooseSize(e,index)}>
                              {sizes}
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 px-0 item-option'>
                            <label className='option-label'>Crust</label>
                            <select className='form-control option-select' value={option.item.crust} onChange={(e) => this.handleChooseCrust(e,index)}>
                              {crusts}
                            </select>
                        </div>
                      </form>
                    }
                    <div className='col-12 px-0 text-right'> 
                      <Button onClick={(e) => this.handleChangeProduct(e,option.id)} className="theme-btn ml-auto">{this.context.t('Change Product')}</Button>
                    </div>
                </div>
              </div>
            </div>
    })

    this.state.list.options && this.state.list.options.map((option,i) => {
      if(this.state.itemId===option.option_id){
        index = i
      }
    })

    let uniqueChoose = []

    this.state.list.options && index !== -1 && this.state.list.options[index].item.map(item => {
      let unique = true
      uniqueChoose.length > 0 && uniqueChoose.map(ele => {
        if(item.parent_sku && ele.parent_sku && item.parent_sku===ele.parent_sku){
          unique = false
        }
      })
      if(unique===true){
        uniqueChoose.push(item)
      }
    })

    const chooseSides = uniqueChoose.length > 0 && uniqueChoose.map(item => {
      return <div key={item.sku} className='row mx-0 item-listing'>
                <div className="col-4 item-img px-0">
                  <img src={item.thumbnail} alt="Offer Image" className="img-fluid"/>
                </div>
                <div className="col-8 item-details pr-0">
                    <h2 className='item-title'>{item.name_en}</h2>
                    <p className='item-description'>{item.description_en}</p>
                    {/* {item.crust && item.size && 
                      <form className='row mx-0'>
                        <div className='col-12 px-0 item-option col-sm-6'>
                            <label className='option-label'>{this.context.t('Size')}</label>
                            <select className='form-control option-select'>
                              <option>{item.size}</option>
                            </select>
                        </div>
                        <div className='col-12 px-0 item-option col-sm-6'>
                            <label className='option-label'>{this.context.t('Crust')}</label>
                            <select className='form-control option-select'>
                              <option>{item.crust}</option>
                            </select>
                        </div>
                      </form>
                    } */}
                    <div className='col-12 px-0 text-right mt-2'>
                      <Button onClick={(e) => this.handleSelectProduct(e,index,item)} className="theme-btn ml-auto">{this.context.t('Select Product')}</Button>
                    </div>
                </div>
              </div>
    })

    const lang = getLocalStorage("siteLanguage")

    return (
      <div className='col-12 px-0'>
        
        { !this.state.changeProduct ? 
          <div>
            <header className='track hm-header text-center fixed-top'>
            <div className="row d-flex align-items-center px-3 mx-0">
              <Link to={Url.MENU_PAGE} className='col-2 back-icon px-0 text-left'><img src={backImage} className="mx-auto img-fluid"/></Link>
                <div className='col-auto hm-title'>Menu</div>
            </div>
        </header>
          <div className='col-12 item-details pt-3 selected'>
            <h2 className="item-title">{this.state.list.name_en}</h2>
            <div className='col-12 px-0 text-center selected-items'>
              {!this.props.applying && <img src={this.state.list.thumbnail} alt="promotion-Image" className="img-fluid image-size"/>}
            </div>
            <div className='col-12 item-details px-0 my-2'>
              <p className='item-description'>{lang==="en" ? this.state.list.description_en : this.state.list.description_idn}</p>
              <div className='row mx-0 default-items'>
                {defaultSides}
              </div>
              <div className='bottom-menu fixed-bottom col-12'>
                <div className='row d-flex align-items-center'> 
                  <YourOrder 
                    price = {defaultPrice}
                    item = {this.state.list}
                    page={this.props.location.state && this.props.location.state.page}
                    addToCart={this.props.addToCart}
                    defaultProduct={this.state.choosenProduct}
                    getProductPrice={this.props.getProductPrice}
                    edit={fromCart}
                    saveCart={this.props.saveCart}
                    productId={this.props.location.state && this.props.location.state.id}
                    productSku={this.state.list.sku+"_"+"promotion"}
                    index={this.props.location.state && this.props.location.state.index}
                    setAlert={this.setAlert}
                    helloWorld={this.helloWorld}
                    {...this.porps}
                  />
                  </div>
                </div>
              </div>
            </div>
            </div>
            : 
            <div id = "change">
              <header className='track hm-header text-center fixed-top'>
                  <div className="row d-flex align-items-center px-3 mx-0">
                    <div className='col-2 back-icon px-0 text-left'><img onClick={() => this.setState({changeProduct:false})} src={backImage} className="mx-auto img-fluid"/></div>
                      <div className='col-auto hm-title'>Menu</div>
                  </div>
              </header>
            <div className='col-12 pt-3'>
              <h4 className="f-16 text-black-50 py-2">{this.state.list.options[index].title}</h4>
              {chooseSides}
            </div>
            </div>
        }
        {this.props.applying && <Loader loading={this.props.applying} />}
      </div>
    )
  }
}
Promotion.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Promotion;