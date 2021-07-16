import React, { Component } from 'react'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Plan from './Plan'
import axios from 'axios'


export default class App extends Component {
  state = {
    items: [],
    text: ""
  }
  showPlan = () => {
    axios.get('http://127.0.0.1:8000/list/')
      .then((res) => {
        this.setState({ items: res.data })
      })
  }
  addPlan = (d) => {
    if (this.state.text !== "") {
      axios.post('http://127.0.0.1:8000/create/',d)
        .then((res) => {
          this.setState({ text: "" })
          this.showPlan()
        })
    }
  }
  handleChange = (e) => {
    this.setState({ text: e.target.value })
  }
  handleAdd = e =>{
    let dt = {item: this.state.text}
    this.addPlan(dt)
  }
  handleDelete = id => {
    axios.delete(`http://127.0.0.1:8000/delete/${id}`)
    .then((res)=>{
      this.showPlan()
    })
  }
  componentDidMount() {
    this.showPlan();
  }
  render() {
    return (
      <div className="container-fluid my-5">
        <div className="row">
          <div className="col-sm-6 mx-auto text-white shadow p-5">
            <h1 className="text-center">Today's plan</h1>
            <div className="row">
              <div className="col-9">
                <input type="text" className="form-control" placeholder="Enter your plan here" value={this.state.text} onChange={this.handleChange}></input>
              </div>
              <div className="col-2">
                <button className="btn btn-success px-3 " onClick={this.handleAdd}> Submit</button>
              </div>
              <div className="container-fluid">
                <ul className="list-unstyled row m-5">
                  {/* {console.log(this.state.items)} */}
                  {this.state.items.map((value, i) => {
                    return <Plan key={i} sendData={this.handleDelete} id={value.id} value={value.item} />
                  })}
                </ul>
              </div>
            </div>

          </div>

        </div>

      </div>
    )
  }
}
