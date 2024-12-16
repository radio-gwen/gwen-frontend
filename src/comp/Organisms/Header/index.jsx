import { Link } from "react-router-dom";

function Header({ isNavOpen, setIsNavOpen, isMobile }) {

  const handleNavClick = () => {
    if (isNavOpen && isMobile) {
      setIsNavOpen(false); // Close the nav menu
    }
  }

  return (
    <nav className={isNavOpen && isMobile ? "active" : ""}>
      <ul onClick={handleNavClick}>
        <Link to="/transmissions">
          <li key="transmissions">Transmissions</li>
        </Link>
        <Link to="/events">
          <li key="events">Events</li>
        </Link>
        <Link to="/about">
          <li key="about">About</li>
        </Link>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
