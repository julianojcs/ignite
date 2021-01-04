//Styling and Animation
import styled from 'styled-components'
import { motion } from 'framer-motion'

const Game = ({ name, released, image, id }) => {
  return (
    <StyledGame>
      <h3>{name}</h3>
      <h5>{id}</h5>
      <p>Release date: {released}</p>
      <img src={image} alt={'Image thumb for "' + name + '".'} />
    </StyledGame>
  )
}

const StyledGame = styled(motion.div)`
  min-height: 30vh;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  border-radius: 1rem;
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`

export default Game
