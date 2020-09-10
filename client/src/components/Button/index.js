import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Button = ({
  onClick,
  children,
  type,
  disabled,
  title,
}) => (
  // eslint-disable-next-line react/button-has-type
  <button title={title} className="Button" type={type} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  title: '',
};

export default Button;
