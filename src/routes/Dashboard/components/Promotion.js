import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Card, CardImg, Col } from 'reactstrap';
import {
  getLocalStorage
} from "components/Helpers";
import { Url, MenuType, LanguageId } from 'config/Config';
import PromotionModal from './PromotionModal';
import moment from 'moment';
class Promotion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenuTab: 0,
      activeSubMenuTab: 0,
      isModalOn: false
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

  handleModalClick = (state,msg) => {
      this.setState({
          isModalOn: state,
          msg: msg
      });
  };

  renderPromoItem = (showItem,props,promotionList,item,index) => {
    if(!_.isEmpty(props.configuration) && props.isActive === 'delivery' && props.configuration.carryout.sku.includes(promotionList[index].sku)) {
      var msg = 'Coupon only valid For Take Away';
      return(
        showItem===true && <Col sm='12' xs='12' className='item-box' key={index}>
          <span>
            <Card  onClick={() => this.handleModalClick(true,msg)} style={{marginRight:"5px"}}>
              <CardImg src={promotionList[index].thumbnail} alt='Offer Image' className="img-fluid"/>
            </Card>
          </span>
        </Col>
      )
    }else if (!_.isEmpty(props.configuration) && props.configuration.dinner.sku.includes(promotionList[index].sku)) {
      const currentHour = moment().format('H');
      const {start, end} = props.configuration.dinner.timings;
      if (currentHour >= start && currentHour <= end) {
        // var msg = 'Coupon only valid From '+start+' - '+end+' PM';
        var msg = 'Coupon only valid From 8 - 11 PM';
        return (
          showItem===true && <Col sm='12' xs='12' className='item-box' key={index}>
            <Link to= {{
              pathname:`${Url.NEW_PROMOTION_DETAIL}/${item.url_key}`,
              state : {
                sku : item.sku,
                page : Url.DASHBOARD
              }
            }}
            >
              <Card style={{marginRight:"5px"}}>
                  <CardImg src={promotionList[index].thumbnail} alt='Offer Image' className="img-fluid"/>
              </Card>
            </Link>
          </Col>
        );
      }
    }else{
      return(
        showItem===true && <Col sm='12' xs='12' className='item-box' key={index}>
          <Link to= {{
            pathname:`${Url.NEW_PROMOTION_DETAIL}/${item.url_key}`,
            state : {
              sku : item.sku,
              page : Url.DASHBOARD
            }
          }}
          >
            <Card style={{marginRight:"5px"}}>
              <CardImg src={promotionList[index].thumbnail} alt='Offer Image' className="img-fluid"/>
            </Card>
          </Link>
        </Col>
      )
    }
  }

  render() {
    var promotionList = []
    let promotionListGet = getLocalStorage("promotionList");
    const categoryName = _.get(promotionListGet, "categoryName" , "")
    if (!_.isEmpty(promotionListGet)) {
      promotionList = promotionListGet.data;
    }
    const { isModalOn } = this.state;
    const langId = (typeof this.props.lang !== 'undefined' && typeof LanguageId[this.props.lang] !== 'undefined') ? LanguageId[this.props.lang] : 'en';
    return (
      <div className='row promotions'> 
        <div className='promotionWapper col-12'>
          <div className="col-12 element px-0">
            <div className="row mx-0 mb-2">
              <h5 className='col-auto categories-title mb-0'><strong>{categoryName}</strong></h5>
              <div className="col-auto ml-auto">
                <Link className="small-text" to={Url.MENU_PAGE} onClick= {(e) => ('menu')}>{this.context.t('See all')}</Link>
              </div>
            </div>
          </div>
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
        <div className='productImagesNew col-12'>
          <div className="col-12 d-flex flex-nowrap px-0 overflow-x">
            {promotionList.length>0 && promotionList.map((item, index) => {
              const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
              let today = new Date();
              let currentDate = today.getDate();
              let currentMonth = today.getMonth()+1;
              let currentYear = today.getFullYear();
              let currentHour = today.getHours();
              let currentMinutes = today.getMinutes();
              let currentSeconds = today.getSeconds();
              let showItem = false;
              const checkDay = week[today.getDay()]
              if(item.hidden==="0" && item.period_day.includes(checkDay)){
                showItem = true
              }
              if(item.sku !== 'BOGO' && item.sku !== 'DINNER1' && item.sku !== 'FLASH51'){
              return (
                // <span>
                //   {this.renderPromoItem(showItem,this.props,promotionList,item,index)}
                // </span>
                showItem===true && <Col sm='4' xs='5' className='item-box' key={index}>
                  <Link to= {{
                          pathname:`${Url.NEW_PROMOTION_DETAIL}/${item.url_key}`,
                          state : {
                              sku : item.sku,
                              page : Url.DASHBOARD
                          }
                      }}
                  >
                    <Card>
                      <CardImg src={promotionList[index].thumbnail} alt='Offer Image' className="img-fluid"/>
                    </Card>
                  </Link>
                  
                </Col> 
              );
                    }
            })}
          </div>
        </div>
      </div>
    )
  }
}

Promotion.propTypes = {
  promotionList: PropTypes.array,
  valueDealsList: PropTypes.array,
};

Promotion.contextTypes = {
  t: PropTypes.func.isRequired
}

export default Promotion;