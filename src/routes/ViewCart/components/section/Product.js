import React from 'react';
import PropTypes from 'prop-types';
import {
  Input,
  Row,
  Col,
  FormGroup,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';

import { Cart } from '../../../../config/Config';
import removeIcon from '../../../../../public/remove.png';
import './Product.scss';

export const ProductDescription = (props) => {
  if (props.item.length <= 0) {
    return null;
  }
  return (
    <Row>
      <ul className='viewCart-desc col-10 px-0 f-12 text-capitalize mb-0 text-left'>
        {props.item.map((itemString, index) => {
          return <li key={index}>{itemString}</li>
        })}
      </ul>
    </Row>
  )
}

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.updateQty = this.updateQty.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  updateQty(itemCartIndex, cartSku, qty, action) {
    if (action === 'increase') {
      qty += 1;
    } else if (action === 'decrease') {
      qty -= 1;
    }
    if (qty >= 1 && qty <= Cart.MAX_QTY_PER_ITEM) {
      this.props.updateCart(itemCartIndex, cartSku, {qty: qty});
    }
  }

  removeItem(itemCartIndex, cartSku) {
    this.props.deleteCart(itemCartIndex, cartSku);
  }

  getProductTitle(product, cartSku, title) {
    const productType = cartSku.split('_');
    let productTitle = title;
    if (typeof productType[1] !== 'undefined') {
      switch(productType[1]) {
        case 'pizza':
          productTitle = `${product.size} ${product.crust} ${product.title}`;
          break;
      }
    }
    return productTitle;
  }

  getProductItem(product, cartSku) {
    const productType = cartSku.split('_');
    let productItem = [];
    if (typeof productType[1] !== 'undefined') {
      switch(productType[1]) {
        case 'pizza':
          product.topping.map((topping) => {
            if (topping !== null && typeof topping.count !== 'undefined') {
              productItem.push(`(${topping.count}) ${topping.name}`);
            }
          });
          break;
        case 'promotion':
          Object.keys(product.additionalInfo).map((key) => {
            let childProduct = product.additionalInfo[key];
            /*
             *  size and crust will come undefined in case of newely added promotions
             *  if size and crust is not empty then push the full detail otherwise push name only.
             */
            if (typeof childProduct.size !== 'undefined' && typeof childProduct.crust !== 'undefined') {
              productItem.push(`${childProduct.size} ${childProduct.name_en} ${childProduct.crust}`);
            } else {
              productItem.push(`${childProduct.name_en}`);
            }
          });
          break;
        case 'valueDeals':
          Object.keys(product.additionalInfo).map((key) => {
            let childProduct = product.additionalInfo[key];
            if (typeof childProduct.size !== 'undefined' && typeof childProduct.crust !== 'undefined' ) {
              productItem.push(`${childProduct.size} ${childProduct.name_en} ${childProduct.crust}`);
            } else {
              productItem.push(`${childProduct.name_en}`);
            }
          });
          break;
      }
      return productItem;
    }
  }

  render() {
    const { itemCartIndex, title, price, qty, cartSku, product } = this.props;
    return (
      <div className='product-section'>
        <div className='my-2 col-12 col-sm-12 col-xl-12'>
          <Row className='my-2'>
            <Col className='productName col-9 col-sm-9 px-1'>
              {this.getProductTitle(product, cartSku, title)}
              <ProductDescription item={this.getProductItem(product, cartSku)} />
            </Col>
            <Col className='col-3 col-sm-3 px-0 text-capitalize'> 
              {price.toLocaleString('id')}
            </Col>
          </Row>
        </div>
        <div className='my-3 col-12 col-sm-12 col-xl-12 product-detail-box'>
          <Row>
            <Col className='quantity p-0 col-5 col-sm-3 col-xl-3'>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon onClick={() => this.updateQty(itemCartIndex, cartSku, qty, 'decrease')}>-</InputGroupAddon>
                  <Input defaultValue={qty} type="number" step="1" value={qty} />
                  <InputGroupAddon onClick={() => this.updateQty(itemCartIndex, cartSku, qty, 'increase')}>+</InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Col>
            <Col className='remove-product pr-0 f-12'>
              <div onClick={() => this.removeItem(itemCartIndex, this.props.cartSku)}><img src={removeIcon} alt='remove' />Remove</div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  itemCartIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  updateCart: PropTypes.func.isRequired,
  deleteCart: PropTypes.func.isRequired
};

export default Product;
