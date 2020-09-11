import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Button = ({
  onClick,
  children,
  type,
  disabled,
  title,
  testId,
}) => (
  <button title={title} data-testid={testId} className="Button" type={type} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['button', 'submit']),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  title: PropTypes.string,
  testId: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  title: '',
  testId: '',
};

export default Button;
