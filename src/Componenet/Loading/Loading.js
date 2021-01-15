import { CircularProgress } from '@material-ui/core';
import React from 'react';

const Loading = () => {
   return (
      <div className="col-12 text-center my-5 py-5">
         <CircularProgress color="secondary" /><br/>
         <strong>Loading...</strong>
      </div>
   );
};

export default Loading;