import React from 'react';
import Template from '../components/Template';

const withTemplate = (children) => (
  <Template>
    {children}
  </Template>
);

export default withTemplate;
