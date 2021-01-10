import {connect} from 'react-redux';
import OrderForm from '../../features/OrderForm/OrderForm';
import {getOrderOptions} from '../../../redux/orderRedux';

const mapStateToProps = state => ({
  options: getOrderOptions (state),
});

export default connect(mapStateToProps)(OrderForm);