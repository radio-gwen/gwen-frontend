import ImageCarousel from "../../Atoms/ImageCarousel"
import styled from "styled-components"

const Carousel = ({image, width}) => {

    const CarouselBox = styled.div`
        position: relative;
        overflow: hidden;
    `

    const Slider = styled.div`
        display: flex;
        flex-direction: row;

    `

    return(
        <CarouselBox>
            <Slider>
                <ImageCarousel image={image} width='33.333%'/>
                <ImageCarousel image={image} width='33.333%'/>
                <ImageCarousel image={image} width='33.333%'/>
            </Slider>
        </CarouselBox>
    )
}

export default Carousel