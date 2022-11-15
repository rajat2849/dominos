import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Card, CardImg, Col } from 'reactstrap';
import {
  getLocalStorage
} from "components/Helpers";
import "./NewDashboard.scss";
import promoImage from "../../../../public/newimages/thumbnailpromo-2.png";
import {get} from 'lodash'

import { Url, MenuType, LanguageId } from 'config/Config';
import { sortBy, aggregatePizzaProducts } from '../../../components/Helpers';

const possiblePromoType = ['New Pizza', 'New', 'NEW'];

class BestSeller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuTab: 0,
      activeSubMenuTab: 0
    };
  }

  setActiveTabFromReferalPage() {
    let activeTab = getSessionStorage('selectedMenuTab');
    const referalPage = getSessionStorage('referalPage');
    if (typeof activeTab === 'undefined' || activeTab === null || activeTab.length === 0) {
      activeTab = {
        activeMenuTab: 0,
        activeSubMenuTab: 0
      };
    }
    if (referalPage === 'productDetail') {
      this.setState(activeTab)
      saveSessionStorage('referalPage', 'menu')
    }
  }

  render() {
     let bestSellerList = getLocalStorage("sellerList");
     let pizzaSellerList = getLocalStorage("pizzaListBestSeller")
    let sellerList = [];
    if (!_.isEmpty(bestSellerList)  ) {
      sellerList = bestSellerList;
    }
    if(pizzaSellerList.length > 0) {
      sellerList.sort(sortBy);
      // unshifting best pizza because pizza must be in the begining of listing
      pizzaSellerList.map(item => {
        sellerList.unshift(item);
      });
    }
    const langId = (typeof this.props.lang !== 'undefined' && typeof LanguageId[this.props.lang] !== 'undefined') ? LanguageId[this.props.lang] : 'en';
    return (
    <React.Fragment>
      {!_.isEmpty(sellerList) &&  <div className='row promotions'>
        <div className='promotionWapper col-12'>
          <div className="col-12 element px-0">
            <div className="row mx-0 mb-2">
              <h5 className='col-auto categories-title mb-0'><strong>What's New and Best Selling</strong></h5>
              <div className="col-auto ml-auto">
                {/* <Link className="small-text" to={Url.MENU_PAGE} onClick= {(e) => ('menu')}>{this.context.t('See all')}</Link> */}
              </div>
            </div>
          </div>
        </div>
        <div className='productImages col-12'>
          <div className='col-12 px-2'>
          <div className="row">
            {(sellerList !== 'undefined') && sellerList.map((item, index) => {
              const name = item.name_en;
              
              let promoType = item.promo_type !== null || item.promo_type !== undefined ? item.promo_type : 'Promo'
              return (
                <Col sm='4' xs='6' className='item-box' key={index}>
                  {possiblePromoType.includes(item.promo_type) || item.promo_type === null ?
                    <Link to= {{
                      pathname: `${Url.TOPPINGS}/${item.url_key}`,
                        state : {
                          product: aggregatePizzaProducts(this.props.pizzaList, item)
                        }
                      }}
                    >
                      <Card>
                        <div className="tag" >
                          <img
                          src={promoImage}
                          style={{height:'24px'}}
                          />
                          <p className="tagDesc" style={{fontSize:"7px",color:"white"}}>
                            <strong>{promoType}</strong>
                          </p>
                        </div>
                        <CardImg src={sellerList[index].thumbnail} alt='Offer Image' className="img-fluid" style={{maxHeight: "165px",borderRadius:"8px 8px 0px 0px"}}/>
                        <p className="mb-0 product-title card_p">
                          <strong className='montserrat'>{name}</strong>
                         </p>
                         
                      </Card>
                      
                    </Link>
                  : <Link to= {{
                      pathname:`${Url.NEW_PROMOTION_DETAIL}/${item.url_key}`,
                        state : {
                          sku : item.sku,
                          page : Url.DASHBOARD
                        }
                      }}
                    >
                      <Card>
                      <div className="tag" >
                          <img
                          src={promoImage}
                          style={{height:'24px'}}
                          />
                          <p className="tagDesc" style={{fontSize:"7px",color:"white"}}>
                            <strong>{promoType}</strong>
                          </p>
                        </div>

                        <CardImg src={sellerList[index].thumbnail} alt='Offer Image' className="img-fluid" style={{maxHeight: "165px",borderRadius:"8px 8px 0px 0px"}}/>
                        <p className="mb-0 product-title card_p">
                          <strong className='montserrat'>{name}</strong>
                        </p>
                      </Card>
                     
                    </Link>
                  }
                  
                </Col>
              );
            })}
          </div>
          </div>
        </div>
      </div>}

      </React.Fragment>

    )
  }
}

BestSeller.propTypes = {
  sellerList: PropTypes.array,
  valueDealsList: PropTypes.array,
};

BestSeller.contextTypes = {
  t: PropTypes.func.isRequired
}

export default BestSeller;
