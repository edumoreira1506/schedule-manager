import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Input from '../Input';
import './index.scss';

const Form = ({ onSubmit, inputs, buttonText }) => (
  <form className="Form Flex Flex--justify-center Flex--align-center Flex--vertical-alignment" onSubmit={onSubmit}>
    {inputs.map((input) => (
      <div className="Form__area" key={input.placeholder}>
        <Input
          className="Form__input"
          value={input.value}
          type={input.type}
          onChange={input.onChange}
          placeholder={input.placeholder}
        />
      </div>
    ))}
    <div className="Form__submit-button">
      <Button onClick={onSubmit}>
        {buttonText}
      </Button>
    </div>
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  })),
  buttonText: PropTypes.string.isRequired,
};

Form.defaultProps = {
  inputs: [],
};

export default Form;
