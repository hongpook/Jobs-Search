import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className='container'>
      <div className=''>
        <select
          value={i18n.language}
          onChange={handleChangeLanguage}
          
        >
          <option value="en">English</option>
          <option value="vi">Vietnamese</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
