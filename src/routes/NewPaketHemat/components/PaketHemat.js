import React from "react";
// import Header from '../../../DashboardSubComponent/Header';
import { Url } from "config/Config";
import { Button } from "reactstrap";
import YourOrder from "./YourOrder";
import backImage from "../../../../public/newimages/backImage.png";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { saveSessionStorage, getLocalStorage } from "components/Helpers";
import Loader from "../../../components/Loader";
import "../../NewPromotion/components/Promotion.scss";

class PaketHemat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      defaultItems: [],
      changeProduct: false,
      itemId: "",
      choosenProduct: [],
      size: "",
      crust: "",
      sessionArr: []
    };
    // branch.logEvent("Paket Hemat", function(err) {
    //   console.log(err);
    // });
    this.handleChangeProduct = this.handleChangeProduct.bind(this);
    this.handleSelectProduct = this.handleSelectProduct.bind(this);
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.props.getProductDetailValueDeals(this.props.location.state.sku);
    } else {
      browserHistory.push({
        pathname: Url.MENU_PAGE,
        state: { name: "Paket Hemat" }
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const defaultArr = [];
    let choosenItems = [];
    const sessionArr = {};
    let size = "";
    let crust = "";
    nextProps.productValueDetail.options &&
      nextProps.productValueDetail.options.map((option, index) => {
        let item = [];
        nextProps.location.state.fromCart === true
          ? option.item.map(ele => {
              if (
                nextProps.location.state.product[index] &&
                nextProps.location.state.product[index].item.parent_sku ===
                  ele.parent_sku
              ) {
                item.push(ele);
              }
            })
          : option.item.map(ele => {
              if (option.item[0].parent_sku === ele.parent_sku) {
                item.push(ele);
              }
            });

        if (option.item[0].size && option.item[0].crust) {
          size = option.item[0].size;
          crust = option.item[0].crust;
        }
        const items = {
          item: item,
          id:
            nextProps.location.state.fromCart === true &&
            nextProps.location.state.product[index]
              ? nextProps.location.state.product[index].id
              : option.option_id,
          title:
            nextProps.location.state.fromCart === true &&
            nextProps.location.state.product[index]
              ? nextProps.location.state.product[index].title
              : option.title
        };

        let tempItem =
          nextProps.location.state.fromCart === true &&
          nextProps.location.state.product[index]
            ? nextProps.location.state.product[index].item
            : option.item[0];
        tempItem.option_id =
          nextProps.location.state.fromCart === true &&
          nextProps.location.state.product[index]
            ? nextProps.location.state.product[index].id
            : option.option_id;

        const chooseItem = {
          item: tempItem,
          id:
            nextProps.location.state.fromCart === true &&
            nextProps.location.state.product[index]
              ? nextProps.location.state.product[index].id
              : option.option_id,
          title:
            nextProps.location.state.fromCart === true &&
            nextProps.location.state.product[index]
              ? nextProps.location.state.product[index].title
              : option.title
        };
        let it = chooseItem.item;
        it.option_id = chooseItem.id;
        defaultArr.push(items);
        choosenItems.push(chooseItem);
        sessionArr[index] = it;
      });
    var list = nextProps.productValueDetail;
    list.url_key = nextProps.routeParams.slug;
    localStorage.setItem(
      `defaultValueProduct${list.url_key}`,
      JSON.stringify(choosenItems)
    );
    this.setState({
      defaultItems: defaultArr,
      list: list,
      sessionArr: sessionArr,
      choosenProduct: choosenItems,
      size: size,
      crust: crust
    });
  }

  handleChangeProduct(e, id) {
    e.preventDefault();
    this.setState(
      {
        changeProduct: true,
        itemId: id
      },
      () => {
        let id = "change";
        let element = document.getElementById(id);
        element !== null &&
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "start"
          });
      }
    );
  }

  handleSelectProduct(e, index, item) {
    e.preventDefault();
    let items = this.state.defaultItems;
    let choosenProduct = this.state.choosenProduct;
    let item1 = [];
    let arr = this.state.sessionArr;
    this.state.list.options[index].item.map(option => {
      if (item.sku === option.sku) {
        item1.push(option);
      }
    });
    items[index].item = item1;
    choosenProduct[index].item = item;
    arr[index] = item;
    arr[index].option_id = this.state.list.options[index].option_id;
    this.setState({
      defaultItems: items,
      changeProduct: false,
      choosenProduct: choosenProduct,
      sessionArr: arr
    });
  }

  handleChooseCrust(e, index) {
    let choosenProduct = this.state.choosenProduct;
    for (let i = 0; i < this.state.defaultItems[index].item.length; i++) {
      if (
        this.state.defaultItems[index].item[i].crust.replace(/ +/g, "") ===
          e.target.value.replace(/ +/g, "") &&
        this.state.defaultItems[index].item[i].size.replace(/ +/g, "") ===
          this.state.size.replace(/ +/g, "")
      ) {
        choosenProduct[index].item = this.state.defaultItems[index].item[i];
        this.setState({
          crust: e.target.value,
          choosenProduct: choosenProduct
        });
        break;
      }
    }
  }

  handleChooseSize(e, index) {
    let choosenProduct = this.state.choosenProduct;
    for (let i = 0; i < this.state.defaultItems[index].item.length; i++) {
      if (
        this.state.defaultItems[index].item[i].size.replace(/ +/g, "") ===
        e.target.value.replace(/ +/g, "")
      ) {
        choosenProduct[index].item = this.state.defaultItems[index].item[i];
        this.setState({
          size: e.target.value,
          crust: this.state.defaultItems[index].item[i].crust,
          choosenProduct: choosenProduct
        });
        break;
      }
    }
  }

  render() {
    const fromCart =
      this.props.location.state &&
      (this.props.location.state.fromCart || this.props.location.state.fromMenu)
        ? true
        : false;
    let index = -1;
    let defaultPrice = parseFloat(this.props.productValueDetail.price);
    // if(defaultPrice==0){
    //   defaultPrice = parseFloat(this.state.choosenProduct[0].item.price)
    // }
    console.log("oierwhgfiohergioneriogeroiuiou")

    const sessionCart = {
      [this.state.list.sku + "_" + "promotion"]: {
        qty: 1,
        parent_sku: this.state.list.sku,
        sku: this.state.list.sku + "_" + "promotion",
        topping: "",
        additionalInfo: this.state.sessionArr,
        chicken: "",
        coupon_code: "",
        modificationTime: new Date().getTime(),
        price: this.state.list.price,
        sauce: "",
        title: this.state.list.name_en,
        type: this.state.list.type,
        valueDealsOptions: {}
      }
    };

    saveSessionStorage("cart", sessionCart);

    let defaultSides =
      this.state.choosenProduct.length > 0 &&
      this.state.choosenProduct.map((option, index) => {
        const sizesArray = [];
        const crustsArray = [];
        let crusts = "";
        let sizes = "";
        if (option.item.crust && option.item.size) {
          this.state.defaultItems[index].item.map(el => {
            sizesArray.push(el.size);
            if (
              el.size.replace(/ +/g, "") === option.item.size.replace(/ +/g, "")
            )
              crustsArray.push(el.crust);
          });

          let uniqueSizeArray = [...new Set(sizesArray)];
          let uniqueCrustArray = [...new Set(crustsArray)];
          crusts = uniqueCrustArray.map(el => {
            return (
              <option value={el} key={el}>
                {el}
              </option>
            );
          });
          sizes = uniqueSizeArray.map(el => {
            return (
              <option value={el} key={el}>
                {el}
              </option>
            );
          });
        }

        return (
          <div key={option.id} className="col-12 px-0">
            <h1 className="text-left option-title">{option.title}</h1>
            <div className="row item-listing mx-0">
              <div className="col-4 item-img px-0">
                <img
                  src={option.item.thumbnail}
                  alt="Offer Image"
                  className="img-fluid"
                />
              </div>
              <div className="col-8 item-details pr-0">
                <h2 className="item-title">{option.item.name_en}</h2>
                <p className="item-description">{option.item.description_en}</p>
                {option.item.crust && option.item.size && (
                  <form className="row mx-0">
                    <div className="col-12 col-sm-6 px-0 item-option">
                      <label className="option-label">Size</label>
                      <select
                        className="form-control option-select"
                        value={option.item.size}
                        onChange={e => this.handleChooseSize(e, index)}
                      >
                        {sizes}
                      </select>
                    </div>
                    <div className="col-12 col-sm-6 px-0 item-option">
                      <label className="option-label">Crust</label>
                      <select
                        className="form-control option-select"
                        value={option.item.crust}
                        onChange={e => this.handleChooseCrust(e, index)}
                      >
                        {crusts}
                      </select>
                    </div>
                  </form>
                )}
                <div className="col-12 px-0 text-right">
                  <Button
                    onClick={e => this.handleChangeProduct(e, option.id)}
                    className="theme-btn ml-auto"
                  >
                    {this.context.t("Change Product")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      });

    this.state.list.options &&
      this.state.list.options.map((option, i) => {
        if (this.state.itemId === option.option_id) {
          index = i;
        }
      });

    let uniqueChoose = [];

    this.state.list.options &&
      index !== -1 &&
      this.state.list.options[index].item.map(item => {
        let unique = true;

        uniqueChoose.length > 0 &&
          uniqueChoose.map(ele => {
            if (
              item.parent_sku &&
              ele.parent_sku &&
              item.parent_sku === ele.parent_sku
            ) {
              unique = false;
            }
          });
        if (unique === true) {
          uniqueChoose.push(item);
        }
      });

    const chooseSides =
      uniqueChoose.length > 0 &&
      uniqueChoose.map(item => {
        return (
          <div key={item.sku} className="row mx-0 item-listing">
            <div className="col-4 item-img px-0">
              <img
                src={item.thumbnail}
                alt="Offer Image"
                className="img-fluid"
              />
            </div>
            <div className="col-8 item-details pr-0">
              <h2 className="item-title">{item.name_en}</h2>
              <p className="item-description">{item.crust_description_en}</p>
              {/* {item.crust && item.size && 
                    <form className='row mx-0'>
                      <div className='col-12 px-0 item-option col-sm-6'>
                          <label className='option-label'>{this.context.t('Size')}</label>
                          <select className='form-control option-select'>
                            <option>{item.size}</option>
                          </select>
                      </div>
                      <div className='col-12 px-0 item-option col-sm-6'>
                          <label className='option-label'>Crust</label>
                          <select className='form-control option-select'>
                            <option>{item.crust}</option>
                          </select>
                      </div>
                    </form>
                  } */}
              <div className="col-12 px-0 text-right mt-2">
                <Button
                  onClick={e => this.handleSelectProduct(e, index, item)}
                  className="theme-btn ml-auto"
                >
                  {this.context.t("Select Product")}
                </Button>
              </div>
            </div>
          </div>
        );
      });
    const lang = getLocalStorage("siteLanguage");
    return (
      <div>
        {this.props.fetching && <Loader loading={this.props.fetching} />}
        {!this.state.changeProduct ? (
          <div>
            <header className="track hm-header text-center fixed-top">
              <div className="row d-flex align-items-center px-3 mx-0">
                <Link
                  to={Url.MENU_PAGE}
                  className="col-2 back-icon px-0 text-left"
                >
                  <img src={backImage} className="mx-auto img-fluid" />
                </Link>
                <div className="col-auto hm-title">Menu</div>
              </div>
            </header>
            <div className="col-12 item-details pt-3 selected">
              <h2 className="item-title">{this.state.list.name_en}</h2>
              <div className="col-12 px-0 text-center selected-items">
                {!this.props.fetching && (
                  <img
                    src={this.state.list.thumbnail}
                    alt="promotion-Image"
                    className="img-fluid image-size"
                  />
                )}
              </div>
              <div className="col-12 item-details px-0 my-2">
                <p className="item-description">
                  {lang === "en"
                    ? this.state.list.description_en
                    : this.state.list.description_idn}
                </p>
                <div className="row mx-0 default-items">{defaultSides}</div>
                <div className="bottom-menu fixed-bottom col-12">
                  <div className="row d-flex align-items-center">
                    <YourOrder
                      price={defaultPrice}
                      item={this.state.list}
                      page={this.props.location.state.page}
                      addToCart={this.props.addToCart}
                      defaultProduct={this.state.choosenProduct}
                      getProductPrice={this.props.getProductPrice}
                      couponProduct={this.props.couponProduct}
                      edit={fromCart}
                      index={this.props.location.state.index}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div id="change">
            <header className="track hm-header text-center fixed-top">
              <div className="row d-flex align-items-center px-3 mx-0">
                <div className="col-2 back-icon px-0 text-left">
                  <img
                    onClick={() =>
                      this.state.changeProduct === true
                        ? this.setState({ changeProduct: false })
                        : window.history.back()
                    }
                    src={backImage}
                    className="mx-auto img-fluid"
                  />
                </div>
                <div className="col-auto hm-title">Menu </div>
              </div>
            </header>
            <div className="col-12 pt-3">
              <h4 className="f-16 text-black-50 py-2">
                {this.state.list.options[index].title}
              </h4>
              {chooseSides}
            </div>
          </div>
        )}
      </div>
    );
  }
}
PaketHemat.contextTypes = {
  t: PropTypes.func.isRequired
};

export default PaketHemat;
