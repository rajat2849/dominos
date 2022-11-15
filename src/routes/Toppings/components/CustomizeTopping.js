import React from 'react';
import Pizza from '../../Menu/components/Pizza';
import { Modal, ModalBody, ModalFooter,ModalHeader} from 'reactstrap';
import {Link , browserHistory} from 'react-router';
import {Url} from 'config/Config';
import backImage from '../../../../public/newimages/backImage.png'
import './CustomizeTopping.scss';
import removeToppingIcon from '../../../../public/newimages/remove-topping.png';
import addToppingIcon from '../../../../public/newimages/add-topping.png';
import { CommaFormatted , checkItemLimit } from '../../../components/Helpers'
import PropTypes from 'prop-types';
import Loader from "../../../components/Loader";
import QunatityModal from "../../Menu/components/QunatityModal"
import {get} from "lodash"

const CurrentToppings = (props) => {
	let showCurrentToppings = props.defaultToppings.map((topping) => {
		let added = false
		let ind = -1
		props.toppingsFromCurrent.map((item,i) => {
			if(item.code===topping.code){
				added = true
				ind = i
			}
		})
		return(
			<div
				className="col-3 px-1 mb-2"
				key={topping.code}
				onClick={added===false ? () => props.pushTopping(topping,'current') : () => props.pullTopping(ind,'current')}
			>
				<div className={ added === true ?  'topping-img added-topping p-2' : 'topping-img p-2' }>
					{added===true && <span className='topping-remove-icon'><img src={removeToppingIcon} alt='' className='img-fluid'/></span>}
					<img src={topping.image} alt="Topping Image" className="img-fluid" />
				</div>
				<p className="small-text topping-name text-center pt-1">{topping.name}</p>
			</div>
		)
	})

	return(
		<div>
			<h1 className='text-left page-title'>Current Toppings</h1>
			<div className="row mx-0 topping-wrapper">
				{showCurrentToppings}
			</div>
		</div>
	)
}

const AddToppings = (props) => {
	let rate = 0;
	if(props.pizzaSize.includes('Medium')){
		rate = 6.364
	} else if(props.pizzaSize.includes('Large')) {
		rate = 8.182
	}
	let showAddToppings = props.allToppings
	let showExtraToppings = showAddToppings.map((topping) => {
		let added = false
		let i = -1
		props.toppingsFromExtras.map((item,index) => {
			if(item.code===topping.opt_code){
				added = true
				i = index
			}
		})
		return(
			<div
				className="col-3 px-1 mb-2"
				key={topping.opt_code}
				onClick={added===false ? (() => props.pushTopping(topping,'extra')) : (() => props.pullTopping(i,'extra'))}
			>
				<div className={ added === true ?  'topping-img added-topping p-2' : 'topping-img p-2' }>
					{added===true && <span className='topping-remove-icon'><img src={addToppingIcon} alt='' className='img-fluid'/></span>}
					<img src={topping.image} alt="Topping Image" className="img-fluid"/>
				</div>
				<p className="small-text topping-name text-center pt-1">{topping.opt_name_en}</p>
			</div>
		)
	})


	return(
		<div>
			<h1 className='text-left page-title'>Add Toppings @{rate} Each</h1>
			<div className="row mx-0 topping-wrapper mb-5">
				{showExtraToppings}
			</div>
		</div>
	)
}



const SaveOrder = (props) => {
	let rate = 0;
	if(props.pizzaSize.includes('Medium')){
		rate = 6364
	} else if(props.pizzaSize.includes('Large')) {
		rate = 8182
	}



	let selectedProducts = JSON.parse(localStorage.getItem("cartItems"))
	let currentToppings = JSON.parse(sessionStorage.getItem('currentToppings'))
	let price = parseFloat(currentToppings.priceWithToppings) + rate * props.toppingsFromExtras.length
	let toppingCost = rate * props.toppingsFromExtras.length
	let item = props.product.options[props.currentItemIndex]
	let finalToppings = props.toppingsFromCurrent.concat(props.toppingsFromExtras)
	for(let i=0;i<finalToppings.length;i++){
		for(let j=i+1;j<finalToppings.length;j++){
			// if(finalToppings[i].code==finalToppings[j].code){
			// 	finalToppings[i].count = 2;
			// 	finalToppings[i].from = 'both';
			// 	finalToppings.splice(j,1);
			// }
		}
	}

	return(
		<div className='bottom-menu fixed-bottom col-12 py-2'>
			<div className='row d-flex align-items-center mx-0'>
				<div className='col-6 col-sm-9 item-price px-0'>{props.showPrice ? "Rp." + CommaFormatted(Math.round(parseFloat(price))) : "Rp."}</div>
        <div className="col-6 d-flex justify-content-end p-0 m-0">
          <button
            onClick={() => props.SaveToOrder("pizza",item,selectedProducts,props.product, props.fromCart, finalToppings,toppingCost)}
            color=' '
            className='theme-btn text-size d-flex justify-content-between align-items-center'
            >
            SAVE TO ORDER
            <span className='mt-1'>
              <svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                <path d="M0-.25h24v24H0z" fill="none"/>
              </svg>
            </span>
          </button>

					{/* <Link to = {props.fromCart ? Url.VIEW_CART : Url.MENU_PAGE} className='theme-btn btn btn-box py-0 pr-0'
					onClick={() => props.SaveToOrder("pizza",item,selectedProducts,finalToppings,toppingCost)}>
						SAVE TO ORDER TOP
						<span className='mt-1'>
								<svg fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
									<path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
									<path d="M0-.25h24v24H0z" fill="none"/>
								</svg>
						</span>
					</Link> */}
					</div>
			</div>
		</div>
	)
}


