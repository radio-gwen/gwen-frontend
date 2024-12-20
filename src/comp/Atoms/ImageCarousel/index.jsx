import styled from "styled-components"

const ImageCarousel = ({image, width}) => {

    const ImageWrapper = styled.div`
    background-image: url(${image});
    background-size: cover;
    background-position: center;
    width: ${width};
    height: 300px;
    `

    return(
        <ImageWrapper />
    )
}

export default ImageCarousel