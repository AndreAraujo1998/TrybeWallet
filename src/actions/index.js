const SAVED_EMAIL = 'SAVED_EMAIL';
const GET_CURRENCIES = 'GET_CURRENCIES';
const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
const ADD_EXPENSES = 'ADD_EXPENSES';
const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const savedEmailAction = (email) => ({
  type: SAVED_EMAIL,
  payload: email,
});

export const getCurrenciesAction = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const requestCurrenciesAction = () => ({
  type: REQUEST_CURRENCIES,
});

const fetchCurrencies = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  delete data.USDT;
  return data;
};

export const fetchCurrenciesThunk = () => async (dispatch) => {
  dispatch(requestCurrenciesAction());
  try {
    const currencies = await fetchCurrencies();
    const currenciesResponse = Object.keys(currencies);
    dispatch(getCurrenciesAction(currenciesResponse));
  } catch (error) {
    return dispatch(error);
  }
};

const addExpenses = (payload) => ({
  type: ADD_EXPENSES,
  payload,
});

export const setExpense = (walletState) => async (dispatch) => { // Callback anonima
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  const payload = { ...walletState, exchangeRates: { ...data } };
  dispatch(addExpenses(payload));
};

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});
