import {connect} from 'react-redux';
import {getOrderOptions, setOrderOption} from '../../../redux/orderRedux';

import OrderForm from '../../features/OrderForm/OrderForm';

const mapStateToProps = state => ({
  options: getOrderOptions (state),
  setOrderOption: setOrderOption (state),
});

const mapDispatchToProps = dispatch => ({
  setOrderOption: option => dispatch(setOrderOption(option)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);