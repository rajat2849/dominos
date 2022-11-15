import React from "react";
import {
  Nav,
  NavItem,
  NavLink,
  Row
} from "reactstrap";
import classnames from "classnames";

import {calculateDistance} from '../../../lib/Util';
import deliveryNew from '../../../../public/newimages/ICON-FOR-KEVIN-DELIVERY-02.png';
import newcarryout from "../../../../public/newimages/ICON-FOR-KEVIN-TAKEAWAY-01-04.png";
import newLocationIcon from "../../../../public/newimages/Group.png";
import rightArrow from "../../../../public/newimages/rightarrow.png";
import takeawaylist from "../../../../public/newimages/takeawaylist.png";
import takeawaydot from "../../../../public/newimages/takeawaydot.png";
const Delivery = (props) => {
  
  return(
    <Row className="mx-0">
      <div className="col-12 px-0 custom-tabs">
        <Row className="mx-0">
          <div className="col-12 px-0">
            <Nav tabs>
              <NavItem className="col-6 px-0 text-center deliveryPopupBtn">
                <NavLink
                  className={classnames({
                    active: props.isActive === "delivery"
                  })}
                  onClick={() => {
                    props.handleGroupBtnToggle("delivery");
                  }}
                >
                  <span className="" style={{display:"inline-block"}}>
                    <img
                      className="btn-image img-fluid mr-2"
                      src={deliveryNew}
                      alt="icon"
                    />
                  </span>
                  <span className="text-center" style={{display:"inline-block",fontWeight:"700"}}>
                    <span className="d-inline-flex">Delivery</span>
                  </span>
                </NavLink>
              </NavItem>
              <NavItem className="col-6 px-0 text-center takeawayPopupBtn">
                <NavLink
                  className={classnames({
                    active: props.isActive === "carryout"
                  })}
                  onClick={() => {
                    props.handleGroupBtnToggle("carryout");
                  }}
                >
                  <span className="" style={{display:"inline-block"}}>
                    <img
                      className="btn-image-carryout img-fluid mr-3"
                      src={newcarryout}
                      alt="icon"
                    />
                  </span>
                  <span className="text-center" style={{display:"inline-block",fontWeight:"700"}}>
                    <span className="d-inline-flex">Takeaway</span>
                  </span>
                </NavLink>
              </NavItem>
            </Nav>
          </div>
        </Row>
      </div>
      <div className="row mx-0 mt-0 mb-5 pb-4" style={{width:"100%"}}>
        {(props.isActive === 'delivery') ?
          <div style={{width:"100%"}}>
            {(props.deliveryAddress !== undefined &&
              props.deliveryAddress.map((item, index) => {
                const location = {
                  lat: item.latitude,
                  lng: item.longitude
                };
                if (index > (props.deliveryAddress.length - 4)) {
               // if (index < 3) {
                  return (
                    <div className="col-12" key={index}>
                      {item.place !== "undefined" && item.place !== null &&(
                        <div
                          className={(item.entity_id == props.deliveryAddressEntityId.entity_id) ? "card p-2 activeBorder" : "card p-2"}
                          onClick={async () => {
                            await props.checkUserNearestStore(
                              location,
                              props.handleAddressList,
                              item
                            );
                          }}
                          style={{border:"0px solid"}} id={props.deliveryAddress.entity_id}
                        >
                          <div style={{position:"absolute",top:"20px"}}>
                              <img
                              className="btn-image img-fluid mr-2"
                              src={newLocationIcon}
                              alt="icon" style={{width:"16px",height:"20px"}}
                            />
                          </div>
                          <div style={{paddingLeft: "42px"}}>
                            <span style={{fontSize: "14px",fontWeight: "700"}}>
                              {
                                item.address_slug === undefined || 
                                (item.address_slug === null ? item.area : item.address_slug)
                              }
                            </span><br/>
                            <span className="pr-3" style={{fontSize: "12px",fontWeight: "500",position:"relative",top:"-3px"}}>
                              {
                                item.place === undefined || 
                                (item.place === null ? item.sub_street.substr(0,40) : item.place.substr(0,40))
                              }
                            </span>
                          </div>
                          <div style={{position:"absolute",top:"20px",right:"0px"}}>
                              <img
                              className="btn-image img-fluid mr-2"
                              src={rightArrow}
                              alt="icon" style={{width:"8px",height:"10px"}}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return null;
                }
              }
            )
            )}
            <div className="bg-light py-3 fixed-bottom addreButton d-flex align-items-center justify-content-center ">
              <button
                className="freeBts text-white font-weight-bold btn col-11  px-2  text-uppercase "
                onClick={() => props.handleAddAddress()}
                style={{backgroundColor:"#4CAF50"}}
              >
                Add New Address
              </button>
            </div>
          </div>
        : 
          <div style={{width:"100%"}}>
            {(
              props.storeList.map((item, index) => {
                const location = {
                  lat: item.store_location_lat,
                  lng: item.store_location_long
                };
               return (
                  <div className="col-12" key={index}>
                    {item.store_title_en !== "undefined" && item.store_title_en !== null && (
                      <div
                        className="card p-3"
                        onClick={async () => {
                          await props.checkUserNearestStore(
                            item,
                            props.checkUserNearestStore,
                            item
                          );
                        }}
                        style={{border: "0px solid"}}
                      >
                        <div style={{position:"absolute",top:"20px"}}>
                            <img
                            className="btn-image img-fluid mr-2"
                            src={takeawaylist}
                            alt="icon" style={{width:"24px",height:"24px"}}
                          />
                        </div>
                        <div style={{paddingLeft: "42px"}}>
                          <span style={{fontSize: "14px",fontWeight: "700"}}>
                            {
                              item.store_title_en === undefined || 
                              (item.store_title_en === null ? item.store_title_en : `${item.store_title_en}  - ${calculateDistance({
                                start: props.location,
                                destination: {
                                  lat: item.store_location_lat,
                                  lng: item.store_location_long
                                }
                              })} KM`)
                            }
                          </span><br/>
                          <span className="pr-3" style={{fontSize: "12px",fontWeight: "500",position:"relative",top:"-3px"}}>
                            {
                              item.store_address_en === undefined || 
                              (item.store_address_en === null ? item.store_address_en.substr(0,40) : item.store_address_en.substr(0,40))
                            }
                          </span>
                        </div>
                        <div style={{position:"absolute",top:"20px",right:"0px"}}>
                            <img
                            className="btn-image img-fluid mr-2"
                            src={rightArrow}
                            alt="icon" style={{width:"8px",height:"10px"}}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            ))}
            <div className="bg-light py-3 fixed-bottom addreButton d-flex align-items-center justify-content-center ">
              <button
                className="freeBts text-white font-weight-bold btn col-11  px-2  text-uppercase "
                 onClick={() => props.handleAddAddress()}
                style={{backgroundColor:"#1E88E5"}}
              >
                Find more stores
              </button>
            </div>
          </div>
        }
      </div>
    </Row>
  );
}

export default Delivery;