import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody,
CardTitle, CardSubtitle, Button, Col } from 'reactstrap';

import { Url ,NavIcon, MenuType, LanguageId } from 'config/Config';
import { filterPromotionList, filterValueDealsList, saveSessionStorage, getSessionStorage, getLocalStorage } from 'components/Helpers';
import { saveLocalStorage } from "components/Helpers";
class PacketHemat extends React.Component {
  constructor(props) {
    super(props);
    this.handleLinkClick = this.handleLinkClick.bind(this);
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
      saveSessionStorage('referalPage','menu')
    }
  }
  handleLinkClick(item) {
    saveLocalStorage('previousLocation', item);
  }
  render() {
    let valueDealsList = []
    let valueDealsListGet = getLocalStorage("valueDealsList");
    if (!_.isEmpty(valueDealsListGet)) {
      valueDealsList = filterValueDealsList(valueDealsListGet);
    }
    const langId = (typeof this.props.lang !== 'undefined' && typeof LanguageId[this.props.lang] !== 'undefined') ? LanguageId[this.props.lang] : 'en';
    return (
      <div className='row packet-hemat'> 
        <div className='col-12'>
          <div className="row mx-0 mb-2">
              <h5 className='col-auto categories-title mb-0'><strong>{this.props.categoryName}</strong></h5>
              <div className="col-auto ml-auto">
                <Link className="small-text" to={{ pathname: Url.MENU_PAGE, state: { name: "PacketHemat" } }} onClick= {() => this.handleLinkClick('PacketHemat')}>{this.context.t('See all')}</Link>
              </div>
          </div>
        </div>
        <div className='productImages col-12'>
          <div className="col-12 d-flex flex-nowrap px-1 overflow-x">
            {(typeof valueDealsList !== 'undefined') && valueDealsList.map((item, index) => {
              return (
                <Col xs='5' sm='4' className='item-box' key={index}>
                  <Link to= {{
                    pathname: `${Url.NEW_PAKET_HEMAT}/${item.url_key}`,
                    state : {
                      sku : item.sku,
                      page : Url.DASHBOARD
                    }
                  }}
                  >
                    <Card>
                      <CardImg src={valueDealsList[index].thumbnail} alt='Offer Image' className="img-fluid"/>
                    </Card>
                  </Link>
                </Col>
              );
            })}
          </div>
        </div>
      </div>
    )
  }
}

PacketHemat.propTypes = {
  promotionList: PropTypes.array,
  valueDealsList: PropTypes.array,
};
PacketHemat.contextTypes = {
  t: PropTypes.func.isRequired
}

export default PacketHemat;