import React from 'react';
import './content.css'
function jump(){
  window.location.href = "https://www.baidu.com";
}
let title_title = <div style={{ textAlign: 'center'   }}>
                      <h1 >Spark Store</h1>
                      <h1 className="title2">指尖一触，即是万物</h1>
                  </div>;
let title_contant = <div>

                    <div style={{ textAlign: 'center'}}>
                    <button className="button1"><span>介绍视频</span></button>
                    </div>
                    <div style={{ textAlign: 'center'}}>
                    <button className="button2"><span>更新记录</span></button>
                    </div>
                    <div style={{ textAlign: 'center'}}>
                    <button onClick={jump}><span>下载体验</span></button>
                    </div>
                    </div>;
let title_image=<img border="0" 
              src={require("./imags/01.svg")}
              alt="sss"
              style={{
                height:"100%",
                width:"100%",
              }}/>;
let a01 =<h1 className="title2" style={{ textAlign: 'center'   }}>开源社区的<font style={{color:"blue"}}>自由</font></h1>;
let a02=<div style={{ textAlign: 'center' }}><p>从客户端到服务端</p><p>代码全部开源，自由修改</p></div>;
let a03=<img border="0" 
              src={require("./imags/02.svg")}
              alt="sss"
              style={{
                height:"100%",
                width:"100%",
              }}/>
let a11 =<h1 className="title2" style={{ textAlign: 'center'   }}>简约美观的<font style={{color:"blue"}}>界面</font></h1>;
let a12=<div style={{textAlign:'center'}}><p>Dtk 5开发，毛玻璃侧栏</p><p>给您简约优雅的体验</p></div>;
let a13=<img border="0" 
              src={require("./imags/02.svg")}
              alt="sss"
              style={{
                height:"100%",
                width:"100%",
              }}/>;
let a21 =<h1 className="title2" style={{ textAlign: 'center'   }}>丰富多样的<font style={{color:"blue"}}>应用</font></h1>;
let a22=<div style={{textAlign:'center'}}><p>社区收集，真人审核上架</p><p>多而可控的应用存储</p></div>
let a23=<img border="0" 
              src={require("./imags/02.svg")}
              alt="sss"
              style={{
                height:"100%",
                width:"100%",
              }}/>;
const contents = [[a01,a02,a03],
                  [a11,a12,a13],
                  [a21,a22,a23],
          ];
const url0 = [
  "Spark store",
  "INDEX",
  "BLOCK",
  "DISCUSS",
  "中文"
]
const url1 = [
  "星火商店",
  "目录",
  "板块",
  "讨论",
  "English"
]

let b11 =<h1 className="title2" style={{ textAlign: 'center'   }}>关于<font style={{color:"blue"}}>我们</font></h1>;
let b12=<div>
          <p>有shenmo发起的星火商店致力于丰富linux生态，取"星星之火，可以燎原"之一，组建了星火应用商店。我们是个年轻的团队，大部分成员是00后，有小学生，中学生，大学生，来自五湖四海。</p>
          <p>尽管我们年龄不同，资历不同，但是我们努力建设linux生提啊的目标是相同的。我们有信心，也有勇气向着我们共同目标不断前进</p>
          </div>
let b13=<img border="0" 
              src={require("./imags/05.svg")}
              alt="sss"
              style={{
                height:"100%",
                width:"100%",
              }}/>;
let b21 =<h1 className="title2" style={{ textAlign: 'center'   }}>下载<font style={{color:"blue"}}>中心</font></h1>;
let b22= <div>
          <div style={{ textAlign: 'center'}}>
          <button><span>sss</span></button>
          </div>
          <div style={{ textAlign: 'center'}}>
          <button><span>ssss</span></button>
          </div>
          <div style={{ textAlign: 'center'}}>
          <button><span>gridman</span></button>
          </div>
                    </div>;
let b23=<img border="0" 
              src={require("./imags/02.svg")}
              alt="sss"
              style={{
                height:"100%",
                width:"100%",
              }}/>;
const title = [ title_title,title_contant,title_image ];
const bottom = [[b11,b12,b13],
                [b21,b22,b23],
          ];
export { contents, url0, url1 ,title,bottom};
