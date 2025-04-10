import search from '../../../assets/images/icons/search'

const SearchBar = ({searchTerm, setSearchTerm}) => {
    return(
        <span>
            {search}
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </span>
    )
}

export default SearchBar