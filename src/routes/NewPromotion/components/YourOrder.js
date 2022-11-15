import React from 'react'
import {Link , browserHistory} from 'react-router';
import {Url} from 'config/Config';
import { Button} from 'reactstrap';
import PropTypes from 'prop-types';
import { CommaFormatted } from '../../../components/Helpers'
import QunatityModal from "../../Menu/components/QunatityModal"
import {  checkItemLimit } from '../../../components/Helpers';

class YourOrder extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          product:'',
          maxItemReached : ""
        }
        this.cartList = this.cartList.bind(this);
    }

    cartList(selectedProducts) {
      this.props.addToCart("promotion",this.props.item,selectedProducts,this.props.defaultProduct,this.props.edit)
      this.props.saveCart("",this.props.productId,this.props.productSku)
    }

    SaveToOrder = (selectedProducts) => {
      const msg = checkItemLimit();
      if(msg=== "") {
        this.props.addToCart("promotion",this.props.item,selectedProducts,this.props.defaultProduct,this.props.edit,"",this.props.index)
        browserHistory.push(this.props.edit ? Url.VIEW_CART : Url.MENU_PAGE)
      } else {
        this.setState({maxItemReached : msg})
      }
    }

    render(){
        const selectedProducts = JSON.parse(localStorage.getItem("cartItems"))
        return(
            <div className='col-12'>
              {this.state.maxItemReached && (
                <QunatityModal message ={this.state.maxItemReached} successHandler = {() =>  this.setState({
                  maxItemReached : ""
                })}/>
              )}
                <div className="row your-order py-2 d-flex align-items-center mx-0">
                    <div className="col-6 px-0 col-sm-4">
                      {parseFloat(this.props.price) > 0 && <h6 className='item-price mb-0'>Rp. {CommaFormatted(Math.round(parseFloat(this.props.price)))}</h6>}
                    </div>
                    <div className="col-6 d-flex justify-content-end p-0 m-0">
                    <button 
                      onClick={() => this.SaveToOrder(selectedProducts) } 
                      color=' ' 
                      className='theme-btn text-size d-flex justify-content-between align-items-center'
                    >
                      SAVE TO ORDER
                      <span className='mt-1'>
                        <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                          <path d="M0-.25h24v24H0z" fill="none"/>
                        </svg>
                      </span>
                    </button>
                        {/* <Link 
                            className='theme-btn btn btn-box py-0 pr-0'   
                            to = {{
                                pathname :this.props.edit ? Url.VIEW_CART : Url.MENU_PAGE,
                                state : {
                                    fromPage: 'promoDetail'
                                }
                            }}
                            onClick={() => this.SaveToOrder(selectedProducts) }
                        >
                            SAVE TO ORDER PROMO
                            <span className='mt-1'>
                                <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                                    <path d="M0-.25h24v24H0z" fill="none"/>
                                </svg>
                            </span>
                        </Link>      */}
                    </div>
                </div>
		    </div>
        )
    }
}
YourOrder.contextTypes = {
  t: PropTypes.func.isRequired
}
export default YourOrder