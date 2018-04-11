import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Autosuggest from 'react-autosuggest';
import Grid from 'material-ui/Grid';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import AddShoppingCartIcon from 'material-ui-icons/AddShoppingCart';

import Button from 'material-ui/Button';
import IntegrationAutosuggest from './components/Autocomplete';

// JSON база
import database from '../../data.json';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
          data: []
        }

    }

    componentWillMount = () => {
        this.setState({ data: database.routes });
        console.log(database);
    }

    render() {
      const { classes } = this.props;
      const { data } = this.state;
      return (
        <div style={{margin: 10, padding: 20}}>
          <Grid conteiner spacing={24}>
            <Grid item xs md={7}>
              <IntegrationAutosuggest />
              <Paper className={classes.root}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Дата</TableCell>
                      <TableCell numeric>Маршрут</TableCell>
                      <TableCell numeric>Свободных мест</TableCell>
                      <TableCell numeric>Заказ билета</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map(n => {
                      return (
                        <TableRow key={n.id}>
                          <TableCell>{Date.parse(n.date).toLocaleString}</TableCell>
                          <TableCell numeric>{n.name}</TableCell>
                          <TableCell numeric>{n.free_places}</TableCell>
                          <TableCell numeric>
                            <IconButton color="primary" className={classes.button} aria-label="Add to shopping cart">
                              <Link to={`/store/${n.id}`}>
                                <AddShoppingCartIcon props={n.id}/>
                              </Link>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs md={5}>
              <Button variant="raised" color="primary" component={Link} to="/store/order">
                Cоздание заказа
                <AddShoppingCartIcon />
              </Button>
              
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