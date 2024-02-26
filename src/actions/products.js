import moment from 'moment';
import { productApi } from '../gateways/ProductApi';
import {generateId} from '../utils';

export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  productId: id,
});

export const updateProduct = (id, data) => ({
  type: UPDATE_PRODUCT,
  productId: id,
  data,
});

export const createProduct = (data) => ({
  type: CREATE_PRODUCT,
  data,
});

const receiveProducts = (json) => ({
  type: RECEIVE_PRODUCTS,
  products: json.map(product => product),
});

export const fetchProducts = () => dispatch => {
  const json = productApi.getProducts();
  dispatch(receiveProducts(json));
};

export const updateProductForm = (id, data) => (dispatch, getState, {history}) => {
  dispatch(updateProduct(id, data));
  history.push('/');
}

export const createProductForm = (data) => (dispatch, getState, {history}) => {
  dispatch(createProduct({...data, id: generateId(), createdAt: moment().format()}));
  history.push('/');
}
