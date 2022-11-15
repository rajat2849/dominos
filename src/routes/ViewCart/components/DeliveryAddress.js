import React from "react";
import edit from "../../../../public/newimages/edit.png";
import markerIcon from "../../../../public/newimages/location.png";
import { Url } from "config/Config";
import { Link } from "react-router";
import PropTypes from "prop-types";
import {
  getLocalStorage,
  saveLocalStorage,
  trackAddsWithFacebookPixel
} from "../../../components/Helpers";

export const DeliveryAddress = props => {
  const deliveryAddress = getLocalStorage("deliveryAddress");
  const storeAddress = getLocalStorage("store");
  const orderType = getLocalStorage("order");
  const service_method = orderType !== undefined && orderType !== null && orderType.length!==0
      ? orderType.deliveryType
      : "Service Method";
  const address_d =
    deliveryAddress !== undefined &&
    deliveryAddress !== null &&
    deliveryAddress.address !== undefined
      ? deliveryAddress.address.address
      : deliveryAddress !== undefined && deliveryAddress !== null ? deliveryAddress.place : "Service Method";
  const address_s =
    storeAddress !== undefined && storeAddress !== null
      ? storeAddress.AddressLine1 !== undefined && storeAddress.AddressLine1 !== null ? storeAddress.AddressLine1 : storeAddress.store_address_en
      : "Store Address";
  const address = service_method === "Carryout" ? address_s : address_d;
  
  return (
    <div className="row">
      {service_method === "Carryout" ? (
        <h2 className="item-title col-12">Store Address</h2>
      ) : (
        <h2 className="item-title col-12">Delivery Address</h2>
      )}
      <div className="col-9 row mx-0">
        <div className="col-1 px-0">
          <img className="img-fluid mr-3" src={markerIcon} alt="icon" />
        </div>
        <div className="col-11 px-2">{address}</div>
      </div>
      <div className="col-3 text-right">
        {address !== "address" ? (
          <Link
            to={{
              pathname: Url.NEW_SERVICE_METHOD,
              state:{page : service_method.toLowerCase()}
            }}
          >
            <img className="btn-image" src={edit} alt="icon" />
          </Link>
        ) : (
          <img className="btn-image" src={edit} alt="icon" />
        )}
      </div>
    </div>
  );
};
DeliveryAddress.contextTypes = {
  t: PropTypes.func.isRequired
}

export default DeliveryAddress;
