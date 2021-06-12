import "./Category.css";

function Category(props) {
  let iconImg = props.iconImg;
  let iconAlt = props.iconAlt;
  let iconColor = props.iconColor;

  return (
    <div className="categoryIcon" style={{ backgroundColor: iconColor }}>
      <img src={iconImg} alt={iconAlt} />
    </div>
  );
}

export default Category;
