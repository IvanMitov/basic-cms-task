export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

const receiveCategories = (json) => ({
  type: RECEIVE_CATEGORIES,
  categories: json.map(category => category),
});

export const fetchCategories = () => (dispatch, getState, {categoryApi}) => {
  const json = categoryApi.getCategories();
  dispatch(receiveCategories(json));
};
