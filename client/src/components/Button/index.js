import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Button = ({ onClick, children, type }) => (
  // eslint-disable-next-line react/button-has-type
  <button className="Button" type={type} onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  type: 'text',
};

export default Button;
