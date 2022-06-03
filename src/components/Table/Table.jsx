import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../../actions/index';

class Table extends React.Component {
  render() {
    const { expenses, deleteEx } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses.map(({
            id, tag, value, description, currency, method, exchangeRates,
          }, index) => (
            <tr key={ id }>
              <td>
                { description }
              </td>
              <td>
                { tag }
              </td>
              <td>
                { method }
              </td>
              <td>
                { (+value).toFixed(2) }
              </td>
              <td>
                { exchangeRates[currency].name }
              </td>
              <td>
                { (+exchangeRates[currency].ask).toFixed(2) }
              </td>
              <td>
                { (value * exchangeRates[currency].ask).toFixed(2) }
              </td>
              <td>
                Real
              </td>
              <td>
                <button
                  type="button"
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => {
                    deleteEx(index);
                    console.log('entrou');
                  } }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteEx: (expense) => {
    dispatch(deleteExpense(expense));
  },
});

Table.propTypes = {
  expenses: PropTypes.arrayOf().isRequired,
  deleteEx: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
