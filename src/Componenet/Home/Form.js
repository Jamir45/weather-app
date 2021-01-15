import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import countryData from '../../Files/countries+states.json'

const Form = ({setLocation}) => {
   const [countryName, setCountryName] = useState(null)

   const [state, setState] = useState(null)
   // console.log(state)
   const country = countryData.find(countries => countries.name === countryName)
   const { register, handleSubmit } = useForm();
   const onSubmit = data => {
      setLocation(data)
      localStorage.setItem('location', JSON.stringify(data))
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className='row'>
            <div className='col-5 p-0'>
               <input 
                  className='form-control'
                  list="browsers"
                  placeholder="Country Name"
                  onChange={(e) => setCountryName(e.target.value)}
                  name="country"
                  ref={register()}
               />
               <datalist id="browsers">
                  {
                     countryData && countryData.map(country => {
                        return <option value={country.name} />
                     })
                  }
               </datalist>
            </div>
            <div className='col-5'>
               <input 
                  className='form-control'
                  list="cityList"
                  placeholder="State Name"
                  onChange={(e) => setState(e.target.value)}
                  name="state"
                  ref={register()}
                  disabled={!country}
               />
               <datalist id="cityList">
                  {
                     country && country.states.map(city => {
                        return <option value={city.name} />
                     })
                  }
               </datalist>
            </div>
            <div className='col-2 p-0'>
               <Button 
                  className='form-control' 
                  variant="contained" 
                  color="secondary"
                  type="submit"
                  disabled={!state}
               >
                  Press
               </Button>
            </div>
         </div>
      </form>
   );
};

export default Form;