import React from "react"
import {Link} from "react-router-dom"

export default class Home extends React.Component {
    render () {
        const {apartments} = this.props
        let apt = apartments.map(apt => {
            return <li key = {apt.id}>{apt.street_a} {apt.city}
            <div><Link to={`/apartment/${apt.id}`}>Show Details</Link></div>
            </li>
        })
        return (
          <div className = "layout">
            <ul>
              {apt}
            </ul>
          </div>
        );
    }
}
