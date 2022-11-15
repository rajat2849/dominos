import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Col, Card } from "reactstrap";
import { reduxForm, Field } from "redux-form";
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import TextTruncate from 'react-text-truncate';

import Autocomplete from "react-autocomplete";
import RenderField from "../../CustomerDetail/components/RenderField";
import SubmitButtons from "components/SubmitButton";
import GoogleCustomMap from "components/GoogleCustomMap"; 
import Loader from "components/Loader";
import "../../CustomerDetail/components/customerDetail.scss";
import track from '../../../../public/newimages/track-white.png'
import "./Delivery.scss";
import Location from '../../../../public/newimages/location.png'
const _ = require("lodash");
import { getLocalStorage } from "components/Helpers";
import AddressList from './AddressList'

const validate = location => {
  const errors = {};
  if (!location.location) {
    errors.location = "Required*";
  }
  if (!location.location || location.length <= 0 || !location.location.trim()) {
    errors.location = "Please enter some Location";
  }
  return errors;
};

const style = {
  searchInput : {
    boxSizing: `border-box`,
    border: `1px solid transparent`, 
    height: `32px`,
    marginTop: `10%`,
    padding: `0 12px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    fontSize: `14px`,
    outline: `none`,
    textOverflow: `ellipses`, 
  }
}

class DeliveryDetail extends React.Component {
  constructor(props) {
    super(props);
    this.returnAutoComplete = this.returnAutoComplete.bind(this);
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.state = {
      "errorMsg": "",
      "searchType" : "addresses",
      showForm : false
    }
    // branch.logEvent(
    //   "Delivery",
    //   function(err) { console.log(err); }
    //  )
  }

  componentWillReceiveProps(props){
    if(typeof this.props.inputvalue !== "undefined" || this.props.inputvalue !== ""){
      this.setState({errorMsg: ""});
    }
  }

  handleInitialize = () => { 
    let initData = {
      substreet: '',
      type: '',
      tower : '',
      floor: '',
      kavnumber: '',
    }

    const addressComponent = getLocalStorage('choosenAddress'); 

    if(typeof addressComponent.address_components !== 'undefined') {

      let filterAddress = this.props.filterAddress(addressComponent);

      if(typeof filterAddress.route !== 'undefined') {
        initData.substreet = filterAddress.route.short_name;
      }

      if(typeof filterAddress.street_number !== 'undefined') {
        let street_number = filterAddress.street_number.short_name; 
        if(street_number.search('No') === -1) {
          if(street_number.search('Kav') !== -1) {
            initData.kavnumber = street_number;
          } else {
            street_number = 'St. No. ' + street_number;
          } 
        } else {
          street_number = '';
        }
        
        initData.substreet = initData.substreet + ' ' + street_number;
      }

      if(typeof filterAddress.street_address !== 'undefined') {
        initData.substreet = initData.substreet + ' ' + filterAddress.street_address.short_name;
      }
    
      if(typeof filterAddress.floor !== 'undefined') {
        initData.floor = filterAddress.floor.short_name;
      }

      if(typeof filterAddress.premise !== 'undefined') {
        initData.tower = filterAddress.premise.short_name;
      }

      if(typeof filterAddress.subpremise !== 'undefined') {
        initData.tower = initData.tower + ' ' + filterAddress.subpremise.short_name;
      }

      initData.substreet = initData.substreet.replace(initData.kavnumber, '');

      this.props.initialize(initData);
    }
  }

  handleSubmitClick(){
    if(typeof this.props.inputvalue === "undefined" || this.props.inputvalue === ""){
      this.setState({errorMsg: "Please type street/building (do not type jalan,jin..,orjl"});
    } else{
      this.setState({errorMsg: ""});
      this.refs.autocomplete.focus();
      this.props.fetchAddress(this.props.inputvalue);
    }
  }

  returnAutoComplete() {
    return (
      <Autocomplete
        ref="autocomplete"
        menuStyle={{ display: this.props.showMenu, minWidth: '100%' }}
        inputProps={{ placeholder: this.context.t("Type street/building (do not type jalan,jin...orjl)") }}
        items={this.props.surveyAddress}
        getItemValue={item => item.survey_address}
        renderItem={(item, highlighted) =>
          <div className='col px-2'
            key={item.id}
            style={{
              backgroundColor: "#222", width: "100%", color: "#fff", paddingBottom: '5px',
              paddingTop: '5px', maxHeight: '150px', overflowY: 'auto'
            }}
          >
          <TextTruncate
            line={1}
            truncateText="…"
            text={item.survey_address}
          />
          </div>
        }
        value={this.props.inputvalue}
        onChange={e => this.props.fetchAddress(e.target.value)}
        onSelect={value => this.props.selectAddress(value)}
      />
    );
  }

  handleSearchType(type) {
    this.setState({type})
  }

  componentDidMount(){
    const user = getLocalStorage('receivedLoginDetail');
    if(user.customer_id!==undefined){
      this.props.getCustomerDeliveryAddress(user.customer_id);
    } else {
      this.props.handleAddressList()
    }
  }

  render() {
    const { handleSubmit } = this.props;
    let searchType  = this.state.searchType;
    const address = getLocalStorage('choosenAddress')
    
    return (
      <div className='row mx-0'>
        {/* {this.props.surveyAddressFetching && <Loader loading={this.props.surveyAddressFetching}/>} */}
        {/* {this.props.showAddressList && this.props.customerAddress != undefined  ? 
          <AddressList  
            onSubmit={this.props.onSubmit} 
            customerAddress={this.props.customerAddress} 
            handleAddressList={this.props.handleAddressList}
            showLoader={this.props.showLoader}
            loaderShow={this.props.loaderShow}
            checkUserNearestStore={this.props.checkUserNearestStore}
            centerPoint={this.props.centerPoint}
          /> : */}
          <React.Fragment>
            {(this.props.isSelectValue) ?
            <div className='container'>
              {/*<h4 className='title col-xl-12 col-sm-12'><span>{this.context.t("Choose Address")}</span></h4>*/}
              <Form inline className='customer-detail-form mb-0' onSubmit={handleSubmit}>
                {/* <div className='col-sm-12 col-12 form-group text-left p-1 custom-autocomplete'>
                  {this.returnAutoComplete()}
                </div> */}
                <Link to='' className='ml-auto mt-2 position-relative'>
                  <FontIcon className='close-btn material-icons col pl-0' color={'#fff'} onClick={(e) => this.props.resetAlertBox(e)}>x</FontIcon>
                </Link>
                <div className='col-12 col-sm-12 col-xl-12 text-left'>
                  <div className='row'>
                    <p className='col-12 col-sm-12 col-xl-12 mb-0 description px-1 text-white'>
                      {this.context.t("Your selected address:")}
                    </p>
                    <h6 className='title col-12 col-sm-12 col-xl-12 px-1 mt-2 text-white font-weight-bold'>{address.formatted_address}
                    </h6>
                  </div>
                </div>
                <p className='col-12 col-sm-12 col-xl-12 mb-0 description text-left px-1 text-white'>
                {this.context.t("Fill for more detail (optional):")}</p>
                <div className='col-sm-12 col-12 col-xl-12 form-group text-left p-1'>
                  <Field
                    name='type'
                    className='form-control'
                    type='text'
                    component={RenderField}
                    label={this.context.t('Type Name of your Address')}
                  />
                </div>
                <div className='col-sm-12 col-12 col-xl-12 form-group text-left p-1'>
                  <Field
                    name='place'
                    className='form-control'
                    type='text'
                    component={RenderField}
                    label={this.context.t('Type Detail Address')}
                  />
                </div>
                {/* <div className='col-sm-12 col-12 col-xl-12 form-group text-left p-1'>
                  <Field
                    name='kavnumber'
                    className='form-control'
                    type='text'
                    component={RenderField}
                    label={this.context.t('Kav/number')}
                  />
                </div>
                <div className='col-sm-6 col-6 form-group text-left p-1'>
                  <Field
                    name='unit'
                    className='form-control'
                    type='text'
                    component={RenderField}
                    label={this.context.t('Unit')}
                  />
                </div>
                <div className='col-sm-6 col-6 form-group text-left p-1'>
                  <Field
                    name='floor'
                    className='form-control'
                    type='text'
                    component={RenderField}
                    label={this.context.t('Floor')}
                  />
                </div> */}
                <div className='col-12 m-auto form-group text-left py-3 px-1'>
                  <SubmitButtons
                    submitLabel={this.context.t('Next')}
                    className='next-btn'
                  />
                </div>
              </Form>
            </div>
            :
            <div className='container Mapcon mt-5 pt-2 px-0 col-xl-12 col-sm-12 MapconMap'>
              <div style={{position:'fixed',zIndex:'9999',width:"92%"}} className={this.props.showMap ? 'invisible' : 'visible col-xl-12 col-sm-12 text-left'}>
              <button 
                className="theme-btn btn align-items-center" 
                style={{padding:'10px 10px',fontSize:'14px',fontWeight:'400',width:'100%',background: '#5cb85c',display:'flex',justifyContent:'left !important'}} 
                onClick={() => this.props.toggle(true)}
            >
                <img src={track} style={{height:'21px',width: 'auto'}}/>
                <span style={{margin:'auto'}}>FIND MY LOCATION ON MAP</span>
              </button>
              <div className="text-center mt-4 or-option"><span className='or-span'>OR</span></div>
                <div className='form-group' id="type-selector" style={{'backgroundColor':'#fff', 'padding':'8px 0px'}}>
                  <span>{this.context.t('Search by')} {' : '}</span>
                  
                  <input type='radio' name='type' id="changetype-address" onClick={() => this.handleSearchType('addresses')} defaultChecked={searchType === 'addresses' ? 'checked' : ''}/>
                  <label htmlFor="changetype-address" style={{'padding': '10px', 'display' : 'inline', 'color': '#000', fontSize:'14px'}}>Street Name</label>
                  
                  <input type='radio' name='type' id="changetype-establishment" onClick={() => this.handleSearchType('establishments')} defaultChecked={searchType === 'establishments' ? 'checked' : ''}/>
                  <label htmlFor="changetype-establishment" style={{'padding': '10px', 'display' : 'inline', 'color': '#000' , 'fontSize':'14px'}}>Place Name</label>
                </div>
              </div>

              {(this.props.showDeliveryDialog === true && this.props.userAddress !== '' && !this.props.showMap) &&
                  //<AddressForm checkUserNearestStore={this.props.position} handleInitialize={this.handleInitialize} userAddressHeading={this.props.userAddressHeading}/>
                    <div className='location-box col p-3 box-bg' style={{top: '290px',fontSize:'13px',color:'black',position:'fixed',zIndex:'100'}}>
                      <div className='topDetails'>
                          {/* <Link to='' className='position-relative'>
                        
                          <FontIcon className='close-btn material-icons col pl-0' color={'#fff'} onClick={(e) => this.props.handleMapDialog(e)}>x</FontIcon></Link> */}
                        <h4 className='title col text-center text-capitalize mb-0 mt-0 py-0'>{this.props.userAddressHeading}</h4>
                        <p className='title text-capitalize' style={{fontSize : '16px' , marginTop : '0px' , marginBottom : '5px'}}>Delivery Address:</p>
                        <Card>
                        <img src={Location} style={{height : '33px', width : '29px', paddingTop : '0.5rem' , marginBottom : '-8px'}}/>
                        <p className='pTag mb-2 py-0'>{this.props.userAddress === undefined || this.props.userAddress === null ? "Address Not Found!" : this.props.userAddress}</p>
                        </Card>
                        <div className="bg-light py-3 addreButton d-flex align-items-center justify-content-center "> 
                          <Button
                            disabled={(this.props.userAddress !== undefined) ? false: true}
                            className='freeBts text-white font-weight-bold btn col-11 px-2 text-uppercase'
                            onClick={() => {
                              this.props.checkUserNearestStore(
                                this.props.centerPoint,
                                this.props.userAddress
                                );
                              this.handleInitialize();
                            }}
                            style={{background: "#5cb85c"}}
                          >
                            <Col className='px-1 btn-box'>
                              <span>{this.context.t('ORDER TO THIS ADDRESS')}</span>
                              <span><i className="material-icons"></i></span>
                            </Col>
                          </Button>
                        </div>
                      </div>
                    </div>
                }
            
              {/* 
                <div className='col-xl-12 col-sm-12'>
                  <Form inline className='customer-detail-form' onSubmit={handleSubmit}>
                    <div className='col-sm-12 col-12 form-group text-left p-1 custom-autocomplete'>
                      {this.returnAutoComplete()}
                    </div>
                    {(typeof this.state.errorMsg !== "undefined" && this.state.errorMsg !== "" && this.props.inputvalue === "") &&
                    <span className="error-danger">
                      <i className="fa fa-exclamation-circle">{this.state.errorMsg}</i>
                    </span>
                    }
                  </Form> 
                  <div className='col-sm-12 col-12 form-group text-left p-1 mb-0 text-center'>
                    <Button
                      className='order-btn btn btn-secondary'
                      onClick={this.handleSubmitClick}
                    >
                      <Col className='px-1 btn-box'>
                        <span>{this.context.t('Search')}</span>
                        <span>
                          <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                              <path d="M0-.25h24v24H0z" fill="none"/>
                          </svg>
                        </span>
                      </Col>
                    </Button>
                  </div>
                  <div className='divider-box col-12 col-sm-12 col-xl-12 my-2'>
                    <p className='divider-row'><span>{this.context.t("OR")}</span></p>
                  </div>
                </div>
              */}
              <div className='col-xl-12 col-sm-12 mb-0 px-0'>
              <div className='map-box-wrapper'>
              <div className='delivery-map col-12 col-sm-12 col-xl-12 px-0'>
                  {
                    (this.props.fetching &&
                      <Loader loading={true} />
                    )
                  }
                {/*<ViewMap
                    isMarkerShown
                    centerPoint={this.props.position}
                    saveStoreLocator={this.props.saveStoreLocator}
                    userAddress={this.props.userAddress}
                    activePage={"delivery"}
                    markers={this.props.markers}
                    userMarkerChanged={this.props.userMarkerChanged}
                    checkStoreAvaliability={this.props.checkStoreAvaliability}
                    handleInitialize={this.handleInitialize}
                  /> */}

                  <GoogleCustomMap
                    isMarkerShown
                    centerPoint={this.props.centerPoint}
                    saveStoreLocator={this.props.saveStoreLocator}
                    userAddress={this.props.userAddress}
                    activePage={"delivery"}
                    markers={this.props.markers}
                    userMarkerChanged={this.props.userMarkerChanged}
                    checkStoreAvaliability={this.props.checkStoreAvaliability}
                    handleInitialize={this.handleInitialize}
                    setUserAddressFromSelectedAddress={this.props.setUserAddressFromSelectedAddress}
                    showMap={this.props.showMap}
                    checkUserNearestStore={this.props.checkUserNearestStore}
                  />
                </div>
              </div>
              </div>
            </div>
          }
          </React.Fragment>
        {/* } */}
      </div>
    );
  }
}

DeliveryDetail.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isSelectValue: PropTypes.bool,
  selectedValue: PropTypes.string,
  fetchAddress: PropTypes.func,
  showDeliveryForm: PropTypes.bool,
  selectAddress: PropTypes.func,
  surveyAddress: PropTypes.array,
  viewMap: PropTypes.func
};

DeliveryDetail.contextTypes = {
  t: PropTypes.func.isRequired
}

export default reduxForm({
  form: "DeliveryDetail",
  validate,
})(DeliveryDetail);
