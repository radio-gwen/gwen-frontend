const BtnIcon = ({icon, onClick}) => {
    return(
        <div className='btn-icon' onClick={onClick}>
            {icon}
        </div>
    )
}

export default BtnIcon