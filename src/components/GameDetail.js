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
                <h3>Platforns:</h3>
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
  @media screen and (max-width: 768px) {
    width: 90%;
    left: 5%;
    top: 1rem;
    padding: 0rem !important;
  }
  width: 80%;
  border-radius: 1rem;
  padding: 2rem 5rem;
  background: white;
  position: absolute;
  left: 10%;
  top: 10%;
  color: black;
  z-index: 10;
  img {
    width: 100%;
  }
`

const Stats = styled(motion.div)`
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin: 0;
    .rating {
      text-align: center;
      h3 {
        font-size: 1.5rem;
      }
      img {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }
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
  @media screen and (max-width: 768px) {
    font-size: 1rem !important;
    h3 {
      padding: 1rem 0rem 0.5rem 0rem !important;
    }
  }
  text-align: center;
`
const Platforms = styled(motion.div)`
  @media screen and (max-width: 768px) {
    padding: 0rem !important;
    img {
      margin: 0rem 0.5rem !important;
      width: 1.5rem !important;
      height: 1.5rem !important;
    }
  }
  display: flex;
  justify-content: space-evenly;
  img {
    margin-left: 3rem;
  }
`
const Media = styled(motion.div)`
  @media screen and (max-width: 768px) {
    margin-top: 2rem;
  }
  margin-top: 5rem;
  img {
    width: 100%;
  }
`
const Description = styled(motion.div)`
  @media screen and (max-width: 768px) {
    margin: 2rem 0rem;
  }
  margin: 5rem 0rem;
`

export default GameDetail
