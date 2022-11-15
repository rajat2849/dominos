import { connect } from 'react-redux';
import ThankYou from '../components/ThankYou';
import { fetchOrderSummary, resetOrderSummary } from '../modules/thankYou';

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchOrderSummary: () => dispatch(fetchOrderSummary()),
    resetOrderSummary: () => dispatch(resetOrderSummary())
  });
};

const mapStateToProps = (state) => {
  return ({
    lang: state.i18nState.lang,
    orderSummary: state.ThankYou.orderSummary
  });
};
export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
