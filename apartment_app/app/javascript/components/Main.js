import React from "react"
import { Nav, NavItem, NavLink} from 'reactstrap'
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
                        <Route path = "/new-apartment" render = {(props) => <NewApartment onSubmit = {this.addApartment} {...props}/>} />
                        <Route path = "/apartment/:id" render = {(props) => <ShowApartment currentUser = {current_user_id} {...props}/>} />
                        <Route path = "/edit-apartment/:id/edit" render = {(props) => <EditApartment {...props} onSubmit = {this.editApartment} />} />
                    </Switch>
                }
            </Router>
        </React.Fragment>
        );
    }
}

export default Main
