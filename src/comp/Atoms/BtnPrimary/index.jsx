const BtnPrimary = ({content, onClick, isActive}) => {
    return(
        <div className={`btn-primary ${isActive ? 'active' : ''}`} onClick={onClick}>
            {content}
        </div>
    )
}


export default BtnPrimary