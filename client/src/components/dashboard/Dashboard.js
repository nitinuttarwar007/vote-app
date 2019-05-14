import React, { Component } from "react";
import PropTypes from "prop-types";
import moment  from "moment";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getMatches } from "../../actions/matchActions";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import _ from "lodash";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Dashboard extends Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.props.fetchData();
  }
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logout();
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  
  render() {
    const { user } = this.props.auth;
    const { value } = this.state;
    let keys;

    const root =  {
      flexGrow: 1
    }

    if(!_.isEmpty(this.props.matches)){
      var matches = this.props.matches;
      keys = Object.keys(this.props.matches[0]);
    
      var tableHeaders = (
        <TableHead>
          <TableRow>
            {keys.map(function(column){
              return <TableCell align={column.numeric ? 'right' : 'left'}
              padding={column.disablePadding ? 'none' : 'default'}>{column.replace("_", " ").toUpperCase()}</TableCell>
            })}
          </TableRow>
        </TableHead>
      );

      var tableBody = (
        matches.map(function(row){
          return <TableRow component="th" scope="row">
            {keys.map(function(column){
              return <TableCell
                component="th"
                align={row[column].numeric ? 'right' : 'left'}
                padding={row[column].disablePadding ? 'none' : 'default'}
                >
                          {(column === "match_date") ? moment(row[column]).format("DD-MM-YYYY") : row[column]}
                      </TableCell>  
            })}
          </TableRow>
        })
      );

      var addUpdateMatch = (<h1> Add Update Match Data</h1>);
    }
    
    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {user.name.split(" ")[0]}
                <p className="flow-text grey-text text-darken-1">
                  You are successfully logged into a {" "} app 👏
                </p>
              </h4>
              <button
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginBottom: "1rem"
                }}
                onClick={this.onLogoutClick}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Logout
              </button>
              
              <div className={root}>
                <Paper className={root}>
                  <Tabs value={value} onChange={this.handleChange} indicatorColor="primary" textColor="primary" variant="fullWidth">
                    <Tab label="Match Details" />
                    <Tab label="Add / Update Match"/>
                  </Tabs>
                </Paper>
                {value === 0 && <TabContainer>
                  {_.isEmpty(this.props.matches) ? <h1> NO DATA</h1> : (
                    <Paper>
                      <Table>
                        {tableHeaders}
                        <TableBody>
                            {tableBody}
                        </TableBody>
                      </Table>
                    </Paper>
                    )
                }
              </TabContainer>}
              {value === 1 && <TabContainer>{addUpdateMatch}</TabContainer>}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  getMatches: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  {
    auth: state.auth,
    matches: state.getMatchesData,
    isLoading: state.matchesAreLoading
  }
);

const mapDispatchToProps = dispatch => {
  return {
    logout: ()=> dispatch(logoutUser()),
    fetchData: () => dispatch(getMatches())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (Dashboard);
