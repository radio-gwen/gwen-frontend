const BtnTertiary = ({content, onClick}) => {
    return(
        <div className='btn-tertiary' onClick = {onClick}>
            {content}
        </div>
    )
}

export default BtnTertiary