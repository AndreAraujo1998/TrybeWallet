import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { savedEmailAction } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isValid: false,
    };
  }

  checkPassword = (password) => {
    const magicNumber = 6;
    if (password.length >= magicNumber) return true;
    return false;
  }

  allowLoginBtn = () => {
    const { email, password } = this.state;
    if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    && this.checkPassword(password)) {
      this.setState({
        isValid: true,
      });
    } else {
      this.disableLoginBtn();
    }
  }

  disableLoginBtn = () => {
    const { email, password } = this.state;
    if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
    && this.checkPassword(password)) {
      this.setState({
        isValid: true,
      });
    } else {
      this.setState({
        isValid: false,
      });
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState(
      {
        [name]: value,
      },
      this.allowLoginBtn,
    );
  }

  handleClick = (event, email) => {
    event.preventDefault(); // Revisar
    const { history, saveEmail } = this.props;
    saveEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isValid } = this.state;
    return (
      <main>
        <header>TrybeWallet</header>
        <div>
          <form>
            <input
              data-testid="email-input"
              placeholder="Digite seu email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
            <input
              placeholder="Digite sua senha"
              name="password"
              type="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              name="loginBtn"
              disabled={ !isValid }
              onClick={ (event) => this.handleClick(event, email) }
            >
              Entrar
            </button>
          </form>
        </div>
      </main>

    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  saveEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => {
    dispatch(savedEmailAction(email));
  },
});

export default connect(null, mapDispatchToProps)(Login);
