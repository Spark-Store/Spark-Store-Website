//import logo from './logo.svg';
import React, {useState,useRef} from 'react';
import './chat.css';
import Core from './core';
// 东南西北， 东北、西北、东南、西南
//const points = ['e', 'w', 's', 'n', 'ne', 'nw', 'se', 'sw'];

function App() {
    const [style,setStyle] = useState({
      left: 100,
      top: 100,
      width: 500,
      height: 500
    });
  const [style2,setStyle2] = useState({
      width: 1500,
      height: 460
    });
    //const wrapStyle = {
    //  left: 100,
    //  top: 100,
    //  width: 700,
    //  height: 700
    //}
    const oriPos = useRef({
      top: 0, // 元素的坐标
      left: 0,
      cX: 0, // 鼠标的坐标
      cY: 0
    })
    const isDown = useRef(false)
    function onMouseDown(e) {
      e.stopPropagation();
      isDown.current = true;
      // 元素相对于画板的当前位置。
      const top = style.top;
      const left = style.left;
      // 然后鼠标坐标是
      const cY = e.clientY; // clientX 相对于可视化区域
      const cX = e.clientX;
      oriPos.current = {
        top, left, cX, cY
      }
    }
    // 鼠标移动
    function onMouseMove(e) {
      console.log("Move");
      if (!isDown.current) return;
    // 元素位置 = 初始位置+鼠标偏移量
      const top = oriPos.current.top + (e.clientY - oriPos.current.cY);
      const left = oriPos.current.left + (e.clientX - oriPos.current.cX);
      setStyle({
        top,
        left,
        width:500,
        height:500
      });
      setStyle2({
        width:500,
        height:460
      });

    }
    // 鼠标被抬起
    function onMouseUp(e) {
      console.log(e,'onMouseUp');
      isDown.current = false;
    }
    // const data = useState()
    return <div className="drawing-item" style={style}  onMouseUp={onMouseUp} onMouseMove={onMouseMove} onMouseDown={onMouseDown}>
          <Core style={style2}/>
      </div>
}

export default App;
