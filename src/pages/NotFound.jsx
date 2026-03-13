import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found-page">
    <div className="not-found-content">
      <div className="not-found-code">404</div>
      <h2 className="not-found-title">페이지를 찾을 수 없습니다</h2>
      <p className="not-found-desc">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <div className="not-found-actions">
        <Link to="/" className="not-found-btn primary">홈으로 이동</Link>
        <Link to="/sql" className="not-found-btn secondary">SQL 학습</Link>
      </div>
    </div>
  </div>
);

export default NotFound;
