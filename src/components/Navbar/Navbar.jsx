import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
const NavBar = () => {
  const { logOut, user } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error));
  };
  // NavBar List Items
  const listItems = (
    <>
      <Link to="/">Home</Link>
      <Link to="/services">Services</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </>
  );

  return (
    <div className="px-5 bg-gray-200">
      <div className="navbar mx-auto p-0">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {listItems}
            </ul>
          </div>
          <div className="flex items-center">
            <Link
              to="/"
              className=" text-2xl uppercase font-semibold text-gray-700"
            >
              Heliverse
              {/* <img className="w-[180px]" src={logo} alt="" /> */}
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal items-center px-1 space-x-6 text-[17px] text-[var(--primary-color)]">
            {listItems}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            {user ? (
              <>
                <div
                  id="parent-user-profile"
                  className="flex items-center gap-x-1"
                >
                  <label
                    id="user-pic"
                    tabIndex={0}
                    className=" btn btn-ghost btn-circle avatar flex-row-reverse"
                  >
                    <div className="w-12 rounded-full">
                      <img
                        src="https://img.freepik.com/free-photo/close-up-portrait-young-man-isolated-black-wall-real-emotions-male-model-smiling-feeling-happy-facial-expression-pure-clear-human-emotions-concept_155003-28037.jpg?w=740&t=st=1700361136~exp=1700361736~hmac=553a8b6ddd2d2bbd082a533d5f3eff889f189b592c6a9e0dd909f8dcdad29cdd"
                        alt="User Avatar"
                      />
                    </div>
                  </label>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link onClick={handleLogout}>Logout</Link>
                  </li>
                </ul>
              </>
            ) : (
              <Link
                to="/login"
                className="custom-btn rounded-md bg-green-400 py-2 px-3 text-lg"
              >
                Login Now
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
