// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const GET_CURRENCIES = 'GET_CURRENCIES';
const ADD_EXPENSES = 'ADD_EXPENSES';
const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const stateDefault = {
  currencies: [],
  expenses: [],
};

export const wallet = (state = stateDefault, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.payload] };
  case DELETE_EXPENSE:
    return { ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload) };
  default:
    return { ...state };
  }
};
export default wallet;
