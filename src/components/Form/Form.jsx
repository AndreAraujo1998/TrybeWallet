import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { setExpense } from '../../actions';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    const { value, description, currency, method, tag } = this.state;
    const { expenses, addExpenses } = this.props;
    const id = expenses.length;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    addExpenses(expense);
    this.setState(initialState);
  };

  render() {
    const {
      tag,
      currency,
      description,
      value,
      method,
    } = this.state;
    const {
      currencies,
    } = this.props;
    return (
      <form>
        <label htmlFor="valueInput">
          Valor:
          <input
            data-testid="value-input"
            name="value"
            onChange={ this.handleChange }
            type="number"
            value={ value }
            id="value"
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            data-testid="description-input"
            name="description"
            onChange={ this.handleChange }
            type="text"
            value={ description }
            id="description"
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleChange }
            name="currency"
            id="currency"
          >
            {currencies.map((element) => (
              <option key={ element }>{element}</option>
            ))}
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            value={ method }
            onChange={ this.handleChange }
            name="method"
            id="method"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tagInput">
          Categoria
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
            value={ tag }
            id="tagInput"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          id="despesa"
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenses: (state) => {
    dispatch(setExpense(state));
  },
});

Form.propTypes = {
  currencies: Proptypes.arrayOf(Proptypes.any),
  expenses: Proptypes.arrayOf.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Form);
