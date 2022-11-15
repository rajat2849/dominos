import React from 'react'
import { Button} from 'reactstrap';
import OrderCount from './OrderCount';
import {Link} from 'react-router';
import {Url} from 'config/Config';
import PropTypes from 'prop-types';
import { CommaFormatted } from '../../../components/Helpers'
import Image from "../../../../public/newimages/caret-down.png"
import './Loader.scss'

class Pizza extends React.Component {
    constructor(props){
        super(props)
        this.state={
            selectedPizzas:[],
            size: this.props.defaultProduct ? this.props.defaultProduct.size : (this.props.product.options && this.props.product.options.length>0) ? (this.props.product.options[1] ? this.props.product.options[1].size : this.props.product.options[0].size) : [],
            crust: this.props.defaultProduct ? this.props.defaultProduct.crust : (this.props.product.options && this.props.product.options.length>0) ? (this.props.product.options[1] ? this.props.product.options[1].crust : this.props.product.options[0].crust) : [],
            expended : false
        }
        this.expendedText = this.expendedText.bind(this);
    }
    // componentWillReceiveProps(nextProps) {
    //     localStorage.setItem("allToppings", JSON.stringify(nextProps.allToppings));
    //     // if (nextProps.isPromotionFetched === false && this.props.loader === true) {
    //     //   this.props.loadingImage(false);
    //     // }
    //   }
    componentWillMount(){
        let currentToppings = (this.props.defaultProduct) ? {
            defaultTopping : this.props.defaultProduct.default_topping,
            priceWithToppings : this.props.defaultProduct.price,
            sku : this.props.defaultProduct.sku
        } : (this.props.product.options && this.props.product.options.length>0) ? {
            defaultTopping : this.props.product.options[1] ? this.props.product.options[1].default_topping : this.props.product.options[0].default_topping,
            priceWithToppings : this.props.product.options[1] ? this.props.product.options[1].price : this.props.product.options[0].price,
            sku : this.props.product.options[1] ? this.props.product.options[1].sku : this.props.product.options[0].sku
        } : null
        this.props.fromToppings===true &&
            sessionStorage.setItem('currentToppings', JSON.stringify(currentToppings))
        if(this.props.fromToppings){
            this.props.renderComponent(this.props.defaultIndex)
        }

    }

    expendedText() {
      this.setState ({
        expended:!this.state.expended
      })
    }

    handleSize(e,product,size,crust){

        this.props.resetToppings && this.props.resetToppings()

		let obj = {
			id: product.id,
			size: e.target.value,
        }
		let arr = product.options
		for(let i=0;i<arr.length;i++){
			if(obj.size===arr[i].size){
                obj.crust = arr[i].crust
				break
			}
        }

        this.props.getCurrentPizzaSize && this.props.getCurrentPizzaSize(e.target.value)

        this.setState({
            size: e.target.value,
            crust: obj.crust
        })

        this.props.fromToppings===true &&
            this.props.product.options.map((option,index) => {
                if(option.size===e.target.value && option.crust===obj.crust){
                    let currentToppings = {
                        defaultTopping : option.default_topping,
                        priceWithToppings : option.Oldprice ? option.Oldprice : option.price,
                        sku : option.sku
                    }
                    sessionStorage.setItem('currentToppings', JSON.stringify(currentToppings))

                    this.props.renderComponent(index)
                }
            })

		let n = -1
		let newarr = this.state.selectedPizzas
		for(let i=0;i<newarr.length;i++){
			if(obj.id===newarr[i].id){
				n=i
				break;
			}
		}
		if(n>=0){
			newarr[n] = obj
		}
		else{
			newarr.push(obj)
		}
		this.setState({
			selectedPizzas: newarr
		})
	}

