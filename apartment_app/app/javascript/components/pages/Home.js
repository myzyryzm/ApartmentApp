import React from "react"
import {Link} from "react-router-dom"

export default class Home extends React.Component {
    render () {
        const {apartments, currentUser} = this.props
        let apt = apartments.map(apt => {
            return <li key = {apt.id}>{apt.street_a} {apt.city}
            {currentUser != apt.user_id ? null :
            <div><Link to={`/edit-apartment/${apt.id}`}>Edit</Link></div>}
            </li>
        })
        return (
          <ul>
            {apt}
          </ul>
        );
    }
}
