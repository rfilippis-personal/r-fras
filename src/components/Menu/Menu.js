import "components/Menu/Menu.scss";
import { Link, useLocation } from "react-router-dom";

const Menu = ({ menuItens, y }) => {
  const location = useLocation().pathname;

  return (
    <div className={"menu-content " + (y > 0 ? "box-shadow-bottom" : "")}>
      {menuItens.map((currentElement) => (
        <Link
          className={currentElement.path === location ? "selected" : ""}
          to={currentElement.path}
          key={currentElement.name}
        >
          {currentElement.name}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
