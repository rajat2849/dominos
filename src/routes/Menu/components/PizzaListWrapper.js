import React from 'react';
import {Button,Row} from 'reactstrap';
import Pizza from './Pizza';
import OrderCount from './OrderCount';
import Loader from "./Loader";
import Categories from '../../../components/Categories';

class PizzaListWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.handleCategory = this.handleCategory.bind(this);

		this.state = {
			activeCategory: 'Premium'
		}
	}

	componentDidMount(){
        this.props.fetchAllToppings("a,b");
        this.props.loadingImage(false);
        if(this.props.getPizzaList == undefined){
        	this.props.loadingImage(true)
        }
        else{
        	this.props.loadingImage(false)
        }
	}

	handleCategory(category) {
       this.setState({activeCategory: category});
	}

	render() {
		
		const {activeCategory} = this.state;
		return (
			<div className='row mx-0 pizza-wrapper categories-list'>
				<div className="col-12 pt-0 text-left pr-0">
					{/*<h1 className="categories-title font-weight-bold">Pizza</h1>*/}
				</div>
				<Categories
				    list={this.props.pizzaList}
					handleCategory={this.handleCategory}
					activeCategory={activeCategory}
				/>
				<div className='col-12 pizza-listing'>
						{(typeof this.props.pizzaList !== 'undefined') && this.props.pizzaList.map((item, itemIndex) => {
							return (item.category_name === activeCategory) && (
								<div id={item.category_name} key={itemIndex} className="col-12 px-0">
									<Row>
										{/* <div className="col-12 text-left pr-0">
											<h6 className="categories-title">{item.category_name}</h6>
										</div> */}
										<div className="col-12 item-listing" id={item.category_name}>
										<div className="row mx-0">
											{(typeof item.products !== 'undefined' && item.products.length > 0) && item.products.map((product) => {
												return <Pizza 
													product = {product}
													key = {product.id}
													addToCart={this.props.addToCart}
													removeCart={this.props.removeCart}
													deleteToCart={this.props.deleteToCart}
													toppings={this.props.toppings}
													getProductPrice={this.props.getProductPrice}
													fetchAllToppings={this.props.fetchAllToppings}
                  									getPizzaList={this.props.getPizzaList}
													checkItemLimit = {this.props.checkItemLimit}
												/>
											})}
										</div>
										</div>
									</Row>
								</div>
							)
						})}
				</div>
				 {/*<Loader loading={this.props.loader} />*/}
			</div>

		)
	}
}
export default PizzaListWrapper;