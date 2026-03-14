import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import site from '../../config/site';

const Footer = () => {
  const { t } = useLanguage();

  const handleFamilySite = (e) => {
    const url = e.target.value;
    if (url) {
      window.open(url, '_blank', 'noopener');
      e.target.value = '';
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-info">
          <div className="info-section">
            <h3>
              {site.brand.parts.map((part, i) => (
                <span key={i} className={part.className}>{part.text}</span>
              ))}
            </h3>
            <p>{t('footer.tagline')}</p>
            <div className="footer-family">
              <select onChange={handleFamilySite} defaultValue="">
                <option value="" disabled>Family Site</option>
                {site.familySites.map((s, i) => (
                  <option key={i} value={s.url}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="info-section">
            <h4>연락처</h4>
            <p>📧 <a href="mailto:aebon@dreamitbiz.com" style={{ color: 'inherit', textDecoration: 'none' }}>aebon@dreamitbiz.com</a></p>
            <p>📞 <a href="tel:010-3700-0629" style={{ color: 'inherit', textDecoration: 'none' }}>010-3700-0629</a></p>
            <p>💬 카카오톡: aebon</p>
            <p className="business-hours">🕐 평일 09:00 ~ 18:00</p>
          </div>

          <div className="info-section">
            <h4>{t('footer.quickLinks')}</h4>
            <ul className="footer-quick-links">
              {site.footerLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.path}>{t(link.labelKey)}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 드림아이티비즈(DreamIT Biz). All rights reserved.</p>
          <p className="footer-meta">
            Designed by Ph.D Aebon Lee
            <span className="footer-divider">|</span>
            대표이사: 이애본
            <span className="footer-divider">|</span>
            사업자등록번호: 601-45-20154
            <span className="footer-divider">|</span>
            통신판매신고번호: 제2024-수원팔달-0584호
            <span className="footer-divider">|</span>
            출판사 신고번호: 제2026-000026호
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