	handleCrust(e,product,size,crust){

        this.props.resetToppings && this.props.resetToppings()

		let obj = {
			id: product.id,
			size: product.options[1] ? product.options[1].size : product.options[0].size,
			crust: e.target.value,
			price: 0
		}
		let n = -1
		let arr = this.state.selectedPizzas
		for(let i=0;i<arr.length;i++){
			if(obj.id===arr[i].id){
				n=i
                obj.size = arr[i].size
				break;
			}
        }
        this.setState({
            size: obj.size,
            crust: e.target.value
        })

        this.props.fromToppings===true &&
            this.props.product.options.map((option,index) => {
                if(option.size===obj.size && option.crust===e.target.value){
                    let currentToppings = {
                        defaultTopping : option.default_topping,
                        priceWithToppings : option.Oldprice ? option.Oldprice : option.price,
                        sku : option.sku
                    }

                    sessionStorage.setItem('currentToppings', JSON.stringify(currentToppings))

                    this.props.renderComponent(index)
                }
            })

		if(n>=0){
			arr[n] = obj
		}
		else{
			arr.push(obj)
		}
		this.setState({
			selectedPizzas: arr
		})
  }

    showDropdown = (element) => {
        var event;
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('mousedown', true, true, window);
        element.dispatchEvent(event);
    };

    // This isn't magic.
    runThis = (dropdown)  => {
        showDropdown(dropdown);
    };


    addToOrder = (skuIndex ,selectedProducts , toppings) => {
    const { checkItemLimit } = this.props;
    const status = checkItemLimit();
    if(status) {
    this.props.addToCart("pizza",this.props.product.options[skuIndex],selectedProducts,this.props.product,false,toppings);
    }
    }

