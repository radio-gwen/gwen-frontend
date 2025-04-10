import { useState, useRef, useEffect } from "react"
import { Link } from 'react-router-dom';
import search from '../../../assets/images/icons/search'

const  SearchExpanding = () => {


    const [isOpen, setIsOpen] = useState(false)
    const [query, setQuery] = useState('')
    const searchRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (searchRef.current && !searchRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        };
    
        if (isOpen) {
          document.addEventListener("mousedown", handleClickOutside);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpen]);

      const handleSearchClick = () => {
        if (isOpen) {
            console.log('something is happening')
        } else {
            setIsOpen(true);
            searchRef.current.focus();
        }
    };


    return(
        <div className='search-line'>

                <input 
                    ref={searchRef}
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Search...'

                    style={{ width: isOpen ? "150px" : "0px", overflow: "hidden", transition: '1s' }}
                />

            {isOpen ? (
                <Link to={`/search?query=${encodeURIComponent(query)}`}>
                <button
                    onClick={handleSearchClick}
                    style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                    {search}
                </button>
                </Link>
            ) : (
                <button
                onClick={setIsOpen(true)}
                style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                {search}
                </button>
            )}
        



        </div>
    )
}

export default SearchExpanding