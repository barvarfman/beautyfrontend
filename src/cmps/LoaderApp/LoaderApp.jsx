import React from 'react';
import Loader from 'react-loader-spinner'
export class LoaderApp extends React.Component {
  //other logic
  render() {
    return (
      <Loader
        type="Oval"
        color="#e91e63"
        height={100}
        width={100}
        timeout={3000} //3 secs

      />
    );
  }
}