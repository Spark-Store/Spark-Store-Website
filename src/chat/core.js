// App.js
import React, { Component } from "react";
//import "./App.css";
import { connect, sendMsg ,socket} from "../api";
//import ScrollView from 'react-native';
//import { ScrollView } from 'react-native';
//import { SafeAreaView, ScrollView } from 'react-native';
//import { Button, ListGroup } from 'react-bootstrap';
//import { CSSTransition, TransitionGroup} from 'react-transition-group';
class Core extends Component {
  //state={
  //  list:[]
  //}
  constructor(props) {
    super(props);
    connect();
    this.state = {
      list:[{id:"sss",data:"sdfsd"}],
      value: '',
      input: 'sss',
      //style: props.style
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
    //this.onFormSubmit = this.onFormSubmit.bind(this);
   
    //this.handleChange = this.handleChange.bind(this);
    socket.onmessage = msg => {
      //console.log("hallo");
      //console.log(msg.data);
      //console.log(this.state.list);
      var obj = JSON.parse(msg.data);
      //console.log(obj);
      this.setState({
        list:obj.sites,
      });
      console.log(this.state.list[0]);
      //var messages = document.getElementById("messages");
      //messages.append(msg.data + "\n");

    };

  }
  handleChange(event){
    this.setState({input:event.target.value});
  }
  //handleRemove = _id => {
  //    const list = this.state.list.filter(({id})=>{
  //      return id !== _id
  //    });
  //    this.setState({list});
  //  };

  handleSend() {
    sendMsg(this.state.input);
  }
  send() {
    console.log("hello");
    //console.log();
    //var input = document.getElementById("msg");
    sendMsg(this.state.input);
  }
  onKeyDown = (e) => {
      if(e.keyCode === 13){
        this.send();
        this.setState({input:''});
      }
  }

  render() {
    return (
      <div style={{width:'100%',minHeight:300,textAlign:'center'}}>
      <input id="msg" type="text" value={this.state.input} onChange={this.handleChange} onKeyDown={this.onKeyDown}/>
       <button onClick={this.handleSend}>Hit</button>
      {
        this.state.list.map(
          (item,idx) => 
        <p key={idx}>{item.data}</p>
        )
      }
      {/*<pre id="messages"></pre>*/}
    
      {/*<form onSubmit={this.onFormSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}  
          />

          <input type="submit" value="提交"/>
        </form>*/}

        
      </div>
    );
  }
}

export default Core;
