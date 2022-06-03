import './category-item.component.scss'

const CategoryItem = (props) => {
  const { imageUrl ,title} = props.category
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
       />
        
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>shop now</p>
      </div>
    </div>
  )
}

export default CategoryItem