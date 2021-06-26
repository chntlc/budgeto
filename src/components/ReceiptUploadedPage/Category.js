import "./Category.css";

function Category(props) {
  const { iconImg, iconAlt, iconColour, clickEvent } = props;

  return (
    <div
      className="categoryIcon"
      style={{ backgroundColor: iconColour }}
      onClick={clickEvent}
    >
      <img src={iconImg} alt={iconAlt} />
    </div>
  );
}

export default Category;
