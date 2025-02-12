const BtnCTA = ({btnContent, onSubmit, onClick}) => {
    return(
        <button className='btn-cta' onSubmit={onSubmit} onClick={onClick}>
            {btnContent}
        </button>
    )
}

export default BtnCTA