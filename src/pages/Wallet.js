import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header/Header';
import Form from '../components/Form/Form';
import { fetchCurrenciesThunk } from '../actions';
import Table from '../components/Table/Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <Header />
        <section>
          <Form
            currencies={ currencies }
            handleChange={ this.handleChange }
          />
        </section>
        <section>
          <Table />
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => {
    dispatch(fetchCurrenciesThunk());
  },
});

Wallet.propTypes = {
  currencies: PropTypes.string.isRequired,
  getCurrencies: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
