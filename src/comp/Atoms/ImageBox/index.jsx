import ImageCardBox from "../ImageCardBox"

const ImageBox = ({src}) => {
    return(
        <div className='image-box'>
            <ImageCardBox src={src}/>
        </div>
    )
}

export default ImageBox