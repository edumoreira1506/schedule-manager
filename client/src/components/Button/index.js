import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Button = ({
  onClick,
  children,
  type,
  disabled,
}) => (
  // eslint-disable-next-line react/button-has-type
  <button className="Button" type={type} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
};

export default Button;
