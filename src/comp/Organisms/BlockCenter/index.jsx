const BlockCenter = ( {children, background} ) => {
    return (
        <div className= {`block-center ${background}`}  >
            {children}
        </div>
    )
}

export default BlockCenter