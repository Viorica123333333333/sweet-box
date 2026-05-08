import { NavLink } from "react-router-dom";

/* --- Main navigation links used across the website --- */
const navigationLinks = [
  { path: "/choose", label: "Choose Box" },
  { path: "/mix", label: "Mix Flavours" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

/* --- Applies active styling to the current page link --- */
const getNavLinkClass = ({ isActive }) =>
  isActive ? "nav-link active" : "nav-link";

function Navbar({ basketCount }) {
  return (
    <nav className="navbar">
      {/* --- Website home link / brand area --- */}
      <NavLink to="/" className="logo-link">
        Home
      </NavLink>

      {/* --- Main page navigation --- */}
      <div className="links">
        {navigationLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className={getNavLinkClass}>
            {link.label}
          </NavLink>
        ))}

        {/* --- Checkout link shows a visual indicator when the basket has items --- */}
        <NavLink to="/checkout" className={getNavLinkClass}>
          Checkout
          {basketCount > 0 && <span className="basket-dot"></span>}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
