import "./SimpleListItem.scss";

const SimpleListItem = ({ title, name, body, email, children }) => {
  return (
    <div className="simple-list-container">
      {title && <div className="simple-list-title">{title}</div>}
      {name && <div className="simple-list-title">{name}</div>}
      <div className="simple-list-body">{body}</div>
      {email && <div className="simple-list-email">Coment from {email}</div>}

      {children}
    </div>
  );
};

export default SimpleListItem;
