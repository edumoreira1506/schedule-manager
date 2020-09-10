/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import turnOffIcon from '../../assets/images/icons/turn-off.svg';
import * as LocalStorage from '../../services/LocalStorage';
import Menu from '../Menu';
import useStore from '../../hooks/useStore';

import './index.scss';

const Header = () => {
  const { t } = useTranslation('common');
  const [showMenu, setShowMenu] = useState(false);
  const [user] = useStore('user');
  const history = useHistory();

  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = () => {
    LocalStorage.clear();
    history.push('/');
  };

  return (
    <header className="Header Flex Flex--align-center Flex--justify-center">
      <div className="Header__wrapper Flex Flex--align-center Flex--justify-around">
        <button type="button" className={`Header__menu-icon ${showMenu ? 'Header__menu-icon--opened' : ''}`} onClick={toggleMenu} />
        <p className="Header__title">{t('title')}</p>
        <figure className="Header__turn-off-icon-wrapper Flex Flex--align-center Flex--justify-center" onClick={handleLogout}>
          <img src={turnOffIcon} className="Header__turn-off-icon" alt="Turn off" />
        </figure>
      </div>
      <div className={`Header__menu ${showMenu ? 'Header__menu--opened' : ''}`}>
        <Menu user={user} />
      </div>
    </header>
  );
};

export default Header;
