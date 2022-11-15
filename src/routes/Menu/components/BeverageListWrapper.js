import React from 'react';
import { CardImg, CardText, 
	CardBody,Button, Row} from 'reactstrap';
import OrderCount from './OrderCount';
import { ToggleRadioButtonUnchecked } from 'material-ui/svg-icons';
import PropTypes from 'prop-types';
import { CommaFormatted } from '../../../components/Helpers'
import {Link} from 'react-router';
import {Url} from 'config/Config';

class BeverageListWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		this.props.getBeverageList();
	}

	addToOrder = (product,selectedProducts) => {
		const { checkItemLimit } = this.props;
		const status = checkItemLimit();
		if(status) {
			this.props.addToCart("beverage",product,selectedProducts)		}
		}
	
	render() {
		let selectedProducts = JSON.parse(localStorage.getItem("cartItems"))
		return (
			<div className='row beverage-wrapper mx-0 categories-list'>
				{/* <div className="col-12 pt-0 pr-0">
					<h1 className="categories-title font-weight-bold">Beverages</h1>
				</div> */}
				<div className="col-12 beverage-listing">
						{(typeof this.props.beverageList !== 'undefined') && this.props.beverageList.map((item, itemIndex) => {
							return (
								<div id={item.category_name} key={itemIndex} className="col-12 px-0">
									<Row>
										<div className="col-12 text-left pr-0">
										</div>
										<div className="col-12 item-listing" id={item.category_name} key={itemIndex}>
											{(typeof item.products !== 'undefined' && item.products.length > 0) && item.products.map((product,productductIndex) => {
											let show = false
											let description = !product.description_en.toLowerCase().includes("no available") ? product.description_en.substr(0,43) : ""
											return (
												<div className="row mx-0" key={productductIndex}>
													<Link to={`${Url.DRINKS}/${product.url_key}`} className="col-4 item-img px-0">
															<img src={product.thumbnail} alt="Offer Image" className="img-fluid"/>
													</Link>
													<div className="col-8 item-details pr-0">
														<Link to={`${Url.DRINKS}/${product.url_key}`}>
															<h2 className='item-title'>{product.name_en}</h2>
															<p className="item-description">{description}</p>
														</Link>
														<div className="row mx-0 d-flex align-items-center"> 
															<div className='item-price col-4 px-0'>Rp.{CommaFormatted(Math.round(parseFloat(product.price)))}</div>
															<div className='col-8 col-sm-4 px-0 text-right ml-auto'>
																{selectedProducts.map((selected_product) => {
																	if(selected_product.id===product.sku){
																		show = true
																	}
																})}
													
																{ show===true ?
																	<OrderCount
																		addToCart={this.props.addToCart}
																		removeCart={this.props.removeCart}
																		deleteToCart={this.props.deleteToCart}
																		item={product}
																		category="beverage"
																	/> :
																	<Button className="theme-btn ml-auto" onClick={() =>this.addToOrder(product,selectedProducts)}>ADD TO ORDER</Button>
																}
																</div>
															</div>
														</div>
													</div>
						            );
											})}
										</div>
									</Row>
								</div>
							)
						})}
					</div>
				</div>
		)
	}
}
BeverageListWrapper.contextTypes = {
  t: PropTypes.func.isRequired
}

export default BeverageListWrapper;