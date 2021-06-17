import React from 'react';
import './blockstop.css'
function Blocktop(props){
  return <div className="block"
              >
               <div id="content" style={{
                   backgroundColor:"#FFFFFF",
               }}>
                 {props.img}
              </div>
              <div id="header" style={{
                             backgroundColor:"#FFFFFF",
                              marginLeft:'11%',
                              marginRight:'11%'
              }}>
    {/*<h1 st  ={{marginBottom:'0'}}>主要的网页标题</h1>8*/}
                  {props.title}
              </div>
               <div style={{
                 marginLeft:'2%',
                 marginRight:'2%'
               }} >
                  {props.left1}
              </div>

          </div>
}

export default Blocktop;
