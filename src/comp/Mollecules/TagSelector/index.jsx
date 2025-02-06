const TagSelector = ({ activeTags, setActiveTags }) => {

        
        const toggleTag = (tag) => {
            if (activeTags.includes(tag)) {
                setActiveTags(activeTags.filter(t => t !== tag))
            } else {
                setActiveTags([...activeTags, tag])
            }
        }

        const isActive = (tag) => activeTags.includes(tag)


    return(
        <div className='flex-horiz'>
            <div className={`tag-selector ${isActive('Music') ? 'background-cta' : ''}`} onClick={() => toggleTag('Music')}>Music</div>
            <div className={`tag-selector ${isActive('Talk') ? 'background-cta' : ''}`} onClick={() => toggleTag('Talk')}>Talk</div>
        </div>
    )
}

export default TagSelector