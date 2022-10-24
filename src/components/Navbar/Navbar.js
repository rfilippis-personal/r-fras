import Menu from "components/Menu/Menu";
import "components/Navbar/Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = ({ menuItens, y }) => {
  return (
    <>
      <div className="navbar-content">
        <div className="logo">
          <Link to="/">R-fras</Link>
        </div>
        <div className="avatar">R</div>
      </div>
      <Menu menuItens={menuItens} y={y} />
    </>
  );
};

export default Navbar;
