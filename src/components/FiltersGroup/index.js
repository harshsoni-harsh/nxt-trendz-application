import {FaSearch} from 'react-icons/fa'
import './index.css'

const FiltersGroup = props => {
  const {
    ratingsList,
    onRatingChange,
    categoryOptions,
    onCategoryChange,
    changeSearchInput,
    clearFilters,
    enterSearch,
  } = props
  const submitSearch = e => {
    const {value} = e.target
    changeSearchInput(value)
    if (e.key === 'Enter') {
      enterSearch()
    }
  }
  const categoryChange = e => {
    const {id} = e.target
    onCategoryChange(id)
  }
  const ratingChange = e => {
    const {id} = e.target
    onRatingChange(id)
  }
  return (
    <div className="filters-group-container">
      <div className="searchBar">
        <input type="search" placeholder="Search" onKeyDown={submitSearch} />
        <FaSearch />
      </div>
      <h3>Category</h3>
      <ul>
        {categoryOptions.map(category => (
          <li key={category.categoryId}>
            <button
              id={category.categoryId}
              type="button"
              onClick={categoryChange}
            >
              <p>{category.name}</p>
            </button>
          </li>
        ))}
      </ul>
      <h3>Rating</h3>
      <ul>
        {ratingsList.map(rating => (
          <li key={rating.ratingId}>
            <button id={rating.ratingId} onClick={ratingChange} type="button">
              {/* eslint-disable */}
              <img
                src={rating.imageUrl}
                alt={'rating ' + rating.ratingId}
              />{' '}
              &nbsp;
              {' & up'}
              {/* eslint-enable */}
            </button>
          </li>
        ))}
      </ul>
      <button className="btn-primary" type="button" onClick={clearFilters}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
