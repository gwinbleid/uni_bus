import React, { Component } from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import './Test.css';
import AnthPath from 'react-leaflet-ant-path';


export default class Test extends Component {
  constructor() {
    super();
  }

  render() {
    const position = [51.505, -0.09];
    let styleMap = {width:'500px',
  height: '500px' };
    let latLngs = [[52.1229000, 26.0951000], [53.1327000, 26.0139000], [53.9000000, 27.5666700]];
    return (
      <div>
      
      <Map center={[52.1229000, 26.0951000]} zoom={13} style={styleMap}>
      
        <TileLayer 
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />
          
        <AnthPath positions={latLngs} />
        
      </Map>
      </div>
    )
  }
}