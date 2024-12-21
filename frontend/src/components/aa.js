import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation(); // Lấy hàm i18n từ react-i18next

  return (
    <section>
      {/* Nút để chuyển đổi ngôn ngữ sang tiếng Anh */}
      <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
      
      {/* Nút để chuyển đổi ngôn ngữ sang tiếng Việt */}
      <Button onClick={() => i18n.changeLanguage('vi')}>Tiếng Việt</Button>
    </section>
  );
};

export default LanguageSwitcher;
