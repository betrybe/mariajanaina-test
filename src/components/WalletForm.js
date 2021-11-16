import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ExpenseInput from './myInput'
import { loadCurrencies, handleAdd, handleAfterEdit } from '../actions';
import '../assets/css/walletForm.css';

class WalletForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.afterEdit = this.afterEdit.bind(this);
  }

  async componentDidMount() {
    const { loadCurrencies: loadCurrenciesAction } = this.props;
    await loadCurrenciesAction();
  }

  async handleAdd(event) {
    event.preventDefault();
    event.persist();
    const {
      handleAdd: handleAddAction,
      loadCurrencies: loadCurrenciesAction,
    } = this.props;
    await loadCurrenciesAction();
    handleAddAction();
    event.target.parentNode.reset();
  }

  afterEdit(event) {
    event.preventDefault();
    const { handleAfterEdit: handleAfterEditAction } = this.props;
    handleAfterEditAction();
  }

  render() {
    const { editing, currencies } = this.props;

    const buttonGen = (isEditing) => (
      <button
        type="submit"
        onClick={isEditing ? this.afterEdit : this.handleAdd}
      >
        {isEditing ? 'Editar despesa' : 'Adicionar despesa'}
      </button>
    );

    return (
      <div
        className="form"
        style={editing ? { background: '#2FC18C' } : null}
      >
        <form>
          <ExpenseInput name="value" type="number" label="Valor" />
          <ExpenseInput
            name="currency"
            type="select"
            label="Moeda"
            options={currencies}
          />
          <ExpenseInput
            name="method"
            type="select"
            label="Método de Pagamento"
            options={['Dinheiro', 'Cartão de crédito', 'Cartão de débito']}
          />
          <ExpenseInput
            name="tag"
            type="select"
            label="Categoria"
            options={['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde']}
          />
          <ExpenseInput
            name="description" label="Descrição" />

          {buttonGen(editing)}
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]))
    .isRequired,
  loadCurrencies: PropTypes.func.isRequired,
  handleAfterEdit: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  editing: PropTypes.bool,
};

WalletForm.defaultProps = {
  editing: false,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editing: state.wallet.editing,
});

const mapDispatchToProps = {
  loadCurrencies,
  handleAdd,
  handleAfterEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
