import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Text from './Text';
import Styled from 'styled-components';
export default App;

const ClimaSection = Styled.section`
align-item: center;
justify-content: center;
width: 100%;
`

const ClimaDiv = Styled.div`
position: relative;
width: 100%;
flex-wrap: nowrap;
`

const ClimaTitle = Styled.h2`
font-size: 40px;
wrap: no-wrap;
left: 50%;
position: absolute;
transform: translateX(-50%);
`

const ClimaDiv2 = Styled.div`
flex: 1;
position: relative;
width: 100%;
`

const ClimaList = Styled.ul`
font-size: 25px;
list-style: none;
left: 50%;
position: absolute;
transform: translateX(-50%);
margin-top: 7%
`

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: "24dbf2e4c44893b90245335fe2a20902",
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }


  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location === false) {
    return (
      <Fragment>
        Você precisa habilitar a localização no browser o/
      </Fragment>
    )
  } else if (weather === false) {
    return (
      <Text />
    )
  } else {
    return (
      <ClimaSection>
        <ClimaDiv>
          <ClimaTitle>Clima nas suas Coordenadas ({weather['weather'][0]['description']})</ClimaTitle>
        </ClimaDiv>
        <ClimaDiv2>
          <ClimaList>
            <li>Temperatura atual: {weather['main']['temp']}°</li>
            <li>Temperatura máxima: {weather['main']['temp_max']}°</li>
            <li>Temperatura minima: {weather['main']['temp_min']}°</li>
            <li>Pressão: {weather['main']['pressure']} hpa</li>
            <li>Humidade: {weather['main']['humidity']}%</li>
          </ClimaList>
        </ClimaDiv2>
      </ClimaSection>
    );
  }
}
