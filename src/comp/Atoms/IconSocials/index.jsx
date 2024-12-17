const IconSocials = ({svg, size}) => {
    return(
        <div
        style={{
            height: size,
            width: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            {svg}
        </div>
    )
}

export default IconSocials