import React from "react"
import {Link, Redirect} from "react-router-dom"

export default class ShowApartment extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentApt: null,
            aptId: -1,
            deleteSuccess: false 
        }
    }

    getCurrentApt = () => {
        let id = this.props.match.params.id
        if(id == this.state.aptId){
            return
        }
        let url = "/apartments/" + this.props.match.params.id.toString()
        fetch(url)
        .then(resp => {
            return resp.json()})
            .then(apt => {
                this.setState({currentApt: apt, aptId: id})})
    }

    localDelete = () => {
        const{aptId} = this.state
        if(aptId < 1){
            return
        }
        const{deleteApartment} = this.props
        deleteApartment(aptId).then(() => {
            this.setState({deleteSuccess:true})
        })
    }

    render () {
        this.getCurrentApt()
        const{currentApt, deleteSuccess} = this.state
        const{currentUser} = this.props
        if(currentApt == null){
            return (
              <div></div>
            );
        }
        return (
            <div>
                <h1>{currentApt.id}</h1> 
                {currentUser != currentApt.user_id ? null :
                <div>
                    {deleteSuccess ? <Redirect to="/" />: null}
                    <Link to={`/edit-apartment/${currentApt.id}/edit`}>Edit</Link>
                    <button onClick = {this.localDelete}>Delete</button>
                </div>
                }
            </div>
        );
    }
}