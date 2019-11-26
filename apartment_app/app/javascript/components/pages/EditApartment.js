import React from "react"
export default class EditApartment extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentApt: null,
            aptId: -1
        }
    }

    getCurrentApt = () => {
        let id = this.props.match.params.id
        console.log(this.state.aptId)
        if(id == this.state.aptId){
            return
        }
        let url = "/apartments/" + this.props.match.params.id.toString()
        fetch(url)
        .then(resp => {
            return resp.json()})
            .then(apt => {
                console.log(apt)
                this.setState({currentApt: apt, aptId: id})})
    }

    render () {
        this.getCurrentApt()
        const{currentApt} = this.state
        if(currentApt == null){
            return (
              <div></div>
            );
        }
        return (
          <h1>{currentApt.id}</h1>
        );
    }
}
