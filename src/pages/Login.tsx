import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
  const { login, signup, loginWithGoogle, loginWithKakao } = useAuth();

  const [activeTab, setActiveTab] = useState('login');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!loginEmail || !loginPassword) {
        throw new Error('이메일과 비밀번호를 입력해주세요.');
      }

      await login(loginEmail, loginPassword);
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message || '로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!registerEmail || !registerPassword || !registerPasswordConfirm) {
        throw new Error('모든 필드를 입력해주세요.');
      }

      if (registerPassword !== registerPasswordConfirm) {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }

      if (registerPassword.length < 6) {
        throw new Error('비밀번호는 최소 6자 이상이어야 합니다.');
      }

      await signup(registerEmail, registerPassword);
      navigate(from, { replace: true });
    } catch (err) {
      setError((err as Error).message || '회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    setError('');
    try {
      await loginWithGoogle();
    } catch (err) {
      setError((err as Error).message || 'Google 로그인에 실패했습니다.');
    }
  };

  const handleKakaoLogin = async (): Promise<void> => {
    setError('');
    try {
      await loginWithKakao();
    } catch (err) {
      setError((err as Error).message || 'Kakao 로그인에 실패했습니다.');
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h1 className="login-header__title">DB Study</h1>
            <p className="login-header__subtitle">데이터베이스 학습의 새로운 시작</p>
          </div>

          {/* Tabs */}
          <div className="login-tabs">
            <button
              type="button"
              className={`login-tabs__tab ${activeTab === 'login' ? 'login-tabs__tab--active' : ''}`}
              onClick={() => {
                setActiveTab('login');
                setError('');
              }}
            >
              로그인
            </button>
            <button
              type="button"
              className={`login-tabs__tab ${activeTab === 'register' ? 'login-tabs__tab--active' : ''}`}
              onClick={() => {
                setActiveTab('register');
                setError('');
              }}
            >
              회원가입
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="login-error" role="alert">
              <span className="login-error__icon">!</span>
              <span className="login-error__message">{error}</span>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form className="login-form" onSubmit={handleLogin} noValidate>
              <div className="login-form__field">
                <label htmlFor="login-email" className="login-form__label">
                  이메일
                </label>
                <input
                  id="login-email"
                  type="email"
                  className="login-form__input"
                  placeholder="example@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              <div className="login-form__field">
                <label htmlFor="login-password" className="login-form__label">
                  비밀번호
                </label>
                <input
                  id="login-password"
                  type="password"
                  className="login-form__input"
                  placeholder="비밀번호를 입력하세요"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={loading}
              >
                {loading ? '로그인 중...' : '로그인'}
              </button>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form className="login-form" onSubmit={handleRegister} noValidate>
              <div className="login-form__field">
                <label htmlFor="register-email" className="login-form__label">
                  이메일
                </label>
                <input
                  id="register-email"
                  type="email"
                  className="login-form__input"
                  placeholder="example@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              <div className="login-form__field">
                <label htmlFor="register-password" className="login-form__label">
                  비밀번호
                </label>
                <input
                  id="register-password"
                  type="password"
                  className="login-form__input"
                  placeholder="최소 6자 이상"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>

              <div className="login-form__field">
                <label htmlFor="register-password-confirm" className="login-form__label">
                  비밀번호 확인
                </label>
                <input
                  id="register-password-confirm"
                  type="password"
                  className="login-form__input"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={registerPasswordConfirm}
                  onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn--primary btn--full"
                disabled={loading}
              >
                {loading ? '가입 중...' : '회원가입'}
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="login-divider">
            <span className="login-divider__text">또는</span>
          </div>

          {/* Social Login */}
          <button
            type="button"
            className="btn btn--google btn--full"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <svg className="btn__icon" viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google로 계속하기
          </button>

          <button
            type="button"
            onClick={handleKakaoLogin}
            disabled={loading}
            style={{
              marginTop: '8px',
              background: '#FEE500',
              color: '#191919',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
            }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path
                d="M12 3C6.48 3 2 6.36 2 10.44c0 2.62 1.74 4.93 4.36 6.24-.19.7-.69 2.53-.79 2.93-.12.49.18.48.38.35.15-.1 2.44-1.66 3.43-2.33.85.13 1.73.19 2.62.19 5.52 0 10-3.36 10-7.38C22 6.36 17.52 3 12 3z"
                fill="#191919"
              />
            </svg>
            카카오로 계속하기
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
