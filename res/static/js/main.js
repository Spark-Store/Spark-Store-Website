//引入layui
layui.config({
  base: './res/static/js/'
}).use('firm');
//初始化qusasr
Quasar.lang.set(Quasar.lang.zhHans);
//初始化vue框架
var vm = new Vue({
  el: "#page",
  data: {
    language:{
      code:"zh-CN",
      codes:{
        "zh-CN":"中文（中国）",
        "en-US":"English(US)"
      }
    }
  },
  methods:{
    changeLanguage:function(code) {
      document.getElementsByClassName("languageButton")[0].click();//关闭菜单
      setCookie("language",code,365);
      多语言();
    }
  }
})
//网络请求函数
function 网络请求(参数) {
  /*
  作者：吉王义昊
  参数实例
  {
    方法:"GET",//string，GET或POST
    地址:"https://baidu.com",//string，链接地址（绝对或相对）
    异步:true,//Boolean，是否启用异步
    数据:"k1=v1&k2=v2",//string，向服务器发送的数据（仅用于post请求）
    发送前:function(xhr,参数) {
      //function，在配置完成后，发送请求前调用
    },
    完成后:function(是否成功,状态码,内容,xhr) {
      //function，在请求完成后调用
    },
    超时:function() {
      //function，在请求超时时调用
    }
  }
  */

  //初始化xhr对象
  var xhr;
  if (window.XMLHttpRequest)
  {
    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xhr=new XMLHttpRequest();
  }
  else
  {
    // IE6, IE5 浏览器执行代码
    xhr=new ActiveXObject("Microsoft.XMLHTTP");
  }

  //设置超时时间及超时时间
  xhr.timeout=15*1000;
  xhr.ontimeout=function() {
    xhr.timeout=0;
    参数.超时()
  }

  if (参数.异步) {
    //规定在响应处于 onreadystatechange 事件中的就绪状态时执行的函数
    xhr.onreadystatechange=function()
    {
      if (xhr.readyState==4)
      {
        setTimeout(function(xhr) {
          if (xhr.timeout==0) {
            参数.完成后(xhr.status==200,"Timeout",xhr.response,xhr);
          } else {
            参数.完成后(xhr.status==200,xhr.status,xhr.response,xhr);
          }
        },100,xhr);
      }
    }
  }

  //规定请求的类型、URL 以及是否异步处理请求
  xhr.open(参数.方法,参数.地址,参数.异步);

  if (参数.方法=="POST") {
    //设置HTTP头为 HTML 表单
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  }

  //执行发送前回调
  参数.发送前(xhr,参数);

  //将请求发送到服务器。
  xhr.send(参数.数据);

  if (!参数.异步) {
    //在非异步请求完成后调用回调
    参数.完成后(xhr.status==200,xhr.status,xhr.response,xhr);
  }
}
//cookie获取函数
function getCookie() {
  if (document.cookie=="") {
    return {}
  } else {
    return JSON.parse('{"'+document.cookie.replace(/; /gi,'", "').replace(/=/gi,'":"')+'"}')
  }
}
//cookie设置函数
function setCookie(cname,cvalue,exdays)
{
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}
//获取当前语言状态并请求语言包
function 请求语言包(code) {
  //请求通用语言包
  网络请求({
    方法:"GET",//string，GET或POST
    地址:"./language/"+code+"/general.json",//string，链接地址（绝对或相对）
    异步:true,//Boolean，是否启用异步
    数据:"",//string，向服务器发送的数据（仅用于post请求）
    发送前:function(xhr,参数) {
      //function，在配置完成后，发送请求前调用
    },
    完成后:function(是否成功,状态码,内容,xhr) {
      //function，在请求完成后调用
      if (是否成功) {
        var languageGeneral=JSON.parse(内容);
        for (key in languageGeneral)  // x 为属性名
        {
          if (languageGeneral.hasOwnProperty(key)) {
            vm.$set(vm.language,key,languageGeneral[key]);
          }
        }
      } else {
        console.error("语言配置请求失败，请刷新页面重试")
      }
    },
    超时:function() {
      //function，在请求超时时调用
    }
  });
  //请求页面语言包
  if (window.location.href.match("html")) {
    var pageName=window.location.href.match(/(?<=\/)[^\/]+(?=\.html)/gi)[0];
  } else {
    var pageName="index";
  }
  网络请求({
    方法:"GET",//string，GET或POST
    地址:"./language/"+code+"/"+pageName+".json",//string，链接地址（绝对或相对）
    异步:true,//Boolean，是否启用异步
    数据:"",//string，向服务器发送的数据（仅用于post请求）
    发送前:function(xhr,参数) {
      //function，在配置完成后，发送请求前调用
    },
    完成后:function(是否成功,状态码,内容,xhr) {
      //function，在请求完成后调用
      if (是否成功) {
        var languagePage=JSON.parse(内容);
        for (key in languagePage)  // x 为属性名
        {
          if (languagePage.hasOwnProperty(key)) {
            vm.$set(vm.language,key,languagePage[key]);
          }
        }
        document.title=vm.language.title;
      } else {
        console.error("语言配置请求失败，请刷新页面重试")
      }
    },
    超时:function() {
      //function，在请求超时时调用
    }
  });  
}

function 多语言() {
  if (getCookie().hasOwnProperty("language")) {
    vm.language.code=getCookie().language;
    请求语言包("zh-CN");
    请求语言包(vm.language.code);
  } else {
    if (vm.language.codes.hasOwnProperty(navigator.language)) {
      setCookie("language",navigator.language,365);
    } else {
      setCookie("language","en-US",365);
    }
    多语言()
  }
}
多语言();
