const ParagraphCenter = ({children, title, text}) => {
    return(
        <div className="flex-vert-center">
            <h2>{title}</h2>
            <p>{text}</p>
            {children}
        </div>
    )
}

export default ParagraphCenter