import Section from "../../comp/Templates/Section"
import Toogle from "../../comp/Organisms/Toogle"
import H1 from "../../comp/Atoms/H1"


const Board = () =>{
    return(
        <Section className='background-primary'>

            

            <H1 content='Transmissions'/>
            <div className='line'></div>

                <Toogle title='all transmissions'>
                </Toogle>
                <div className='line'></div>
                <Toogle title='new transmission'>
                </Toogle>
            
            <div className='line'></div>
            <H1 content='Events'/>
            <div className='line'></div>


                <Toogle title='all events'>
                </Toogle>
                <div className='line'></div>
                <Toogle title='new event'>
                </Toogle>

            <div className='line'></div>
            <H1 content='Contents'/>
            <div className='line'></div>

                <Toogle title='about'>
                </Toogle>
                <div className='line'></div>
                <Toogle title='partners'>
                </Toogle>
                <div className='line'></div>
                <Toogle title='tags'>
                </Toogle>
            
        </Section>
    )
}

export default Board