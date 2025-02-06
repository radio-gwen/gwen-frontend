import styled from "styled-components"

const BoxImageWrapper = styled.div`
    background-color: var(--black);
    height: 250px;
    width: auto;
    overflow: hidden;
    position: relative;

    @media (max-width: 768px) {
        width: 100%;
        height: 250px;
    }
`

const BoxImage = styled.img`
    position: absolute; 
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
`


const ImageCardBox = ({src, alt}) => {

    return(
        <BoxImageWrapper>
            <BoxImage src={src} alt={alt} />
        </BoxImageWrapper>
    )
}

export default ImageCardBox