import React from "react";
import { browserHistory } from "react-router";

import { Url } from "config/Config";
import {getLocalStorage} from '../../../components/Helpers';
import Vectordwn from "../../../../public/newimages/Vectordwn.png";
import menudelivery from "../../../../public/newimages/ICON-FOR-KEVIN-DELIVERY-01.png";
import menutakeaway from "../../../../public/newimages/ICON-FOR-KEVIN-TAKEAWAY-02-02.png";
import favorite from "../../../../public/newimages/favorite.png";
import { calculateDistance } from "../../../lib/Util";

class AddressHeader extends React.Component {
    constructor(props) {
        super(props);
        this.setDeliveryAddress = this.setDeliveryAddress.bind(this);
        this.setActiveBtn = this.setActiveBtn.bind(this);

        this.state = {
            deliveryAddress: {},
            takeawayAddress: {},
            activeBtn: {}
        };
    }

    // componentWillMount() {
    //     const selecAaddress = getLocalStorage('choosenAddress')
    //      const deliveryAddress = getLocalStorage('delivery_address');
    //      const takeawayAddress = getLocalStorage('takeawayDetail');
    //      const activeBtn = getLocalStorage('active_Btn');
    //     this.setDeliveryAddress(deliveryAddress);
    //      this.setTakeawayAddress(takeawayAddress);
    //      this.setActiveBtn(activeBtn);
    // }

    // setDeliveryAddress(address) {
    //     this.setState({deliveryAddress: !_.isEmpty(this.props.deliveryAddress) ?  this.props.deliveryAddress : address});
    // }
    // setTakeawayAddress(address) {
    //     this.setState({takeawayAddress: !_.isEmpty(this.props.takeawayAddress) ? this.props.takeawayAddress : address});
    // }
    // setActiveBtn(btn) {
    //     this.setState({activeBtn: btn});
    // }
    componentWillMount() {
        const selecAaddress = getLocalStorage('choosenAddress')
         const deliveryAddress = getLocalStorage('delivery_address');
         const takeawayAddress = getLocalStorage('takeawayDetail');
         const activeBtn = getLocalStorage('active_Btn');
         this.setDeliveryAddress(deliveryAddress);
         this.setTakeawayAddress(takeawayAddress);
         this.setActiveBtn(activeBtn);
    }

    setDeliveryAddress(address) {
        this.setState({deliveryAddress: address});
    }
    setTakeawayAddress(address) {
        this.setState({takeawayAddress: address});
    }
    setActiveBtn(btn) {
        this.setState({activeBtn: btn});
    }

    render() {
       

        if(!_.isEmpty(this.props.activeBtn)){
            
            var {deliveryAddress} = this.props;
            var {takeawayAddress} = this.props;
            var {activeBtn} = this.props;
        }else{
            
            var {deliveryAddress} = this.state;
            var {takeawayAddress} = this.state;
            var {activeBtn} = this.state;
        }
        // const {deliveryAddress, takeawayAddress, activeBtn} = this.state;
        // const {activeTab} = this.props;
        // const {deliveryAddress} = this.props;
        // const {takeawayAddress} = this.props;
        // const {activeBtn} = this.props;
        const {activeTab} = this.props;

        return(
            <div className="col-12 logo">
                <header className="track hm-header text-center fixed-top" style={{backgroundColor:"#fff",color:"#000",padding: "10px 0px"}}>
                    <div className="row d-flex align-items-center px-3 mx-0 menu_header">
                        <div className={`back-icon px-0 text-left ${(activeBtn === 'delivery' ? 'menu_delivery_img' : 'menu_takeaway_img')}`}>
                            <img
                            onClick={() => this.props.handleAddress(activeBtn)}
                            src={(activeBtn === 'delivery' ? menudelivery : menutakeaway)}
                            className="mx-auto img-fluid"
                            />
                        </div>
                        <div className="col-auto hm-title menu_address" onClick={() => this.props.handleAddress(activeBtn)}>
                            <div className="menu_address_div">
                                <span className="menu_address_status">{(activeBtn === 'delivery')?'Delivery':`Takeaway ${calculateDistance({
                                    start: this.props.location,
                                    destination: {
                                    lat: takeawayAddress.store_location_lat || 0,
                                    lng: takeawayAddress.store_location_long || 0
                                    }
                                })} KM`}</span>
                                <img
                                // onClick={() => browserHistory.push(Url.DASHBOARD)}
                                src={Vectordwn}
                                className="mx-auto img-fluid"
                                />
                            </div>
                            <div className="menu_address_details">
                               <span>{
                               ((activeBtn === 'delivery')?
                               ((deliveryAddress.address_slug) && (deliveryAddress.address_slug.split(',')[0])) || 'No address selected!'
                               :
                               ((takeawayAddress.StoreName === '' || takeawayAddress.StoreName == undefined) ?
                                 ((takeawayAddress.store_title_en) && (takeawayAddress.store_title_en.substring(0,50))) || 'No store selected!'
                                 :
                                  ((takeawayAddress.StoreName) && (takeawayAddress.StoreName.substring(0,50))) || 'No store selected!'
                               )
                               )
                               }</span>
                            </div>
                        </div>
                        {/* <div className="menu_favorite">
                        <img
                            src={favorite}
                            className="mx-auto img-fluid"
                            />
                        </div> */}
                    </div>
                </header>
            </div>
        );
    }
}

export default AddressHeader;
