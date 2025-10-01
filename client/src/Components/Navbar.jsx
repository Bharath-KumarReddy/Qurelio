import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const jwt = sessionStorage.getItem("jwt");

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("iv");
    sessionStorage.removeItem("encryptedData");
    navigate("/login");
  };

  // Mobile toggle
  const toggleMenu = () => {
    const navbar = document.getElementById("navbar-default");
    if (navbar) navbar.classList.toggle("hidden");
  };

  // Nav link styles (same as before)
  const navLink =
    "relative text-gray-700 font-medium transition-all duration-300 hover:text-[#18A0A9] after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-[#18A0A9] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full";

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/healthcare 1.svg" alt="logo" className="w-8 h-8" />
          <span className="font-bold text-2xl text-gray-800">Qurelio</span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-600 rounded-lg lg:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Links */}
        <div className="hidden w-full lg:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 items-center">
            <li>
              <Link to="/" className={navLink}>Home</Link>
            </li>
            <li>
              <Link to="/about" className={navLink}>About</Link>
            </li>
            <li>
              <Link to="/diagnoses" className={navLink}>Diagnoses</Link>
            </li>
            <li>
              <Link to="/hospitals" className={navLink}>Hospitals</Link>
            </li>
            <li>
              <Link to="/contact" className={navLink}>Contact Us</Link>
            </li>

            {/* Auth Buttons */}
            {!jwt ? (
              <>
                <li>
                  <Link to="/login" className={navLink}>Login</Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="px-5 py-2 rounded-lg bg-[#18A0A9] text-white font-medium shadow-md hover:bg-[#127f85] hover:scale-105 transition-all"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/changePass" className={navLink}>Change Password</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2 rounded-lg bg-[#18A0A9] text-white font-medium shadow-md hover:bg-[#127f85] hover:scale-105 transition-all"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
