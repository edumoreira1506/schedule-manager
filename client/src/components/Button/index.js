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
  selector,
}) => (
  <button data-element={selector} title={title} data-testid={testId} className="Button" type={type} onClick={onClick} disabled={disabled}>
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
  selector: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  title: '',
  testId: '',
  selector: '',
};

export default Button;
