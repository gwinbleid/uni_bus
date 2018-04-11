/*global google*/

//REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import database from '../../data.json';

// REACT-GOOGLE-MAPS
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps"

// MATERIAL-UI
import List, {
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';
import Button from 'material-ui/Button';

// STYLES
const styles = {
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  listItem: {
    border: '2px solid black',
    borderRadius: '20px'
  }
};







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
    },

    componentWillUpdate() {
      let DirectionsService = new google.maps.DirectionsService();
    
      DirectionsService.route({
        origin: new google.maps.LatLng(52.1229000, 26.0951000),
        destination: this.props.destination,
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: [
          
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










class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: [],
      dense: false,
      secondary: false,
      destination: {}
    }
  }

  componentWillMount = () => {
    let a = database.routes;
    console.log ( a);
    this.setState ({ data: database.routes });
  }

  rerenderMap = data => () => {
    let last = database.routes[data].routes.length;
    let originLat = database.routes[data].routes[0].lat;
    let originLng = database.routes[data].routes[0].lng;

    let destLat = database.routes[data].routes[last-1].lat;
    let destLng = database.routes[data].routes[last-1].lng;

    console.log('dest ' + destLat);
    console.log(database.routes[data]);

    this.setState({destination: {lat: destLat, lng: destLng}});
    // return <MapWithADirectionsRenderer props={origin: {lat: originLat, lng: originLng}, destination: {lat: destLat, lng: destLng}}/>
  }
  

  render() {
    const { classes } = this.props;
    const { dense, secondary, data , destination} = this.state;
    var lists = data.map(list =>
      <Button component={Link} to={`/store/${list.id}`} onMouseOver={this.rerenderMap(list.id)}>
      <ListItem className={classes.listItem}>
        <ListItemText
          primary={`${(Date(list.date)).toLocaleString('en_US')}\t${list.name}`}
          secondary={secondary ? 'Secondary text' : null}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Delete">
            <AddShoppingCartIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      </Button>
    )
    const position = [[52.1229000, 26.0951000], [53.1327000 , 26.0139000]];
    let styleMap = {
      width:'600px',
      height: '600px' 
    }
    return (
      <div style={{padding: 0}}>
        <h1>Relevant Routes</h1>
        <Grid container>
          <Grid item sm="4">
            <List>
              {lists}
            </List>
          </Grid>

          <Grid item sm="8">
            <MapWithADirectionsRenderer destination={this.state.destination}/>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);