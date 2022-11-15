import React from 'react';
import PromoItem from './PromoItem';
import {
	getLocalStorage
  } from "components/Helpers";
import Loader from "components/Loader";
class PromotionWrapper extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount(){
		let defaultPromoProduct = JSON.parse(localStorage.getItem("defaultPromoProduct"));
		if(defaultPromoProduct===null||defaultPromoProduct===""){
			defaultPromoProduct = []
			localStorage.setItem("defaultPromoProduct",JSON.stringify(defaultPromoProduct))
		}
	}
	componentWillMount() {
        const selecAaddress = getLocalStorage('choosenAddress')
         const deliveryAddress = getLocalStorage('delivery_address');
         const takeawayAddress = getLocalStorage('takeawayDetail');
         const activeBtn = getLocalStorage('active_Btn');
         this.setDeliveryAddress(deliveryAddress);
         this.setTakeawayAddress(takeawayAddress);
         this.setActiveBtn(activeBtn);
    }

    setDeliveryAddress(address) {
        this.setState({deliveryAddress: address});
    }
    setTakeawayAddress(address) {
        this.setState({takeawayAddress: address});
    }
    setActiveBtn(btn) {
        this.setState({activeBtn: btn});
    }
	render() {
		let promotionList = [] ;
		let fetchConfig = [] ;
		if (!_.isEmpty(this.props.promotionList)) {
			promotionList = (this.props.promotionList);
		}
		fetchConfig = (this.props.fetchConfig);
		//let promoProduct = JSON.parse(localStorage.getItem(defaultPromoProduct))
		let appExclusiveList = []
		let promotionListGet = getLocalStorage("appExclusiveList");
		if (!_.isEmpty(promotionListGet)) {
		appExclusiveList = promotionListGet.data;
		}

		// console.log('deliveryAddress',this.state.deliveryAddress);
		// console.log('deliveryAddressProps',this.props.deliveryAddress);

		// console.log('takeawayAddress', this.state.takeawayAddress);

		// console.log('takeawayAddressProps', this.props.takeawayAddress);
		return (
			<div className="ml-0">
				{/* {this.props.showLoader === false && (
					<Loader loading={!this.props.showLoader} />
				)} */}
				{/* <div>
					<div className="col-12 pt-0">
						<h1 className="categories-title font-weight-bold">App exclusive promos</h1>
					</div>
					<div className='row promotion-wrapper mx-0 categories-list'>
						<div className="col-12 promotion-list item-listing">
							{(typeof appExclusiveList !== 'undefined') && appExclusiveList.map((item,index) => {
									const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
									// const a = item.date_start.split(" ")
									// const b = a[0].split("-")
									// const x = item.date_end.split(" ")
									// const y = x[0].split("-")
									// const start_year = b[0]
									// const start_month = b[1]
									// const start_date = b[2]
									// const end_year = y[0]
									// const end_month = y[1]
									// const end_date = y[2]
									let today = new Date();
									let currentDate = today.getDate();
									let currentMonth = today.getMonth()+1;
									let currentYear = today.getFullYear();
									let currentHour = today.getHours();
									let currentMinutes = today.getMinutes();
									let currentSeconds = today.getSeconds();
									// let year = false;
									// if(start_year < currentYear && end_year > currentYear){
									// 	show = true
									// }
									let showItem = false;
									//const checkDate =  currentYear+'-'+currentMonth+'-'+currentDate+' '+currentHour+':'+currentMinutes+':'+currentSeconds;
									//const checkTime = currentHour+':'+currentMinutes
									const checkDay = week[today.getDay()]
									// //checkDate>item.date_start && checkDate<item.date_end && 
									// //&& checkTime>item.hour_start && checkTime<item.hour_end
									if(item.hidden==="0" && item.period_day.includes(checkDay)){
										showItem = true
									}
									let promoProduct = JSON.parse(localStorage.getItem(`defaultPromoProduct${item.url_key}`))
									return showItem==true && <PromoItem
										addToCart={this.props.addToCart}
										removeCart={this.props.removeCart}
										getProductPrice={this.props.getProductPrice}
										key={item.sku}
										item={item}
										showItem={showItem}
										promoProduct={promoProduct}
										config={this.props.config}
										checkItemLimit = {this.props.checkItemLimit}
									/>
										
								})}
						</div>
					</div>
				</div> */}
				<div>
					<div className="col-12 pt-0">
					{/* <h1 className="categories-title font-weight-bold">{this.props.categoryName}</h1> */}
					<h1 className="categories-title font-weight-bold">Everyday special moments deals</h1>
					</div>
					<div className='row promotion-wrapper mx-0 categories-list'>
						<div className="col-12 promotion-list item-listing">
							{(typeof promotionList !== 'undefined') && promotionList.map((item,index) => {
								const week = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
								// const a = item.date_start.split(" ")
								// const b = a[0].split("-")
								// const x = item.date_end.split(" ")
								// const y = x[0].split("-")
								// const start_year = b[0]
								// const start_month = b[1]
								// const start_date = b[2]
								// const end_year = y[0]
								// const end_month = y[1]
								// const end_date = y[2]
								let today = new Date();
								let currentDate = today.getDate();
								let currentMonth = today.getMonth()+1;
								let currentYear = today.getFullYear();
								let currentHour = today.getHours();
								let currentMinutes = today.getMinutes();
								let currentSeconds = today.getSeconds();
								// let year = false;
								// if(start_year < currentYear && end_year > currentYear){
								// 	show = true
								// }
								let showItem = false;
								//const checkDate =  currentYear+'-'+currentMonth+'-'+currentDate+' '+currentHour+':'+currentMinutes+':'+currentSeconds;
								//const checkTime = currentHour+':'+currentMinutes
								const checkDay = week[today.getDay()]
								// //checkDate>item.date_start && checkDate<item.date_end && 
								// //&& checkTime>item.hour_start && checkTime<item.hour_end
								if(item.hidden==="0" && item.period_day.includes(checkDay)){
									showItem = true
								}
								let promoProduct = JSON.parse(localStorage.getItem(`defaultPromoProduct${item.url_key}`))
								
								if(item.sku !== 'BOGO' && item.sku !== 'DINNER1' && item.sku !== 'FLASH51'){
								return showItem==true && <PromoItem
									addToCart={this.props.addToCart}
									removeCart={this.props.removeCart}
									getProductPrice={this.props.getProductPrice}
									key={item.sku}
									item={item}
									showItem={showItem}
									promoProduct={promoProduct}
									config={this.props.config}
									checkItemLimit = {this.props.checkItemLimit}
									configuration={this.props.configuration}
									activeBtn={this.props.activeBtn ? this.props.activeBtn : this.state.activeBtn}
								/>
							}
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default PromotionWrapper;