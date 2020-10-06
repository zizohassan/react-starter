import React from "react";
import {Img} from 'react-image'
import VisibilitySensor from 'react-visibility-sensor'

export const Loader = props => {
  return  <img src={process.env.REACT_APP_LOADING_IMAGE}  alt="" {... props}/>
}

export const Enloader = props => {
  return <img src={process.env.REACT_APP_UNLOAD_IMAGE} alt="" {... props}/>
}

export const Image = props => {
  return (
    <VisibilitySensor>
      <Img  {...props} loader={<Enloader style={props.style ?? {}} className={props.className ?? ''} />} unloader={<Enloader style={props.style ?? {}} className={props.className ?? ''}  />} />
    </VisibilitySensor>
  )
};