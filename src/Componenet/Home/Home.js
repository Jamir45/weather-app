import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import './Home.css'
import { useEffect } from 'react';
import Form from './Form';
import sunriseSun from '../../Files/weather_icon_full_sun.svg'
import wind from '../../Files/wind.svg'
import Loading from '../Loading/Loading';

const Home = () => {
   const savedProduct = JSON.parse(localStorage.getItem('location'));
   const [location, setLocation] = useState(savedProduct ? savedProduct : {country: "Bangladesh", state: "Sylhet"})
   
   const [weather, setWeather] = useState(null)
   const [weatherError, setWeatherError] = useState(null)
   useEffect(() => {
      if (location) {
         fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${location.state},${location.country}&appid=${process.env.REACT_APP_WEATHER_KEY}`, {
            method:'GET',
            headers: {
               'Content-type':'application/json'
            }
         })
         .then(res => res.json())
         .then(result => {
            if (result.cod === '404') {
               setWeatherError(result)
            }else{
               setWeather(result)
            }
         })
      }
   }, [location])

   let sunrise = weather && new Date(weather.sys.sunrise * 1000).toLocaleTimeString()
   let sunset = weather && new Date(weather.sys.sunset * 1000).toLocaleTimeString()

   return (
      <Paper className='weather_animated mt-5 mt-md-5' elevation={3}>
         <div className='text-center text-white pb-3'>
            <h5>Welcome to Weather App</h5>
         </div>
         <Form setLocation={setLocation}></Form>
         <h4 className='text-center mt-3 text-white'> 
            {weather || weatherError ? `${location.state}, ${location.country}` : ''}
         </h4>

         <div className='row'>
         {
            !weather && !weatherError ? <Loading></Loading> : ''
         }
         {
            weather ?
            <>
               <div className='col-6 col-lg-3 text-center'>
                  {
                     weather.weather.map(describe => {
                        return <>
                           <img className='img-fluid' src={`http://openweathermap.org/img/wn/${describe.icon}@2x.png`} alt=""/>
                           <p className='description'>{describe.description}</p>
                        </>
                     })
                  }
               </div>

               <div className='col-6 col-lg-4 d-flex justify-content-center align-items-center'>
                  <h1 className="currentTemp"> 
                     {weather &&(weather.main.temp - 273.15).toFixed(2)}<span>°c</span>
                  </h1>
               </div>

               <div className='col-12 col-lg-5 align-items-center text-white py-3'>
                  <small>
                     <img 
                        className='wind' 
                        src={wind} alt=""
                     />
                     Wind Speed : {(weather.wind.speed * 3.6).toFixed(2)}
                  </small>km/h<br/>
                  <small>
                     <img 
                        className='wind' 
                        src={wind} 
                        alt=""
                     />
                     Wind Degree : {weather.wind.deg}<span>°c</span>
                  </small><br/>
                  <small>
                     <img 
                        className='sun' 
                        src={sunriseSun} 
                        alt=""
                     />
                     Sunrise : {sunrise && sunrise} 
                  </small><br/>
                  <small>
                     <img 
                        className='sun' 
                        src={sunriseSun} 
                        alt=""
                     />
                     Sunset : {sunset && sunset} 
                  </small>
               </div>

               <div className='col-12 p-3 text-white'>
                  <span>
                     <img 
                        className='wind' 
                        src={wind} 
                        alt=""
                     />
                     Atmospheric pressure on the sea level : {weather.main.sea_level} hPa
                  </span><br/>
                  <span>
                     <img 
                        className='wind' 
                        src={wind} 
                        alt=""
                     />
                     Atmospheric pressure on the ground level : {weather.main.grnd_level} hPa
                  </span>
               </div>
            </> : weatherError && 
            <div className="col-12  d-flex justify-content-center align-items-center my-5 py-5">
               <h3>Weather not found for this city</h3>
            </div>
         }
         </div>
      </Paper>
   );
};

export default Home;