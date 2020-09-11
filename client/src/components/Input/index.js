import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';

const Input = ({
  onChange,
  value,
  type,
  placeholder,
  onBlur,
  onFocus,
}) => (type === 'radio' ? (
  <div className="InputWrapper Flex Flex--justify-center Flex--align-center">
    <label className="Input__label">{placeholder}</label>
    <input
      className="Input"
      type={type}
      checked={value}
      onClick={onChange}
      onChange={onChange}
    />
  </div>
) : (
  <input
    className="Input"
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    autoComplete="off"
    placeholder={placeholder}
    onFocus={onFocus}
    onBlur={onBlur}
  />
));

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

Input.defaultProps = {
  value: '',
  onFocus: () => {},
  onBlur: () => {},
};

export default Input;