class CustomizeTopping extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentItemIndex: props.location.state.product.options.length > 1 ? 1 : 0,
			totalToppings : 0,
			pizzaSize : "",
			modal: true,
			showPrice: false,
			toppingsFromExtras: [],
			toppingsFromCurrent: [],
			maxItemReached : ""
		}

		// branch.logEvent(
		// 	"Change Pizza Toppings",
		// 	function(err) { console.log(err); }
		//    )

		this.toggle = this.toggle.bind(this);
		this.getCurrentPizzaSize = this.getCurrentPizzaSize.bind(this)
		this.renderComponent = this.renderComponent.bind(this)
		this.resetToppings = this.resetToppings.bind(this)
	}

	componentWillMount(){
		this.setState({
			pizzaSize : this.props.location.state.size ? this.props.location.state.size: this.props.location.state.product.options[1]?this.props.location.state.product.options[1].size: this.props.location.state.product.options[0].size
		})
		this.props.location.state.fromCart &&
		this.props.location.state.product.options.map((option,i) => {
			if(option.sku===this.props.location.state.sku){
				this.setState({
					currentItemIndex : i
				})
			}
		})
	}

	pushTopping = (topping,category) => {
		if(category==='current' && this.state.totalToppings<11){
			let arr = {
				code : topping.code,
				count : 1,
				image : topping.image,
				name : topping.name,
				from: category
			}
			this.setState({
				toppingsFromCurrent: [...this.state.toppingsFromCurrent, arr],
			})
		}else if(category==='extra' && this.state.totalToppings<11){
			let arr = {
				code : topping.opt_code,
				count : 1,
				image : topping.image,
				name : topping.opt_name_en,
				from: category
			}
			this.setState({
				toppingsFromExtras: [...this.state.toppingsFromExtras, arr],
			})
		}
		this.setState({
			totalToppings : this.state.totalToppings + 1
		})
	}

	pullTopping = (index,category) => {
		if(category==='extra'){
			this.setState({
				toppingsFromExtras: this.state.toppingsFromExtras.filter((_, i) => i !== index),
				totalToppings : this.state.totalToppings - 1
			})
		}else if(category==='current'){
			this.setState({
				toppingsFromCurrent: this.state.toppingsFromCurrent.filter((_, i) => i !== index),
				totalToppings : this.state.totalToppings - 1
			})
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.location.state.fromCart){
			const finalToppings = nextProps.location.state.toppings
			let current = []
			let extra = []
			let count = 0
			finalToppings.map(item => {
				count = count + item.count;
				if(item.from==='current'||item.from==='both'){
					current.push(item);
				}
				if(item.from==='extra'||item.from==='both'){
					extra.push(item)
				}

			})

			for (var i in current) {
				if (current[i].from == 'both') {
					current[i].from = 'current';
					current[i].count = 1;
				}
			}

			for (var i in extra) {
				if (extra[i].from == 'both') {
					extra[i].from = 'extra';
					extra[i].count = 1;
				}
			}

			this.setState({
				toppingsFromExtras: extra,
				toppingsFromCurrent: current,
				totalToppings: count
			})

		}else {
			this.setState({
				toppingsFromCurrent : nextProps.defaultToppings,
				totalToppings: nextProps.defaultToppings.length
			})
		}
	}

	componentDidMount(){
		let currentToppings = JSON.parse(sessionStorage.getItem('currentToppings'));
    	let promise = new Promise((resolve) => {
      		this.props.fetchAllTopings(currentToppings.defaultTopping);
      		if(typeof this.props.allToppings != 'undefined' && typeof this.props.defaultToppings != 'undefined' && this.props.defaultToppings.length > 0) {
				resolve('resolve');
			}
    	});
    	promise.then(() => {

		});
		setTimeout(() => {
			this.setState({
				showPrice: true
			})
		},1500)
	}

	componentWillUnmount() {
		this.props.resetProps();
	}

	renderComponent(index){
		this.setState({
			currentItemIndex : index
		})
	}

	getCurrentPizzaSize(size){
		this.setState({
			pizzaSize : size
		})
	}

	toggle() {
		this.setState(prevState => ({
		  modal: false,
		  totalToppings : 11,
		  modal : true
		}));
	}

	resetToppings(){
		this.setState({
			totalToppings : this.props.defaultToppings.length,
			toppingsFromExtras: [],
			toppingsFromCurrent: this.props.defaultToppings
		},)
	}

	SaveToOrder = (item, selectedProducts, state, products, edit, finalToppings,index,toppingCost) => {
		const msg = checkItemLimit();
		if(msg=== "") {
		  this.props.addToCart("pizza",selectedProducts,state, products,edit,finalToppings,index,toppingCost)
		  browserHistory.push(this.props.fromCart ? Url.VIEW_CART : Url.MENU_PAGE)
		} else {
		  console.log("show eror box")
		  this.setState({maxItemReached : msg})
		}
	  }

	render() {
		const product = this.props.location.state ? this.props.location.state.product : null
		const fromCart = this.props.location.state && (this.props.location.state.fromCart || this.props.location.state.fromMenu) ? true : false
		const sku = this.props.location.state ? this.props.location.state.sku : null
		let defaultProduct = {}
		let defaultIndex = ""
		this.props.location.state.fromCart ?
			product.options.map((option,index) => {
				if(option.sku===sku){
					defaultProduct = option
					defaultIndex = index
				}
			}) : (
					defaultProduct = product.options[1] ? product.options[1] : product.options[0],
					defaultIndex = product.options[1] ? 1 : 0
				)

		return(
			<div>
				{this.props.fetching && <Loader loading={this.props.fetching} />}
				{this.state.maxItemReached && (
        <QunatityModal message ={this.state.maxItemReached} successHandler = {() =>  this.setState({
          maxItemReached : ""
        })}/>
        )}
				{this.state.totalToppings > 11 &&
					<Modal isOpen={this.state.modal} modalTransition={{ timeout: 200 }} backdropTransition={{ timeout: 200 }}
						toggle={this.toggle} className={`selected-store-modal modal-dialog-center ${this.props.className}`}>
						<ModalHeader className="border-0">
								<p>Sorry</p>
						</ModalHeader>
						<ModalBody className='p-0'>
							<div className='col-12 d-flex'>
							<p>11 toppings is allowed on each pizza or half</p>
							</div>
						</ModalBody>
						<ModalFooter className="border-0" style={{'padding' : '15px 15px 0px 15px'}}>
							<a onClick={this.toggle} className='theme-btn big-btn col-12 text-center alert'>OK</a>
						</ModalFooter>
					</Modal>
				}

				<header className='track hm-header text-center fixed-top'>
					<div className="row d-flex align-items-center px-3 mx-0">
					<Link to={Url.MENU_PAGE} className='col-2 back-icon px-0 text-left'><img src={backImage} className="mx-auto img-fluid"/></Link>
						<div className='col-auto hm-title'>{this.context.t('Menu')}</div>
					</div>
				</header>
				{product===null ?
					<h1 className="text-left page-title">{this.context.t('Please select a Pizza from the menu')}</h1>
					:
					<div className='col-12 pt-3'>

						<h1 className="text-left page-title">{this.context.t('Customize Pizza')}</h1>
						<Pizza
							product = {product}
							allToppings={this.props.allToppings}
							addToCart={this.props.addToCart}
							removeCart={this.props.removeCart}
							deleteToCart={this.props.deleteToCart}
							fromToppings={true}
							renderComponent={this.renderComponent}
							getCurrentPizzaSize={this.getCurrentPizzaSize}
							defaultProduct={defaultProduct}
							resetToppings={this.resetToppings}
							defaultIndex={defaultIndex}
							resetItemPrice={this.resetItemPrice}
						/>
						<CurrentToppings
							defaultToppings={this.props.defaultToppings}
							pushTopping={this.pushTopping}
							pullTopping={this.pullTopping}
							toppingsFromCurrent={this.state.toppingsFromCurrent}
						/>
						<div className='col-12 px-0'>
							<hr />
						</div>
						{(!this.state.pizzaSize.includes('Personal')) && <AddToppings
							allToppings={this.props.allToppings}
							pizzaSize={this.state.pizzaSize}
							pushTopping={this.pushTopping}
							pullTopping={this.pullTopping}
							toppingsFromExtras={this.state.toppingsFromExtras}
						/>}
						<SaveOrder
							product={product}
							currentItemIndex={this.state.currentItemIndex}
							SaveToOrder= {this.SaveToOrder}
							fromCart ={fromCart}
							pizzaSize={this.state.pizzaSize}
							index={this.props.location.state.index}
							showPrice={this.state.showPrice}
							toppingsFromExtras={this.state.toppingsFromExtras}
							toppingsFromCurrent={this.state.toppingsFromCurrent}
						/>
					</div>
				}
			</div>
		)
	}
}

CustomizeTopping.contextTypes = {
  t: PropTypes.func.isRequired
}

export default CustomizeTopping;
