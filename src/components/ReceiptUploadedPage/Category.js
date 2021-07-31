import "./Category.css";

function Category(props) {
  const { iconAlt, color, iconImg, clickEvent } = props;

  return (
    <div
      className="categoryIcon"
      style={{ backgroundColor: color }}
      onClick={clickEvent}
    >
      <img src={iconImg} alt={iconAlt} />
    </div>
  );
}

export default Category;
