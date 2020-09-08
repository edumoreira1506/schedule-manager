import React from 'react';
import PropTypes from 'prop-types';
import { I18nextProvider } from 'react-i18next';
import i18n from '../config/i18n';

const I18nContainer = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    {children}
  </I18nextProvider>
);

I18nContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default I18nContainer;
