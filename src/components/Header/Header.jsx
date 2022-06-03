import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  calculateTotalValue = () => {
    const { expenses } = this.props;
    const result = expenses.reduce((acc, initialValue) => {
      const { currency, value } = initialValue;
      const rate = initialValue.exchangeRates[currency].ask;
      return acc + (value * rate);
    }, 0); // Acc irá começar com 0
    return result.toFixed(2); // Formatando valor para duas casas após a vírgula
  }

  render() {
    const { email } = this.props;
    return (
      <div className="header">
        <section>

          <div className="header-email" data-testid="email-field">
            {`Email: ${email}`}
          </div>

          <div className="header-despesa" data-testid="total-field">
            { this.calculateTotalValue() }
          </div>

          <div className="header-cambio" data-testid="header-currency-field">
            BRL
          </div>
        </section>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf().isRequired,
};

export default connect(mapStateToProps)(Header);
