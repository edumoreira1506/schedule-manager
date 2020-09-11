import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Input from '../Input';
import './index.scss';

const Form = ({
  onSubmit,
  inputs,
  buttonText,
  customFields,
  buttonSelector,
}) => (
  <form className="Form Flex Flex--justify-center Flex--align-center Flex--vertical-alignment" onSubmit={onSubmit}>
    {inputs.map((input) => (input.hide ? null : (
      <div className="Form__area" key={input.placeholder}>
        <Input
          className="Form__input"
          {...input}
        />
      </div>
    )))}
    {customFields.map((field) => <div className="Form__area" key={field}>{field}</div>)}
    <div className="Form__submit-button">
      <Button onClick={onSubmit} type="submit" selector={buttonSelector}>
        {buttonText}
      </Button>
    </div>
  </form>
);

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  inputs: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    placeholder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    hide: PropTypes.bool,
  })),
  buttonText: PropTypes.string.isRequired,
  customFields: PropTypes.arrayOf(PropTypes.node),
  buttonSelector: PropTypes.string,
};

Form.defaultProps = {
  inputs: [],
  customFields: [],
  buttonSelector: '',
};

export default Form;
