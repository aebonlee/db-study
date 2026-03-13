import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { useLanguage } from '../../contexts/LanguageContext';
import site from '../../config/site';

const COLOR_OPTIONS = [
  { name: 'blue', color: '#0046C8' },
  { name: 'red', color: '#C8102E' },
  { name: 'green', color: '#00855A' },
  { name: 'purple', color: '#8B1AC8' },
  { name: 'orange', color: '#C87200' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const location = useLocation();
  const { mode, toggleTheme, colorTheme, setColorTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const menuItems = site.menuItems.map((item) => ({
    ...item,
    label: t(item.labelKey),
    dropdown: item.dropdown
      ? item.dropdown.map((sub) => ({ ...sub, label: t(sub.labelKey) }))
      : undefined
  }));

  const isActive = (item) => {
    const checkPath = item.activePath || item.path;
    if (checkPath === '/') return location.pathname === '/';
    return location.pathname.startsWith(checkPath);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="nav-wrapper">
          <div className="logo">
            <Link to="/">
              <h1>
                {site.brand.parts.map((part, i) => (
                  <span key={i} className={part.className}>
                    {part.text}
                  </span>
                ))}
              </h1>
            </Link>
          </div>

          <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`${item.dropdown ? 'nav-item-dropdown' : ''} ${activeDropdown === index ? 'active' : ''}`}
                onMouseEnter={() => item.dropdown && setActiveDropdown(index)}
                onMouseLeave={() => item.dropdown && setActiveDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive(item) ? 'active' : ''}`}
                      onClick={(e) => {
                        if (window.innerWidth <= 1100) {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === index ? null : index);
                        }
                      }}
                    >
                      {item.label}
                    </Link>
                    <ul className={`dropdown-menu ${activeDropdown === index ? 'active' : ''}`}>
                      {item.dropdown.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subItem.path}>{subItem.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link to={item.path} className={`nav-link ${isActive(item) ? 'active' : ''}`}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="lang-switcher" onClick={toggleLanguage} aria-label={language === 'ko' ? 'Switch to English' : '한국어로 전환'}>
              {language === 'ko' ? 'EN' : 'KR'}
            </button>
            <div className="color-picker-wrapper">
              <button
                className="color-picker-btn"
                onClick={() => setShowColorPicker(!showColorPicker)}
                aria-label="Color theme"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="13.5" cy="6.5" r="2.5" style={{ fill: '#C8102E', stroke: 'none' }} />
                  <circle cx="17.5" cy="10.5" r="2.5" style={{ fill: '#C87200', stroke: 'none' }} />
                  <circle cx="8.5" cy="7.5" r="2.5" style={{ fill: '#00855A', stroke: 'none' }} />
                  <circle cx="6.5" cy="12" r="2.5" style={{ fill: '#0046C8', stroke: 'none' }} />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.04-.24-.3-.39-.65-.39-1.04 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.17-4.5-9-10-9z" />
                </svg>
              </button>
              {showColorPicker && (
                <>
                  <div className="color-picker-overlay" onClick={() => setShowColorPicker(false)} />
                  <div className="color-picker-tooltip">
                    <div className="color-picker-arrow" />
                    {COLOR_OPTIONS.map((c) => (
                      <button
                        key={c.name}
                        className={`color-dot${colorTheme === c.name ? ' active' : ''}`}
                        style={{ background: c.color }}
                        onClick={() => { setColorTheme(c.name); setShowColorPicker(false); }}
                        aria-label={`${c.name} theme`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="테마 전환" data-mode={mode}>
              <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg className="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
              <svg className="auto-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" opacity="0.3" />
                <circle cx="12" cy="12" r="4" />
                <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              </svg>
            </button>
            <button
              className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="메뉴 토글"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
