import React from "react"
import PropTypes from "prop-types"
import { Nav, NavItem, NavLink} from 'reactstrap'
import { BrowserRouter as  Router, Route, Link, Switch } from 'react-router-dom'
import Home from './pages/Home.js'
import EditApartment from './pages/EditApartment.js'
class Main extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            apartments: []
        }
        this.getApartments()
    }

    getApartments = () => {
        fetch("/apartments")
        .then(resp => {
            return resp.json()})
            .then(apts => {
                this.setState({apartments: apts})})
    }

    getApartment = (id) => {
        const{apartments} = this.state
        for(let i = 0; i < apartments.length; i++){
            if(apartments[i].id === id){
                return apartments[i]
            }
        }
        return null
    }

    render () {
        const {
          logged_in,
          sign_in_route,
          sign_out_route,
          current_user_id
        } = this.props
        const {apartments} = this.state

    return (
        <React.Fragment>
            <Router>
                <div>
                    <div>
                      <Link to="/">Home</Link>
                    </div>
                    {!logged_in ? null: <div><Link to="/new-apartment">New Apartment</Link></div>}
                    <div>
                        <a href={logged_in ? sign_out_route: sign_in_route}>{logged_in ? "Sign Out" : "Sign In"}</a>
                    </div>
                </div>
                <Route exact path="/" render = {(props)=><Home {...props} apartments = {apartments} currentUser = {current_user_id} />} />
                {!logged_in ? null:
                    <Switch>
                        <Route path = "/edit-apartment/:id" render = {(props) => <EditApartment {...props} getApartment = {this.getApartment} />} />
                    </Switch>
                }
            </Router>
        </React.Fragment>
        );
    }
}

export default Main
