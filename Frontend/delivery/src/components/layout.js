import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
            <Link to="/">Home</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
            <Link to="/Account">My account</Link>
            <Link to="/Order">Precise order</Link>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;