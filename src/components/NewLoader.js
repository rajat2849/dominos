import ContentLoader from "react-content-loader"
import React from 'react'

class Loader extends React.Component{
  render(){
    return(
      <ContentLoader 
        height={90}
        width={200}
        speed={3}
        primaryColor="#e8e7e7"
        secondaryColor="#bab7b7"
      >
        <rect x="90" y="10" rx="4" ry="4" width="100" height="5" /> 
        <rect x="90" y="30" rx="3" ry="3" width="90" height="3" /> 
        <rect x="90" y="40" rx="2" ry="2" width="70" height="3" />
        <rect x="90" y="50" rx="1" ry="1" width="60" height="3" /> 
        <rect x="5" y="5" rx="0" ry="0" width="75" height="75" />
      </ContentLoader>
    )
  }
}


export default class MyLoader extends React.Component{
  render(){
    return(
      <React.Fragment>
        <Loader />
        <Loader />
        <Loader />
        <Loader />
        <Loader />
      </React.Fragment>
    )
  }
}
