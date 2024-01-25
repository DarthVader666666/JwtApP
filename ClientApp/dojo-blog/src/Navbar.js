import { Link } from "react-router-dom";

const Navbar = () => {
  const name = sessionStorage.getItem("user_name");

  return (
    <nav className="navbar">
      <h1>The Dojo Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>New Blog</Link>
        <Link to="/login">{name ? name : "Log In"}</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;