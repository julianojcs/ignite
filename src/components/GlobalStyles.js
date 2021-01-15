import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @media screen and (max-width: 768px){
    body{
      width: 95%;
    }
    .App {
      nav{
        padding: 2rem 1rem 0rem 1rem;
        div{
        }
        form{
          padding: 2rem 0rem 0rem 0rem;
          margin: 0rem 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          input{
            width: 100%;
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }
          button{
            width: 10rem;
            font-size: 1.5rem;
          }
        }
      }
      div{
        padding: 0rem 1rem;
        h2{
          font-size: 2rem;
          padding: 3rem 1rem 2rem 1rem;
        }
      }
    }
  }
  
  *{
    margin: 0;
    padding:0;
    box-sizing: border-box;
  }
  html{
    &::-webkit-scrollbar{
        width: 0.5rem;
    }
    &::-webkit-scrollbar-thumb{
        background-color: darkgrey;
    }
    &::-webkit-scrollbar-track {
      background: white;
    }
  }
  body{
    font-family: 'Montserrat', sans-serif;
    width: 100%;
  }
  h2{
    font-size: 3rem;
    font-family: 'Abril Fatface', cursive;
    font-weight: lighter;
    color: #333;
  }
  h3{
    font-size: 1.3rem;
    color: #333;
    padding: 1.5rem 0rem;
  }
  p{
    font-size: 1.2rem;
    line-height: 200%;
    color: #696969;
  }
  a{
    text-decoration: none;
    color: #333;
  }
  img{
    display: block;
  }
  input{
    font-weight: bold;
    font-family: 'Montserrat', sans-serif;
  }
`

export default GlobalStyles
