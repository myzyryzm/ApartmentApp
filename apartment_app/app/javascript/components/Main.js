import React from "react"
import { Nav, NavItem, NavLink} from 'reactstrap'
import "bootswatch/dist/spacelab/bootstrap.min.css"; 

import { BrowserRouter as  Router, Route, Link, Switch } from 'react-router-dom'
import Home from './pages/Home.js'
import EditApartment from './pages/EditApartment.js'
import NewApartment from "./pages/NewApartment.js"
import ShowApartment from "./pages/ShowApartment"
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

    addApartment = (attrs) => {
        return fetch("/apartments", {
            method: 'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({apartment:attrs})
        }).then(response => {
            if(response.status === 201){
                this.getApartments()
            }
        })
    }

    editApartment = (attrs, id) => {
        let url = "/apartments/" + id.toString()
        return fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({apartment:attrs})
        }).then(response => {
            if(response.status === 201){
                this.getApartments()
            }
        })
    }

    deleteApartment = (id) => {
        let url = "/apartments/" + id.toString()
        return fetch(url, {
            method: 'DELETE'
        }).then(resp => {
            if(resp.status === 400){
                console.log("error")
                // response.json().then(paylod => {
                //     this.setState({error: payload.error})
                // })
            }
            else {
                this.getApartments()
            }
        })
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
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a className="navbar-brand" href="">Apartment Finder</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Nav>
                                    <NavItem>
                                        <Link to="/" className="nav-link">Home</Link>
                                    </NavItem>
                                </Nav>
                            </li>
                            {!logged_in ? null: 
                            <li className="nav-item active">
                                <Nav>
                                    <NavItem>
                                        <Link to="/new-apartment" className = "nav-link">New Apartment</Link>
                                    </NavItem>
                                </Nav>
                            </li>}
                            <li className="nav-item">
                                <a className="nav-link" href={logged_in ? sign_out_route: sign_in_route}>{logged_in ? "Sign Out" : "Sign In"}</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Route exact path="/" render = {(props)=><Home {...props} apartments = {apartments} currentUser = {current_user_id} />} />
                <Switch>
                    {!logged_in ? null : <Route path = "/new-apartment" render = {(props) => <NewApartment {...props} onSubmit = {this.addApartment}/>} />}
                    <Route path = "/apartment/:id" render = {(props) => <ShowApartment {...props} currentUser = {current_user_id} deleteApartment = {this.deleteApartment} />} />
                    {!logged_in ? null : <Route path = "/edit-apartment/:id/edit" render = {(props) => <EditApartment {...props} onSubmit = {this.editApartment} />} />}
                </Switch>
            </Router>
        </React.Fragment>
        );
    }
}

export default Main
