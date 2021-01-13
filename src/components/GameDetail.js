//Styling and Animation
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
// import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import axios from 'axios'
import { gameDetailsURL, gameScreenshotURL } from '../api'
import { smallImage } from '../util'
//IMAGES
import playstation from '../img/playstation.svg'
import steam from '../img/steam.svg'
import xbox from '../img/xbox.svg'
import nintendo from '../img/nintendo.svg'
import apple from '../img/apple.svg'
import gamepad from '../img/gamepad.svg'
//Star Images
import starEmpty from '../img/star-empty.png'
import starFull from '../img/star-full.png'

const GameDetail = ({id}) => {
  const history = useHistory()

  const [gameDetail, setGameDetail] = useState({
    game: {},
    screen: {},
    isLoading: true
  })

  //Exit Detail
  const exitDetailHander = (e) => {
    const element = e.target
    if (element.classList.contains('shadow')) {
      document.body.style.overflow = 'auto'
      history.push('/')
    }
  }

  //Get Stars
  const getStars = () => {
    const stars = []
    const rating = Math.floor(gameDetail.game.rating)
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<img alt='Star Full' key={i} src={starFull}></img>)
      } else {
        stars.push(<img alt='Star Empty' key={i} src={starEmpty}></img>)
      }
    }
    return stars
  }

  //GET PLATFORM IMAGES
  const getPlatform = (platform) => {
    switch (platform) {
      case 'PlayStation 4':
        return playstation
      case 'Xbox One':
        return xbox
      case 'PC':
        return steam
      case 'Nintendo Switch':
        return nintendo
      case 'iOS':
        return apple
      default:
        return gamepad
    }
  }

  const loadDetail = async (id) => {
    const detailData = await axios.get(gameDetailsURL(id))
    const screenShotData = await axios.get(gameScreenshotURL(id))
    setGameDetail({
      game: detailData.data,
      screen: screenShotData.data,
      isLoading: false
    })
  }
  useEffect(() => {
    if (id) loadDetail(id)
  }, [id])

  //Data
  //const { screen, game } = useSelector((state) => state.detail)
  return id ? (
    <>
      {!gameDetail.isLoading && (
        <CardShadow className='shadow' onClick={exitDetailHander}>
          <Detail layoutId={id}>
            <Stats>
              <div className='rating'>
                <motion.h3 layoutId={`title_${id}`}>
                  {gameDetail.game.name}
                </motion.h3>
                <p>Rating: {gameDetail.game.rating}</p>
                {getStars()}
              </div>
              <Info>
                <h3>Platforns</h3>
                <Platforms>
                  {gameDetail.game.platforms?.map((data) => (
                    <img
                      alt={data.platform.name}
                      key={data.platform.id}
                      title={data.platform.name}
                      src={getPlatform(data.platform.name)}
                    ></img>
                  ))}
                </Platforms>
              </Info>
            </Stats>
            <Media>
              <motion.img
                layoutId={`image_${id}`}
                src={smallImage(gameDetail.game.background_image, 640)}
                alt='Game screenshots background'
                loading='lazy'
              />
            </Media>
            <Description>
              <p>{gameDetail.game.description_raw}</p>
            </Description>
            <div className='gallery'>
              {gameDetail.screen.results?.map((screen) => (
                <img
                  src={smallImage(screen.image, 640)}
                  key={screen.id}
                  alt='Gallery screenshots images'
                  loading='lazy'
                />
              ))}
            </div>
          </Detail>
        </CardShadow>
      )}
    </>
  ) : null
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
