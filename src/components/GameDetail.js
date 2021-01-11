//Styling and Animation
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
// import { useSelector } from 'react-redux'
import axios from 'axios'
import { gameDetailsURL, gameScreenshotURL } from '../api'

const GameDetail = ({id}) => {
  const [gameDetail, setGameDetail] = useState({
    game: {},
    screen: {}
  })

  const loadDetail = async (id) => {
    const detailData = await axios.get(gameDetailsURL(id))
    const screenShotData = await axios.get(gameScreenshotURL(id))
    setGameDetail({
        game: detailData.data,
        screen: screenShotData.data
      }
    )
  }
  useEffect(() => {
    if (id) loadDetail(id)
  }, [id])

  //Data
  //const { screen, game } = useSelector((state) => state.detail)
  return (
    id 
    ?
      <CardShadow>
      <Detail>
        <Stats>
          <div className='rating'>
            <h3>{gameDetail.game.name}</h3>
            <p>Rating: {gameDetail.game.rating}</p>
          </div>
          <Info>
            <h3>Platforns</h3>
            <Platforms>
              {gameDetail.game.platforms?.map((data) => (
                <h3 key={data.platform.id}>{data.platform.name}</h3>
              ))}
            </Platforms>
          </Info>
        </Stats>
        <Media>
          <img src={gameDetail.game.background_image} alt='Game screenshots background' />
        </Media>
        <Description>
          <p>{gameDetail.game.description_raw}</p>
        </Description>
        <div className='gallery'>
          {gameDetail.screen.results?.map((screen) => (
            <img
              src={screen.image}
              key={screen.id}
              alt='Gallery screenshots images'
            />
          ))}
        </div>
      </Detail>
    </CardShadow>
    : null
  )
}

const CardShadow = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ff7676;
  }

  &::-webkit-scrollbar-track {
    background: white;
  }
`

const Detail = styled(motion.div)`
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
`

const Stats = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    width: 2rem;
    height: 2rem;
    display: inline;
  }
`
const Info = styled(motion.div)`
  text-align: center;
`
const Platforms = styled(motion.div)`
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`
const Media = styled(motion.div)`
  margin-top: 5rem;
  img {
    width: 100%;
  }
`
const Description = styled(motion.div)`
  margin: 5rem 0rem;
`

export default GameDetail
