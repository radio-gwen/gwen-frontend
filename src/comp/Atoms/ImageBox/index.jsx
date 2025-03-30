import ImageCardBox from "../ImageCardBox"

const ImageBox = ({src, onClick}) => {
    return(
        <div className='image-box' onClick={onClick}>
            <ImageCardBox src={src}/>
        </div>
    )
}

export default ImageBox