import React from 'react';
import {Button} from 'reactstrap';
import OrderCount from './OrderCount';
import {Url} from 'config/Config';
import {Link} from 'react-router';
import PropTypes from 'prop-types';
import { CommaFormatted, filterValueDealsList } from '../../../components/Helpers'

class PaketHematWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		
		let defaultValueProduct = JSON.parse(localStorage.getItem("defaultValueProduct"));
		if(defaultValueProduct===null||defaultValueProduct===""){
			defaultValueProduct = []
			localStorage.setItem("defaultValueProduct",JSON.stringify(defaultValueProduct))
		}
	}

	render() {
		let valueDealsList = [];
		let selectedProducts = JSON.parse(localStorage.getItem("cartItems"))
		//let valueProduct = JSON.parse(localStorage.getItem("defaultValueProduct"))
		if (!_.isEmpty(this.props.valueDealsList)) {
			valueDealsList = filterValueDealsList(this.props.valueDealsList);
    }
		return (
			<div className='row promotion-wrapper pizza-listing mx-0 categories-list'>
			<div className='col-12 packet-hemat item-listing'>
				<div className="col-12 pt-0 text-left pr-0 px-0">
					{/* <h1 className="categories-title font-weight-bold">{this.props.categoryName}</h1> */}
				</div>
				<div>
					{(typeof valueDealsList !== 'undefined') && valueDealsList.map((item, index) => {
						let valueProduct = JSON.parse(localStorage.getItem(`defaultValueProduct${item.url_key}`))
						let show = false;
						var bgImg = '';
						
						return (
							<div className="row mx-0" key={index}>
                			<div className="col-4 item-img px-0" style={{background:"none"}}>
                			  <Link to= {{
								pathname: `${Url.NEW_PAKET_HEMAT}/${item.url_key}`,
								state : {
									sku : item.sku,
                    				page : Url.MENU_PAGE
								}
							}}
							>
								<img src={item.thumbnail} alt="Offer Image" className="img-fluid"/>
							  </Link>
									
								</div>
								<div className="col-8 item-details pr-0">
								<Link to= {{
									pathname: `${Url.NEW_PAKET_HEMAT}/${item.url_key}`,
									state : {
										sku : item.sku,
                    					page : Url.MENU_PAGE
									}
								}}
								>
								<h2 className='item-title'>{item.name_en}</h2>
								<p className="item-description">{item.description_en.substr(0,69)}...</p>
							  </Link>		
									<div className="row mx-0 d-flex align-items-center">
										{parseFloat(item.price) > 0 && <div className='item-price col-5 px-0'>Rp. {CommaFormatted(Math.round(parseFloat(item.price)))}</div>}
										<div className='col-7 col-sm-4 px-0 text-right ml-auto'>
											{selectedProducts.map((product) => {
												
												if(product.id===item.sku){
													
														show = true
												}
											})}
											{ show===true ?
												<OrderCount
													addToCart={this.props.addToCart}
													removeCart={this.props.removeCart}
													item={item}
													fromPaketHemat={true}
													product={valueProduct}
													category="valueDeals"
													getProductPrice={this.props.getProductPrice}
												/> :
													<Link to= {{
														pathname: `${Url.NEW_PAKET_HEMAT}/${item.url_key}`,
														state : {
															sku : item.sku,
                                            				page : Url.MENU_PAGE
														}
													}}
													>
														<Button className="theme-btn ml-auto">use promo</Button>
													</Link>
											}
									</div>
									</div>
								</div>
							</div>
						);
					})}
					</div>
			</div>			
			</div>
		)
	}
}
PaketHematWrapper.contextTypes = {
  t: PropTypes.func.isRequired
}
export default PaketHematWrapper;
