import React, {useState} from 'react';
import Core from './chat/core'
import './styles.css'
import Block from './pages/blocks'
import Blocktop from './pages/blockstop'
import {contents ,url0, url1,title,bottom }from './content'
function Window() {
  const [content,setContent] = useState({
    content : contents,
    url: url0,
    english : false,
    tit: title,
    bot: bottom
  });
  function setEnglish(){
    if (content.english===false) {
      setContent({
        english : true,
        content : contents,
        url:url0,
        tit:title,
        bot:bottom
      })
    }else{
      setContent({
        english : false,
        content : contents,
        url:url1,
        tit: title,
        bot:bottom
      }
      )
    }

  }
  return <div>
            <div id="header" className="static">
                <ul>

                    <button className="dropbtn" onClick={setEnglish}>{content.url[4]}</button>
                    <li className="top-logo"><a href="index.html">{content.url[0]}</a></li>
                    <li><a href="index.html">{content.url[1]}</a></li>
                    <li><a href="https://www.deepinos.org">{content.url[2]}</a></li>
                    <li><a href="https://www.deepinos.org">{content.url[3]}</a></li>

                </ul>
            </div>
            <div className="dropdown">
                <ul>
                <li className="top-logo"><a href="index.html">{content.url[0]}</a></li>
                <div className="dropdown2">
                    <button className="dropbtn" ><a>More</a></button>
                    <div className="dropdown-content">
                        <a href="index.html">{content.url[1]}</a>
                        <a href="https://www.deepinos.org">{content.url[2]}</a>
                        <a href="https://www.deepinos.org">{content.url[3]}</a>
                        <button className="dropbtn2" onClick={setEnglish}>{content.url[4]}</button>
                    </div>
                </div>
                </ul>
            </div>
            <Block title ={content.tit[0]}
                      left1 = {content.tit[1]}
                      img = {content.tit[2]}/>
                        <div className="row">
            {
                  content.content.map(
                    (item,idx) => <Blocktop key={idx}
                      title={item[0]}
                      left1={item[1]}
                      img={item[2]}/>)
            }
            {
                  content.bot.map(
                    (item,idx) => <Block key={idx}
                      title={item[0]}
                      left1={item[1]}
                      img={item[2]}/>)
            }

            </div>
            <Core/>
        </div>
}

export default Window;
