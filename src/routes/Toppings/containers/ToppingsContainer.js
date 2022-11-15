import { connect } from 'react-redux';
import CustomizeTopping from '../components/CustomizeTopping';
import { fetchAllTopings, resetProps, resetAlertBox } from "../../../store/toppings";
import { addToCart , deleteToCart ,removeCart} from '../../../store/newcart';
import { loadingImage } from "../../../store/app";

const mapStateToProps = (state) => {
  return ({
    //lang: state.i18nState.lang,
    fetching: state.myToppings.fetching,
    error: state.myToppings.error,
    allToppings: state.myToppings.allToppings,
    defaultToppings: state.myToppings.defaultToppings,
    showAlert: state.myToppings.showAlert,
    alertMessage: state.myToppings.alertMessage,
    cartProducts: state.myCart.cartProducts,
    loader: state.app.loader,
  });
};

const mapDispatchToProps= (dispatch) => {
  return ({
    fetchAllTopings: (defaultToppings) => dispatch(fetchAllTopings(defaultToppings)),
    resetProps: () => dispatch(resetProps()),
    resetAlertBox: (showAlert, message) => dispatch(resetAlertBox(showAlert, message)),
    deleteToCart: (product , state) => dispatch(deleteToCart(product , state)),
    addToCart: (category,item , state, product, edit,finalToppings,index,price) => dispatch(addToCart(category,item ,state, product, edit,finalToppings,index,price)),
    removeCart: (item , state, product) => dispatch(removeCart(item , state, product)),
    loadingImage: (status) => dispatch(loadingImage(status))
  });
};


export default connect(mapStateToProps, mapDispatchToProps)(CustomizeTopping);