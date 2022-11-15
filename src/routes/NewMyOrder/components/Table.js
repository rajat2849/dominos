import React from "react";
// import Proptypes from 'prop-types';
import { Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import { CommaFormatted } from "../../../components/Helpers";

export const Table = props => {
  return (
    <Col className="px-0 product-detail-row">
      {props.items.map((product, number) => {
        const size = product.name.split(" ")[0];
        const crust = product.name.split(" ")[1] + product.name.split(" ")[2];

        return (
          <Row className="px-2 items-listing" key={number}>
            <Col className="py-2 col-12 px-0">
              <Row>
                <Col className="col-12 text-uppercase text-left f-16 mb-3 font-weight-700">
                  {parseInt(product.qty)} X {product.name}
                </Col>

                {parseInt(product.total) > 0 && (
                  <Col className="col-6 item-price text-left">
                    Rp. {CommaFormatted(Math.round(parseFloat(product.total)))}
                  </Col>
                )}
                <Col className="col-6 text-right">
                  <button
                    disabled
                    className="btn text-uppercase theme-btn ml-auto"
                    onClick={() =>
                      props.AddToOrder(props.customer_id, props.entity_id)
                    }
                  >
                    Add to order
                  </button>
                </Col>
              </Row>
            </Col>
          </Row>
        );
      })}
    </Col>
  );
};

Table.propTypes = {};
Table.contextTypes = {
  t: PropTypes.func.isRequired
};
export default Table;
