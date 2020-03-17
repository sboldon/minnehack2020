import React from 'react';

const KeepAlive = (props) => (
  <div style={{display: props.visibile ? null : 'none'}}>
    {props.children}
  </div>
)

export default KeepAlive;