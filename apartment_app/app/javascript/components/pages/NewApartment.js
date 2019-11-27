import React from "react"
import {Redirect} from 'react-router-dom'

export default class NewApartment extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            form: {
                street_a: "",
                city: ""
            },
            createSucess: false
        }
    }

    localSubmit = () => {
        const{onSubmit} = this.props
        const{form} = this.state
        onSubmit(form).then(() => {
            this.setState({createSucess: true})
        })
    }

    onChange = (e) => {
        const{form} = this.state
        const{name,value} = e.target
        form[name] = value
        this.setState({form})
    }

    render () {
        const{form, createSucess} = this.state
        const{street_a, city} = form
        return (
          <React.Fragment>
              {createSucess ? <Redirect to="/" />: null}
              <h1>New Apartment</h1>
              <div>
                  <label>Street</label>
                  <input name="street_a" value = {street_a} onChange = {this.onChange} type = 'text' />
              </div>
              <div>
                <label>City</label>
                <input name="city" value = {city} onChange = {this.onChange} type = 'text' />
              </div>
              <button onClick={this.localSubmit}>Submit</button>
          </React.Fragment>
        );
    }
}