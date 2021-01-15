import React from 'react';
import './App.css'
import Home from './Componenet/Home/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {  
  return (
    <div className='appBg'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-2 col-md-3'></div>
          <div className='col-sm-8 col-md-6 pt-md-5'>
            <Home></Home>
          </div>
          <div className='col-sm-2 col-md-3'></div>
        </div>
        <div className='author'>
          <small>Author@-Jamir Hossain</small>
        </div>
      </div>
    </div>
  );
}

export default App;
