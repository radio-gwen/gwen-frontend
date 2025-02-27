const BtnPrimary = ({content, onClick}) => {
    return(
        <div className='btn-primary' onClick={onClick}>
            {content}
        </div>
    )
}


export default BtnPrimary