    render(){
        let arr = []
		    let selectedProducts = JSON.parse(localStorage.getItem("cartItems"))
        let size = this.props.defaultProduct ? this.props.defaultProduct.size : (this.props.product.options && this.props.product.options.length>0) ? (this.props.product.options[1] ? this.props.product.options[1].size : this.props.product.options[0].size) : []
        let crust = this.props.defaultProduct ? this.props.defaultProduct.crust : (this.props.product.options && this.props.product.options.length>0) ? (this.props.product.options[1] ? this.props.product.options[1].crust : this.props.product.options[0].crust) : []
        let newarr = this.state.selectedPizzas
        let price = 0
        let skuIndex = -1
        let allToppings = JSON.parse(localStorage.getItem("allToppings"))
        let toppings = []

        for(let i=0;i<newarr.length;i++){
            if(this.props.product.id===newarr[i].id){
                size = newarr[i].size
                crust = newarr[i].crust
                break;
            }
        }

        (this.props.product.options && this.props.product.options.length > 0) && this.props.product.options.map((option,index) => {
            arr.push(option.size)
            if(option.size===size && option.crust===crust){

                price = option.price
                skuIndex = index
            }
        })


        let str = this.props.product.options[skuIndex].default_topping || '';
        let def_topping = str.split(",")
        def_topping.map(ele => {
          if(allToppings) { allToppings.map(top => {
                if(ele===top.opt_code){
                    const obj = {
                        code : top.opt_code,
                        count : 1,
                        image : top.image,
                        name : top.opt_name_en,
                        from: 'current'
                    }
                    toppings.push(obj)
                }
            })}
        })


        let uniqueSizeArray = [...new Set(arr)]
        let show = false
        const styles = {
            toppingProduct:{
                boxShadow: (this.props.fromToppings!==true && this.state.expended === false) ? "0px 2px 2px #00000026" : "none",
                borderRadius: (this.props.fromToppings!==true && this.state.expended === false) ? "5px" : "0px",
            },
            toppingProductForm:{
                display: (this.props.fromToppings!==true && this.state.expended === false) ? "none" : "block",
            }
          };
        return (
            <div className={(this.props.fromToppings!==true && this.state.expended === false) ? "col-6" : "col-12"} style={{marginBottom: "15px"}}>
                {(this.props.product.options && this.props.product.options.length>0) &&
                    <div className="row mx-0" style={styles.toppingProduct}>
                        <Link to = {{
                            pathname: `${Url.TOPPINGS}/${this.props.product.url_key}`,
                                state : {
                                    product : this.props.product
                                }
                            }}
                            style={{margin:"0 auto",width:"100%"}}
                        >
                            <div className={this.props.fromToppings ? "col-12 px-0 text-center selected-pizza" : "row item-img px-0"} style={{margin: "0 auto",minHeight:"120px"}}>
                                <img src={this.props.product.thumbnail} alt="Offer Image" className="img-fluid"/>
                            </div>
                        </Link>
                        <div className={this.props.fromToppings ? "col-12 item-details px-0" : "item-details"} style={{width: "100%",padding:"0px 10px",borderBottom: "0px solid #e5e5e5"}}>
                            <Link to = {{
                                    pathname: `${Url.TOPPINGS}/${this.props.product.url_key}`,
                                    state : {
                                        product : this.props.product
                                    }
                                }}
                            >
                                <h2 className='item-title' style={{fontSize: "12px",lineHeight:"14px",minHeight: "27px"}}>{this.props.product.name_en}</h2>

                            </Link>
                            {(this.props.fromToppings!==true && this.state.expended === false) ?
                                <p className="item-description" style={{display:"none"}}>
                                    {/* {this.props.product.description_en.substr(0,43)}{this.props.product.description_en.length > 15 &&
                                        <a onClick = {() => this.expendedText()}>...Read more</a>
                                    } */}
                                </p>
                            :
                            <p className="item-description">{this.props.product.description_en}</p>}
                            <form className='row mx-0' style={styles.toppingProductForm}>
                                <div className='col-12 px-0 item-option col-sm-6'>
                                    <label className='option-label'>Size</label>
                                    <div className="row position-relative">
                                        <div className='option-label col-12 pt-1 position-absolute'>
                                            <label className='option-label col-11 p-0'>{size}</label>
                                            <img src = {Image} className="img-pizza"/>
                                        </div>

                                        <select style={{zIndex:'100',background:'transparent',color:'transparent',fontSize:'12px'}} id='size_drop' value={size} onChange={e => this.handleSize(e,this.props.product,size,crust)} className='form-control option-select'>
                                            {
                                                uniqueSizeArray.map((sizeOp,index) => {
                                                    let price = 0
                                                    this.props.product.options.map(option => {
                                                        if(option.size===sizeOp && option.crust.includes("Hand")){

                                                            price = option.price
                                                        }
                                                    })
                                                    return <option style={{color:'#000'}} key={index} value={sizeOp}>{sizeOp}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rp.{CommaFormatted(Math.round(parseFloat(price)))}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className='col-12 px-0 item-option col-sm-6'>
                                    <label className='option-label'>Crust</label>
                                    <div className="row position-relative">
                                        <div className='option-label col-12 pt-1 position-absolute'>
                                        <label className='option-label col-11 p-0'>{crust}</label>
                                        <img src = {Image} className="img-pizza"/>
                                        </div>
                                        <select style={{zIndex:'100',background:'transparent',color:'transparent',fontSize:'12px'}} value={crust} onChange={e => this.handleCrust(e,this.props.product,size,crust)} className='form-control option-select'>
                                            {
                                                this.props.product.options.map(option => {
                                                    if(option.size===size && option.crust!==false){
                                                        return <option style={{color:'#000'}} key={option.sku} value={option.crust}>{option.crust}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rp.{CommaFormatted(Math.round(parseFloat(option.price)))}</option>
                                                    }
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </form>
                            <div className="row mx-0 d-flex align-items-center" style={{width:"100%"}}>
                                {this.props.fromToppings!==true && <div className='item-price px-0' style={{width: "100%",marginBottom: "10px"}}>Rp. {CommaFormatted(Math.round(parseFloat(price)))}</div>}
                                <div className='px-0 text-right ml-auto' style={{width: "100%"}}>
                                    {selectedProducts && selectedProducts.map((selected_product) => {
                                        //selected_product.id===this.props.product.options[skuIndex].sku
                                        if(selected_product.product && (selected_product.product.sku===this.props.product.sku)){
                                            show = true
                                        }
                                    })}
                                    {
                                        this.props.fromToppings!==true && (
                                        show===true ?
                                        <OrderCount
                                            addToCart={this.props.addToCart}
                                            removeCart={this.props.removeCart}
                                            deleteToCart={this.props.deleteToCart}
                                            item={this.props.product.options[skuIndex]}
                                            product={this.props.product}
                                            getProductPrice={this.props.getProductPrice}
                                            fromPizza={true}
                                            category="pizza"
                                            toppings={toppings}
                                        /> :
                                        <Button className="theme-btn ml-auto" style={{width: "100%"}}
                                            onClick={() => this.addToOrder(skuIndex, selectedProducts , toppings)}>
                                            Add
                                        </Button>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}
Pizza.contextTypes = {
  t: PropTypes.func.isRequired
}
export default Pizza
