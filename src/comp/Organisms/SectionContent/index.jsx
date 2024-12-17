const SectionContent = ({children, backgroundColor, color='var(--black)'}) => {
    return(
        <div 
        className='section-content flex-vert-center'
        style={{backgroundColor: backgroundColor, color: color}}
        >
            {children}
        </div>
    )
}

export default SectionContent