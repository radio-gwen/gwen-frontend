const BtnIcon = ({icon, onClick, isNeg}) => {

    const style = {
        color: isNeg ? 'var(--white)' : 'var(--black)',
    };

    return(
        <div className='btn-icon' onClick={onClick} isNeg={false}>
            <span style={style}>{icon}</span>
        </div>
    )
}

export default BtnIcon