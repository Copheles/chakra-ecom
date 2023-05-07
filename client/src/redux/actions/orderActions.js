import axios from 'axios';
import { setError, shippingAddressAdd, clearOrder } from '../slices/order';

export const setShippingAddress = (data) => (dispatch) => {
  dispatch(shippingAddressAdd(data))
}

export const setShippingAddressError = (value) => (dispatch) => {
  dispatch(setError(value))
}


export const createOrder = (order) => async (dispatch, getState) => {
  const {
    order: {shippingAddress},
    user: { userInfo },
  } = getState();

  const prepareOrder = {...order, shippingAddress};
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      },
    };
    const { data } = await axios.post('/api/orders', prepareOrder, config)
  } catch (error) {
    dispatch(
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
           ? error.message
          : "An unexpected error has occured.Please try again later"
      )
    );
  }
}

export const resetOrder = () => async (dispatch) => {
  dispatch(clearOrder());
};