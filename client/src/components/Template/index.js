import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

import './index.scss';

const Template = ({ children }) => (
  <div className="Template">
    <div className="Template__header">
      <Header />
    </div>
    <div className="Template__body">
      {children}
    </div>
  </div>
);

Template.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Template;
