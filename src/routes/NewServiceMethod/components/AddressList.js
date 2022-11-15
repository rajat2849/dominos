import React from "react";
import Loader from "../../../components/Loader";
import "./Delivery.scss";

export default class AddressList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let addressArr = this.props.customerAddress;
    // for(let i=0;i<addressArr.length;i++){
    //     for(let j=i+1;j<addressArr.length;j++){
    //         if(addressArr[i].area===addressArr[j].area||addressArr[j].area==="undefined"){
    //             addressArr.splice(j,1)
    //         }
    //     }
    // }
    return (
      <div className="row mx-0 mt-5 mb-5 pb-4">
        {this.props.showLoader === false && (
          <Loader loading={!this.props.showLoader} />
        )}
        {addressArr !== undefined &&
          addressArr.map(item => {
            const location = {
              lat: item.latitude,
              lng: item.longitude
            };
            return (
              <div className="col-12" key={item.entity_id}>
                {item.place !== "undefined" && item.place !== null && (
                  <div
                    className="card p-3 mb-2"
                    onClick={async () => {
                      await this.props.checkUserNearestStore(
                        location,
                        this.props.onSubmit,
                        item
                      );
                    }}
                  >
                    {item.place === undefined ||
                      (item.place === null ? item.street : item.place)}
                  </div>
                )}
              </div>
            );
          })}
        <div className="bg-light py-3 fixed-bottom addreButton d-flex align-items-center justify-content-center ">
          <button
            className="freeBts text-white font-weight-bold btn col-11  px-2  text-uppercase "
            onClick={() => this.props.handleAddressList(addressArr.entity_id)}
          >
            Add New Address
          </button>
        </div>
      </div>
    );
  }
}
