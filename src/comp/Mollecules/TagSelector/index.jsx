import BtnPrimary from '../../Atoms/BtnPrimary'

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
        <>

            <div className='space-large'></div>

            <div className='flex-horiz-center'>

                <BtnPrimary 
                content={'Music'}
                onClick={() => toggleTag('Music')}
                isActive={isActive('Music')}
                />
                <BtnPrimary 
                content={'Talk'}
                onClick={() => toggleTag('Talk')}
                isActive={isActive('Talk')}
                />
            </div>
            </>
    )
}

export default TagSelector