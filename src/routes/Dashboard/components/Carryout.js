import React from "react";
import { Link } from "react-router";
import PropTypes from "prop-types";
import { Url } from "config/Config";
import newcarryout from "../../../../public/newimages/newcarryout.png";


class Carryout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-12 pb-3 border">
        <div className="row bannerBtn pb-3 text-left">
            <div className="col-6 pl-2">
                <Link
                    onClick={this.props.confirmOrder}
                    className="carryBts font-weight-bold btn col-12 px-2 d-flex align-items-center text-uppercase"
                    to={{
                        pathname: Url.NEW_SERVICE_METHOD,
                        state: {
                        page: "carryout"
                        }
                    }}
                >
                    <div className="row mx-0 align-items-center col-12 px-0">
                        <div className="col-2 px-0">
                            <img
                                className="btn-image img-fluid mr-3"
                                src={newcarryout}
                                alt="icon"
                            />
                        </div>
                        <div className="col-10 px-0 text-center">
                            <span className="d-inline-flex">Takeaway</span>
                        </div>
                    </div>
                </Link>
            </div>        
        </div>
      </div>
    );
  }
}

Carryout.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Carryout;
