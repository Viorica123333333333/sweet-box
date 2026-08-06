import { NavLink } from "react-router-dom";
import logoImg from "../assets/images/logo.jpg";

const navigationLinks = [
  { path: "/choose", label: "Shop" },
  { path: "/mix", label: "Build Your Box" },
  { path: "/about", label: "Our Story" },
  { path: "/contact", label: "Contact" },
];

const getNavLinkClass = ({ isActive }) =>
  isActive ? "nav-link active" : "nav-link";

function Navbar({ basketCount = 0 }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <NavLink to="/" className="logo-link" aria-label="Sweet Box home">
        <img src={logoImg} alt="" className="navbar-logo" />
        <span className="navbar-wordmark">
          <strong>Sweet Box</strong>
          <small>MACARONS</small>
        </span>
      </NavLink>

      <div className="links">
        {navigationLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className={getNavLinkClass}>
            {link.label}
          </NavLink>
        ))}

        <NavLink
          to="/checkout"
          className={({ isActive }) =>
            `${getNavLinkClass({ isActive })} checkout-nav-link`
          }
          aria-label={`Checkout, ${basketCount} saved boxes`}
        >
          Basket
          <span className="basket-count">{basketCount}</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
