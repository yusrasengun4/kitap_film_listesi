import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { user, login, register } = useAuth();

  const [mode, setMode] = useState('login'); 
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isRegister = mode === 'register';

  if (user) return <Navigate to="/" replace />;

  function switchMode() {
    setMode(isRegister ? 'login' : 'register');
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (isRegister && password.length < 6) {
      setError('Şifre en az 6 karakter olmalı.');
      return;
    }

    setLoading(true);

    const message = isRegister
      ? await register({ name, username, password })
      : await login(username, password);

    setLoading(false);

    if (message) setError(message);
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h1 className="h4 fw-bold mb-4">
                {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
              </h1>

              {error && (
                <div className="alert alert-danger py-2" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Ad Soyad
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Kullanıcı adı
                  </label>
                  <input
                    id="username"
                    type="text"
                    className="form-control"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label">
                    Şifre
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    autoComplete={isRegister ? 'new-password' : 'current-password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {isRegister ? 'Kayıt Ol' : 'Giriş Yap'}
                </button>
              </form>

              <button
                type="button"
                className="btn btn-link w-100 mt-2"
                onClick={switchMode}
              >
                {isRegister
                  ? 'Zaten hesabın var mı? Giriş yap'
                  : 'Hesabın yok mu? Kayıt ol'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;