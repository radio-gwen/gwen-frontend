const BtnCTA = ({btnContent, onSubmit}) => {
    return(
        <button className='btn-cta' onSubmit={onSubmit}>
            {btnContent}
        </button>
    )
}

export default BtnCTA