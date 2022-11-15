import React from 'react';
import { Button, Row} from 'reactstrap';
import OrderCount from './OrderCount';
import PropTypes from 'prop-types';
import { CommaFormatted } from '../../../components/Helpers'
import {Link} from 'react-router';
import {Url} from 'config/Config';
import Categories from '../../../components/Categories';
class SidesListWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.handleCategory = this.handleCategory.bind(this);

		this.state={
			size : "",
			chicken:"",
			sauce :"",
			sku : "",
			activeCategory: 'Bread'
		}
	}
	componentWillMount() {
		this.props.getSidesDessertsList();
		const id = this.props.sideName
		setTimeout(function(){
			const element = document.getElementById(id)
			element !== null && element.scrollIntoView({
			  behavior: "smooth",
			  block: "start",
			  inline: "start"
			});
		}, 100);
		const activeTab = this.props.activeTab.charAt(0).toUpperCase() + this.props.activeTab.slice(1);
		 this.setState({activeCategory: activeTab});
	}
	componentDidMount(){
		//  this.props.getSidesDessertsList();
		const id = this.props.sideName
		setTimeout(function(){
			const element = document.getElementById(id)
			element !== null && element.scrollIntoView({
			  behavior: "smooth",
			  block: "start",
			  inline: "start"
			});
		}, 100);
		const activeTab = this.props.activeTab.charAt(0).toUpperCase() + this.props.activeTab.slice(1);
		 this.setState({activeCategory: activeTab});
	}

	componentWillReceiveProps(nextProps){
		const id = nextProps.sideName
		const element = document.getElementById(id)
	//	element!==null && element.scrollIntoView({behavior: "smooth", block: "start", inline: "start"})
	}

	handleSize(e,sku){
		this.setState({
			size:e.target.value,
			sku : sku
		})
	}
	handleSauce(e,sku){
		this.setState({
			sauce:e.target.value,
			sku : sku
		})
	}
	handleChicken(e,sku){
		this.setState({
			chicken:e.target.value,
			sku : sku
		})
	}

	addToOrder = (choosenProduct,selectedProducts) => {
		const { checkItemLimit } = this.props;
		const status = checkItemLimit();
		if(status) {
			this.props.addToCart("side_Desert",choosenProduct,selectedProducts)		}
		}

	handleCategory(category) {

		this.setState({activeCategory: category});
	}

	render() {
		let selectedProducts = JSON.parse(localStorage.getItem("cartItems"))
		const {activeCategory} = this.state;
		return(
				<div className='row sides-wrapper mx-0 categories-list'>
					<div className="col-12 pt-0 text-left pr-0">
						{/*<h1 className="categories-title font-weight-bold">Sides</h1>*/}
					</div>
					<Categories
				        list={this.props.sidesDessertList}
					    handleCategory={this.handleCategory}
					    activeCategory={activeCategory}
				    />
					<div className="col-12 sides-listing">
						
						{(typeof this.props.sidesDessertList !== 'undefined') && this.props.sidesDessertList.map((item, itemIndex) => {
							
							return (item.category_name === activeCategory) && (
									<div id={item.category_name === "Chicken" ? "Tasty Chicken" : (item.category_name === "Desserts" ? "Yummy Desserts" : "")} key={itemIndex} className="col-12 px-0">
										<Row>
											<div className="col-12 text-left pr-0">
												{/* <h6 className="categories-title">{item.category_name}</h6> */}
											</div>
											<div className="col-12 item-listing" id={item.category_name}>
												<div className='row'>
												{(typeof item.products !== 'undefined' && item.products.length > 0) && item.products.map((product,productductIndex) => {
													let show = false
													let description = !product.description_en.toLowerCase().includes("no available") ? product.description_en.substr(0,43) : ""
													let choosenProduct={}
													let size = this.state.size === '' ? 'Medium' : this.state.sku==product.sku ? this.state.size : 'Medium'
													let chicken = product.sku==="BRB" ? null : (this.state.chicken=="" ? "Cripsy Chicken Strip" : this.state.chicken)
													let sauce = product.sku==="BRB" ? "Black Pepper" : (this.state.sauce==""? "BBQ" : this.state.sauce)
													if(product.options !== undefined){
														product.options[size].map(option => {
															if(option.sauce===sauce && option.chicken===chicken){
																choosenProduct=option
															}
														})
													}else{
														choosenProduct=product
													}
													
													return (
														<div className="col-6" key={productductIndex}>
														<div style={{boxShadow: "0px 2px 2px #00000026",borderRadius: "5px"}}>
															<Link to={`${Url.SIDES_DESSERTS}/${product.url_key}`} className="col-12 item-img px-0">
																	<img src={product.thumbnail} alt="Offer Image" className="img-fluid"/>
															</Link>
															<div className={item.category_name==="Rice" ? "item-details item-details-rice" : "item-details"} style={{width: "100%",padding:"0px 10px",borderBottom: "0px solid #e5e5e5"}}>
																<Link to={`${Url.SIDES_DESSERTS}/${product.url_key}`}>
																	<h2 className='item-title' style={{fontSize: "12px",lineHeight:"14px",minHeight: "27px"}}>{product.name_en}</h2>
																	<p className="item-description" style={{display:"none"}}>{description}</p>
																</Link>
																{item.category_name==="Rice" && <form className='row mx-0'>
																	<div className='col-12 px-0 item-option'>
																		<label className='option-label'>{this.context.t('Size')}</label>
																		<select className='form-control option-select' value={size} onChange={(e) => this.handleSize(e,product.sku)}>
																			<option>Medium</option>
																			<option>Personal</option>
																		</select>
																	</div>
																	{product.sku==="CR" && <div className='col-12 px-0 item-option'>
																		<label className='option-label'>Chicken</label>
																		<select className='form-control option-select' value={chicken} onChange={(e) => this.handleChicken(e,product.sku)}>
																			<option>Cripsy Chicken Strip</option>
																		</select>
																	</div>}
																	<div className='col-12 px-0 item-option'>
																		
																		{product.sku==="CR" && <div className='col-12 px-0 item-option'>
																			<label className='option-label'>Sauce</label>
																			<select className='form-control option-select' value={sauce} onChange={(e) => this.handleSauce(e,product.sku)}>
																				<option>BBQ</option>
																				<option>Original</option>
																				<option>Sambal</option>
																			</select>
																		</div>}
																		{product.sku==="BRB" && <select className='form-control option-select' value={sauce} onChange={(e) => this.handleSauce(e,product.sku)}>
																			<option>Black Pepper</option>
																		</select>}
																	</div>
																</form>}
																<div className={item.category_name==="Rice" ? "row mx-0 d-flex align-items-center align-items-center-rice" : "row mx-0 d-flex align-items-center"} style={{width: "100%",paddingBottom: "14px"}}> 
																	<div className='item-price px-0' style={{width: "100%",marginBottom: "10px"}}>Rp. {CommaFormatted(Math.round(parseFloat(choosenProduct.price)))}</div>
																	<div className='px-0 text-right ml-auto' style={{width: "100%"}}>
																		{selectedProducts.map((selected_product) => {
																			if(selected_product.id===choosenProduct.sku){
																				show = true
																			}
																		})}
															
																		{ show===true ?
																			<OrderCount
																				addToCart={this.props.addToCart}
																				removeCart={this.props.removeCart}
																				deleteToCart={this.props.deleteToCart}
																				getProductPrice={this.props.getProductPrice}
																				fromSides={true}
																				item={choosenProduct}
																				category="side_Desert"
																			/> :
																			<Button className="theme-btn ml-auto" style={{width: "100%"}} onClick={() =>this.addToOrder(choosenProduct,selectedProducts) }>ADD</Button>
																		}
																		</div>
																	</div>
																</div>
														</div>
														</div>
													);
												})} 
										</div>
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
SidesListWrapper.contextTypes = {
  t: PropTypes.func.isRequired
}
export default SidesListWrapper;