import React from 'react';
import { Button} from 'reactstrap';
import moment from 'moment';

import OrderCount from './OrderCount';
import {Url} from 'config/Config';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import { CommaFormatted } from '../../../components/Helpers';
import {browserHistory} from 'react-router';
import PromotionModal from './PromotionModal';
class PromoItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOn: false,
            backdrop:false
          };
    }
    ComponentDidMount(){
        this.props.getPromotionList();
    }
    handleModalClick = (state,msg) => {
        this.setState({
            isModalOn: state,
            msg: msg
        });
    };

    renderPromoItem = (props) => {
        if(!_.isEmpty(props.configuration) && props.activeBtn === 'delivery' && props.configuration.carryout.sku.includes(props.item.sku)) {
            var msg = 'Coupon only valid For Take Away';
            return (<img src={this.props.item.thumbnail} onClick={() => this.handleModalClick(true,msg)} alt="Offer Image" className="img-fluid"/>);
        } else if (!_.isEmpty(props.configuration) && props.configuration.dinner.sku.includes(props.item.sku)) {
            const currentHour = moment().format('H');
            const {start, end} = props.configuration.dinner.timings;
            if (currentHour >= start && currentHour <= end) {
                // var msg = 'Coupon only valid From '+start+' - '+end+' PM';
                var msg = 'Coupon only valid From 8 - 11 PM';
                return (
                    <Link to= {{
                        pathname:`${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`,
                        state : {
                            sku : this.props.item.sku,
                            page : Url.MENU_PAGE,
                            url_key: this.props.item.url_key
                        }
                    }}
                        //getProductPrice={this.props.getProductPrice}
                    >
                    <img src={this.props.item.thumbnail} alt="Offer Image" className="img-fluid"/>
                    </Link>
                );
            }
        } else {
            return (
                <Link to= {{
                    pathname:`${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`,
                    state : {
                        sku : this.props.item.sku,
                        page : Url.MENU_PAGE,
                        url_key: this.props.item.url_key
                    }
                }}
                    //getProductPrice={this.props.getProductPrice}
                >
                <img src={this.props.item.thumbnail} alt="Offer Image" className="img-fluid"/>
                </Link>
            );
        }

    }
    renderPromoItemDetails = (props,selectedProducts,show) => {
        if(!_.isEmpty(props.configuration) && props.activeBtn === 'delivery' && props.configuration.carryout.sku.includes(props.item.sku)) {
            var msg = 'Coupon only valid For Take Away';
            return(
                
                <div className="abccccc" onClick={() => this.handleModalClick(true,msg)}>
                    <h2 className='item-title'>{this.props.item.name_en}</h2>
                    <p className="item-description">{this.props.item.description_en.substr(0,65)}...</p>
                
                    <div className="row mx-0 d-flex align-items-center">
                        {parseFloat(this.props.item.price) > 0 && <div className='item-price col-5 px-0'>Rp. {CommaFormatted(Math.round(parseFloat(this.props.item.price)))}</div>}
                        <div className='col-7 col-sm-4 px-0 text-right ml-auto'>
                            {selectedProducts.map((product) => {
                                
                                if(product.id===this.props.item.sku){
                                    show = true
                                }
                            })}
                            { show===true ?
                                <OrderCount
                                    addToCart={this.props.addToCart}
                                    removeCart={this.props.removeCart}
                                    item={this.props.item}
                                    fromPromotion={true}
                                    product={this.props.promoProduct}
                                    category="promotion"
                                    config={this.props.config}
                                    checkItemLimit = {this.props.checkItemLimit}
                                /> :
                                // <Link to= {{
                                //         pathname: `${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`,
                                //         state : {
                                //             sku : this.props.item.sku,
                                //             page : Url.MENU_PAGE,
                                //             id : this.props.item.id,
                                //             url_key: this.props.item.url_key
                                //         }
                                //     }}
                                // >
                                    <Button className="theme-btn ml-auto" onClick={() => this.handleModalClick(true,msg)}>USE PROMO</Button>
                                // </Link>
                            }
                        </div>
                    </div>
                </div>
            );
        } else if (!_.isEmpty(props.configuration) && props.configuration.dinner.sku.includes(props.item.sku)) {
            const currentHour = moment().format('H');
            const {start, end} = props.configuration.dinner.timings;
            if (currentHour >= start && currentHour <= end) {
                // var msg = 'Coupon only valid From '+start+' - '+end+' PM';
                var msg = 'Coupon only valid From 8 - 11 PM';
                return( 
                    <div className="cde" >
                        <Link to= {{
                            pathname: `${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`,
                            state : {
                                sku : this.props.item.sku,
                                page : Url.MENU_PAGE,
                                url_key: this.props.item.url_key
                            }
                        }}
                            //getProductPrice={this.props.getProductPrice}
                        >
                            <h2 className='item-title'>{this.props.item.name_en}</h2>
                            <p className="item-description">{this.props.item.description_en.substr(0,65)}...</p>
                        </Link>
                        <div className="row mx-0 d-flex align-items-center">
                            {parseFloat(this.props.item.price) > 0 && <div className='item-price col-5 px-0'>Rp. {CommaFormatted(Math.round(parseFloat(this.props.item.price)))}</div>}
                            <div className='col-7 col-sm-4 px-0 text-right ml-auto'>
                                {selectedProducts.map((product) => {
                                    
                                    if(product.id===this.props.item.sku){
                                        show = true
                                    }
                                })}
                                { show===true ?
                                    <OrderCount
                                        addToCart={this.props.addToCart}
                                        removeCart={this.props.removeCart}
                                        item={this.props.item}
                                        fromPromotion={true}
                                        product={this.props.promoProduct}
                                        category="promotion"
                                        config={this.props.config}
                                        checkItemLimit = {this.props.checkItemLimit}
                                    /> :
                                    <Link to= {{
                                            pathname: `${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`,
                                            state : {
                                                sku : this.props.item.sku,
                                                page : Url.MENU_PAGE,
                                                id : this.props.item.id,
                                                url_key: this.props.item.url_key
                                            }
                                        }}
                                    >
                                        <Button className="theme-btn ml-auto">USE PROMO</Button>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                );
            }
        } else {
            return( 
                <div>
                    <Link to= {{
                        pathname: `${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`,
                        state : {
                            sku : this.props.item.sku,
                            page : Url.MENU_PAGE,
                            url_key: this.props.item.url_key
                        }
                    }}
                        //getProductPrice={this.props.getProductPrice}
                    >
                        <h2 className='item-title'>{this.props.item.name_en}</h2>
                        <p className="item-description">{this.props.item.description_en.substr(0,65)}...</p>
                    </Link>
                    <div className="row mx-0 d-flex align-items-center">
                        {parseFloat(this.props.item.price) > 0 && <div className='item-price col-5 px-0'>Rp. {CommaFormatted(Math.round(parseFloat(this.props.item.price)))}</div>}
                        <div className='col-7 col-sm-4 px-0 text-right ml-auto'>
                            {selectedProducts.map((product) => {
                                
                                if(product.id===this.props.item.sku){
                                    show = true
                                }
                            })}
                            { show===true ?
                                <OrderCount
                                    addToCart={this.props.addToCart}
                                    removeCart={this.props.removeCart}
                                    item={this.props.item}
                                    fromPromotion={true}
                                    product={this.props.promoProduct}
                                    category="promotion"
                                    config={this.props.config}
                                    checkItemLimit = {this.props.checkItemLimit}
                                /> :
                                <Link to= {{
                                        pathname: `${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`,
                                        state : {
                                            sku : this.props.item.sku,
                                            page : Url.MENU_PAGE,
                                            id : this.props.item.id,
                                            url_key: this.props.item.url_key
                                        }
                                    }}
                                >
                                    <Button className="theme-btn ml-auto">USE PROMO</Button>
                                </Link>
                            }
                        </div>
                    </div>
                </div> 
            );
        }
    }
    render(){
        const { isModalOn } = this.state;
        let selectedProducts = JSON.parse(localStorage.getItem("cartItems"))
        let show = false
        return(
            <div className="row mx-0"> 
            {this.props.showItem === true && 
                <div className="row mx-0">     
                <div className="col-4 item-img px-0">
                    {/* {this.renderPromoItem(this.props)} */}
                    <Link to= {{
                            pathname:`${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`,
                            state : {
                                sku : this.props.item.sku,
                                page : Url.MENU_PAGE,
                                url_key: this.props.item.url_key
                            }
                        }}
                            //getProductPrice={this.props.getProductPrice}
                        >
                        <img src={this.props.item.thumbnail} alt="Offer Image" className="img-fluid"/>
                    </Link>

                </div>
                <div>
                {this.state.isModalOn === true &&
                    <PromotionModal 
                        isModalOn = {isModalOn}
                        handleModalClick={this.handleModalClick}
                        message = {this.state.msg}
                    />
                }
                </div>
                <div className="col-8 item-details pr-0">
                {/* {this.renderPromoItemDetails(this.props,selectedProducts,show)} */}
                    <Link to= {{
                            pathname: `${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`,
                            state : {
                                sku : this.props.item.sku,
                                page : Url.MENU_PAGE,
                                url_key: this.props.item.url_key
                            }
                        }}
                            //getProductPrice={this.props.getProductPrice}
                        >
                        <h2 className='item-title'>{this.props.item.name_en}</h2>
                        <p className="item-description">{this.props.item.description_en.substr(0,65)}...</p>
                    </Link>
                    <div className="row mx-0 d-flex align-items-center">
                        {parseFloat(this.props.item.price) > 0 && <div className='item-price col-5 px-0'>Rp. {CommaFormatted(Math.round(parseFloat(this.props.item.price)))}</div>}
                        <div className='col-7 col-sm-4 px-0 text-right ml-auto'>
                            {selectedProducts.map((product) => {
                                
                                if(product.id===this.props.item.sku){
                                    show = true
                                }
                            })}
                            { show===true ?
                                <OrderCount
                                    addToCart={this.props.addToCart}
                                    removeCart={this.props.removeCart}
                                    item={this.props.item}
                                    fromPromotion={true}
                                    product={this.props.promoProduct}
                                    category="promotion"
                                    config={this.props.config}
                                    checkItemLimit = {this.props.checkItemLimit}
                                /> :
                                <Link to= {{
                                        pathname: `${Url.NEW_PROMOTION_DETAIL}/${this.props.item.url_key}`,
                                        state : {
                                            sku : this.props.item.sku,
                                            page : Url.MENU_PAGE,
                                            id : this.props.item.id,
                                            url_key: this.props.item.url_key
                                        }
                                    }}
                                >
                                    <Button className="theme-btn ml-auto">USE PROMO</Button>
                                </Link>
                            }
                        </div>
                    </div>
                </div>
                </div>
            }
            </div>
        )
    }
}
PromoItem.contextTypes = {
  t: PropTypes.func.isRequired
}

export default PromoItem