import React, { Component } from "react";

export default class extends Component{
    constructor(props){
        super(props);

        this.state = {value: '' };
    }

    handleChange(event){
        this.setState({ value: event.target.value });
    }

    render(){
        return(
            <input type="password" value={this.state.value} onChange={e => this.handleChange(e)} />
        );
    }
}