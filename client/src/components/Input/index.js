import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Input = ({
  onChange,
  value,
  type,
  placeholder,
}) => (type === 'radio' ? (
  <div className="InputWrapper Flex Flex--justify-center Flex--align-center">
    <label className="Input__label">{placeholder}</label>
    <input
      className="Input"
      type={type}
      checked={value}
      onClick={onChange}
    />
  </div>
) : (
  <input
    className="Input"
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
));

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
};

Input.defaultProps = {
  value: '',
};

export default Input;
