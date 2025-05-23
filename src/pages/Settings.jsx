
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [language, setLanguage] = useState('ar');
  const [currency, setCurrency] = useState('EGP');
  const [darkMode, setDarkMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {

    const localSettings = localStorage.getItem('adminSettings');
    if (localSettings) {
      const admin = JSON.parse(localSettings);
      setEmail(admin.email);
      setPassword(admin.password);
      setLanguage(admin.language);
      setCurrency(admin.currency);
      setDarkMode(admin.darkMode);
      i18n.changeLanguage(admin.language);
    } else {
      const fetchAdmin = async () => {
        try {
          const res = await axios.get('http://localhost:5000/admin');
          const admin = res.data;
          setEmail(admin.email);
          setPassword(admin.password);
          setLanguage(admin.language);
          setCurrency(admin.currency);
          setDarkMode(admin.darkMode);
          i18n.changeLanguage(admin.language);
  
          localStorage.setItem('adminSettings', JSON.stringify(admin));
        } catch (error) {
          console.error('فشل تحميل بيانات الأدمن', error);
        }
      };
      fetchAdmin();
    }

    setTimeout(() => setShowForm(true), 100);
  }, [i18n]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const handleSave = async () => {
    const updatedSettings = {
      email,
      password,
      language,
      currency,
      darkMode,
    };

    try {
      await axios.patch('http://localhost:5000/admin', updatedSettings);
      localStorage.setItem('adminSettings', JSON.stringify(updatedSettings));
      alert(t('save') + ' ✅');
    } catch (err) {
      console.error('فشل في حفظ التعديلات', err);
    }
  };

  return (
    <div
      className={`w-full flex flex-col items-center transition-all duration-700 ease-in-out transform ${
        showForm ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
      } bg-white text-black rounded-md shadow-lg max-w-xl mx-auto p-6`}
    >
      <h2 className="text-2xl font-bold mb-6 text-amber-700 uppercase">
        {t('account_settings')}
      </h2>

      <div className="w-full mb-4">
        <label className="block mb-1 font-semibold">{t('email')}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 dark:text-white transform-colors duration-300"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block mb-1 font-semibold">{t('password')}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 dark:text-white transform-colors duration-300"
        />
      </div>

      <div className="w-full mb-4">
        <label className="block mb-1 font-semibold">{t('language')}</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 dark:text-white transform-colors duration-300"
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
        </select>
      </div>

      <div className="w-full mb-4">
        <label className="block mb-1 font-semibold">{t('currency')}</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-3 border rounded bg-white dark:bg-gray-800 dark:text-white transform-colors duration-300"
        >
          <option value="EGP">جنيه مصري</option>
          <option value="USD">دولار</option>
        </select>
      </div>

      <div className="w-full mb-4 flex justify-between items-center">
        <span className="font-semibold">{t('dark_mode')}</span>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={(e) => setDarkMode(e.target.checked)}
          className="form-checkbox h-5 w-5 text-blue-500"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded"
      >
        {t('save')}
      </button>
    </div>
  );
}
