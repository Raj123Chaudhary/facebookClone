import { Link } from "react-router-dom";

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT

    // redirect to login
    window.location.href = "/login";
  };
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>MyFacebook</h2>

      <div>
        <Link to="/" style={styles.link}>
          Feed
        </Link>
        <Link to="/dashboard" style={styles.link}>
          Dashboard
        </Link>
        <Link to={"/login"}>
          <button style={styles.btn}>Login</button>
        </Link>
        <Link to={"/signup"}>
          <button style={styles.btn}>Signup</button>
        </Link>
        <Link to={"/login"}>
          <button onClick={handleLogout} style={styles.btn}>
            Logout
          </button>
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#5a5fcf",
    color: "white",
  },
  logo: { fontWeight: "bold" },
  link: {
    marginRight: "15px",
    color: "white",
    textDecoration: "none",
  },
  btn: {
    marginLeft: "10px",
    padding: "5px 10px",
    border: "none",
    cursor: "pointer",
  },
};

export default Navbar;
