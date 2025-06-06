import styled from "styled-components"

const BoxImageWrapper = styled.div`
    background-color: var(--black);
    height: auto;
    width: 250px;
    overflow: hidden;
    position: relative;

    @media (max-width: 768px) {
        width: 100%;
        height: 300px;
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


const ImageIdBox = ({src, alt}) => {

    return(
        <BoxImageWrapper>
            <BoxImage src={src} alt={alt} />
        </BoxImageWrapper>
    )
}

export default ImageIdBox