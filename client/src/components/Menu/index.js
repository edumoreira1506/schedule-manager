import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getMenuLinks } from '../../models/user';

import './index.scss';

const Menu = ({ user }) => {
  const { t } = useTranslation(['common', 'links']);

  return (
    <div className="Menu">
      <div className="Menu__header Flex Flex--align-center Flex--justify-end">
        <p className="Menu__header-text">{t('common:hello', { name: user.name })}</p>
      </div>
      <ul className="Menu__links">
        {getMenuLinks(user).map((link) => (
          <li className="Menu__item">
            <Link to={link.href} className="Menu__link">
              {t(`links:${link.i18nKey}`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

Menu.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Menu;
