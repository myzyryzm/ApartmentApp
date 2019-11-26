import React from "react"
import {Redirect} from 'react-router-dom'
export default class EditApartment extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            aptId: -1,
            form: {
                street_a: "",
                city: ""
            },
            editSuccess: false
        }
    }

    getCurrentApt = () => {
        let id = this.props.match.params.id
        if(id == this.state.aptId){
            return
        }
        let url = "/apartments/" + this.props.match.params.id.toString() + "/edit"
        fetch(url)
        .then(resp => {
            return resp.json()})
            .then(apt => {
                let{form} = this.state
                form["street_a"] = apt.street_a
                form["city"] = apt.city
                this.setState({form, aptId: id})})
    }

    onChange = (e) => {
        const{form} = this.state
        const{name,value} = e.target
        form[name] = value
        this.setState({form})
    }

    localSubmit= () => {
        const{onSubmit} = this.props
        const{form, aptId} = this.state
        onSubmit(form,aptId).then(response =>{
            this.setState({editSuccess: true})
        })
    }

    render () {
        this.getCurrentApt()
        const{form, aptId, editSuccess} = this.state
        const{street_a, city} = form
        if(form.street_a == ""){
            return (
              <div></div>
            );
        }
        return (
          <React.Fragment>
              {editSuccess ? <Redirect to={"/apartment/" + aptId.toString()} />: null}
              <h1>Edit Apartment</h1>
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