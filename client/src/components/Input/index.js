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
  selector,
}) => (type === 'radio' ? (
  <div className="InputWrapper Flex Flex--justify-center Flex--align-center">
    <label className="Input__label">{placeholder}</label>
    <input
      className="Input"
      type={type}
      checked={value}
      onClick={onChange}
      onChange={onChange}
      data-input={selector}
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
    data-input={selector}
  />
));

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  type: PropTypes.node.isRequired,
  placeholder: PropTypes.string.isRequired,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  selector: PropTypes.string,
};

Input.defaultProps = {
  value: '',
  onFocus: () => {},
  onBlur: () => {},
  selector: '',
};

export default Input;
