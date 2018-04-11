/*global google*/

import React from "react"
import PropTypes from 'prop-types';

import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"


import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

const MapWithADirectionsRenderer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap,
    lifecycle({
        componentDidMount() {
            const DirectionsService = new google.maps.DirectionsService();
  
            DirectionsService.route({
                origin: new google.maps.LatLng(52.1229000, 26.0951000),
                destination: new google.maps.LatLng(53.9000000, 27.5666700),
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: [
                    {
                        location: {lat: 53.1327000, lng: 26.0139000},
                        stopover: true
                    }
                ],
            }, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    this.setState({
                        directions: result,
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            });
        }
    })
)(props =>
    <GoogleMap
        defaultZoom={7}
        defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)}
    >
        {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
);

class Order extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <MapWithADirectionsRenderer />
            
        );
    }
}

Order.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Order;