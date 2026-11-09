import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navLinkClass = ({ isActive }) =>
  `nav-link ${isActive ? 'active fw-bold' : ''}`;

function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          MyMedia
        </NavLink>

        <div className="navbar-nav ms-auto flex-row flex-wrap align-items-center gap-3">
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/books" className={navLinkClass}>
            Kitaplarım
          </NavLink>

          <NavLink to="/movies" className={navLinkClass}>
            Filmlerim
          </NavLink>

          <NavLink to="/profile" className={navLinkClass}>
            Profil
          </NavLink>

          <button
            type="button"
            className="btn btn-outline-light btn-sm"
            onClick={logout}
          >
            Çıkış
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;