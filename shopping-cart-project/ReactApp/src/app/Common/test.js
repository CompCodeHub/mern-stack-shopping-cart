import React, { Component } from "react";


export default class TestComponent extends Component {

    render(){
        return(
            <div className="topdiv">
                <form>
                <div className="col-md-12">
                    <label className="col-md-4">User Name</label>
                    <input className="col-md-6" type="text" maxLength={14} 
                        placeholder="Please type here user name..."></input>
                    
                    <hr/>
                    <input className="col-md-6" type="email" maxLength={14} 
                        placeholder="Please type here email..."></input>

                    <hr/>   
                    <input className="col-md-6" type="tel" maxLength={14} 
                        placeholder="Please type here telephone..."></input>
                    <hr/>
                    <input className="col-md-6" type="date" maxLength={14} 
                        placeholder="Please type here telephone..."></input>
                    <hr/>
                    <input className="col-md-6" type="checkbox" maxLength={14} 
                        placeholder="Please type here telephone..."></input>
                    <hr/>
                    <input className="col-md-6" type="color" maxLength={14} 
                        placeholder="Please type here telephone..."></input>
                    <hr/>
                        <button type="submit">Submit</button>
                </div>
                </form>
            </div>
        )
    }
}
