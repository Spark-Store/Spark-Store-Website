//引入layui
layui.config({
  base: './res/static/js/'
}).use('firm');

// Cookie获取函数
function getCookie() {
  if (document.cookie == "") {
    return {}
  } else {
    return JSON.parse('{"' + document.cookie.replace(/; /gi, '", "').replace(/=/gi, '":"') + '"}')
  }
}

// Cookie设置函数
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
}

// 直接拿了 https://www.runoob.com/w3cnote/js-get-url-param.html
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return false;
}

// 检查并处理 URL 参数中的 Lang
var currentLang = getQueryVariable("lang");
if (currentLang !== false) {
  setCookie("language", currentLang, 365);
}

//初始化qusasr
Quasar.lang.set(Quasar.lang.zhHans);
//初始化vue框架
var vm = new Vue({
  el: "#page",
  data: {
    language: {
      code: "zh-CN",
      codes: {
        "zh-CN": "中文（中国）",
        "en-US": "English(US)",
        "fr-FR": "Français(France)"
      }
    }
  },
  methods: {
    changeLanguage: function (code) {
      document.getElementsByClassName("languageButton")[0].click();//关闭菜单
      setCookie("language", code, 365);
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
  if (window.XMLHttpRequest) {
    //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xhr = new XMLHttpRequest();
  }
  else {
    // IE6, IE5 浏览器执行代码
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }

  //设置超时时间及超时时间
  xhr.timeout = 15 * 1000;
  xhr.ontimeout = function () {
    xhr.timeout = 0;
    参数.超时()
  }

  if (参数.异步) {
    //规定在响应处于 onreadystatechange 事件中的就绪状态时执行的函数
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        setTimeout(function (xhr) {
          if (xhr.timeout == 0) {
            参数.完成后(xhr.status == 200, "Timeout", xhr.response, xhr);
          } else {
            参数.完成后(xhr.status == 200, xhr.status, xhr.response, xhr);
          }
        }, 100, xhr);
      }
    }
  }

  //规定请求的类型、URL 以及是否异步处理请求
  xhr.open(参数.方法, 参数.地址, 参数.异步);

  if (参数.方法 == "POST") {
    //设置HTTP头为 HTML 表单
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  }

  //执行发送前回调
  参数.发送前(xhr, 参数);

  //将请求发送到服务器。
  xhr.send(参数.数据);

  if (!参数.异步) {
    //在非异步请求完成后调用回调
    参数.完成后(xhr.status == 200, xhr.status, xhr.response, xhr);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//获取当前语言状态并请求语言包
function 请求语言包(code) {
  //请求通用语言包
  let 网络请求请求通用语言包请求参数 = {
    方法: "GET",//string，GET或POST
    地址: "./language/" + code + "/general.json",//string，链接地址（绝对或相对）
    异步: true,//Boolean，是否启用异步
    数据: "",//string，向服务器发送的数据（仅用于post请求）
    发送前: function (xhr, 参数) {
      //function，在配置完成后，发送请求前调用
    },
    完成后: async function (是否成功, 状态码, 内容, xhr) {
      //function，在请求完成后调用
      if (是否成功) {
        var languageGeneral = JSON.parse(内容);
        for (key in languageGeneral)  // x 为属性名
        {
          if (languageGeneral.hasOwnProperty(key)) {
            vm.$set(vm.language, key, languageGeneral[key]);
          }
        }
      } else {
        if (状态码 === 404){
          console.warn("未找到该语言包，将于 5 秒后自动切换至 zh-CN");
          await delay(5000);
          网络请求请求通用语言包请求参数.地址 = "./language/zh-CN/general.json";
          网络请求(网络请求请求通用语言包请求参数);
        } else {
          console.warn("通用语言包语言配置请求失败，将于 5 秒后重试");
          await delay(5000);
          网络请求(网络请求请求通用语言包请求参数);
        }
      }
    },
    超时: function () {
      //function，在请求超时时调用
    }
  };
  网络请求(网络请求请求通用语言包请求参数);
  //请求页面语言包
  let pageName;
  if (window.location.href.match("html")) {
    pageName = window.location.href.match(/(?=[^\/]+)\w+(?=\.html)/gi)[0];
  } else {
    pageName = "index";
  }
  let 网络请求请求单页语言包请求参数 = {
    方法: "GET",//string，GET或POST
    地址: "./language/" + code + "/" + pageName + ".json",//string，链接地址（绝对或相对）
    异步: true,//Boolean，是否启用异步
    数据: "",//string，向服务器发送的数据（仅用于post请求）
    发送前: function (xhr, 参数) {
      //function，在配置完成后，发送请求前调用
    },
    完成后: async function (是否成功, 状态码, 内容, xhr) {
      //function，在请求完成后调用
      if (是否成功) {
        var languagePage = JSON.parse(内容);
        for (key in languagePage)  // x 为属性名
        {
          if (languagePage.hasOwnProperty(key)) {
            vm.$set(vm.language, key, languagePage[key]);
          }
        }
        document.title = vm.language.title;
      } else {
        if (状态码 === 404){
          console.warn("未找到该语言包，将于 5 秒后自动切换至 zh-CN");
          await delay(5000);
          网络请求请求单页语言包请求参数.地址 = "./language/zh-CN/" + pageName + ".json";
          网络请求(网络请求请求单页语言包请求参数);
        } else {
          console.warn("单页语言包语言配置请求失败，将于 5 秒后重试");
          await delay(5000);
          网络请求(网络请求请求单页语言包请求参数);
        }
      }
    },
    超时: function () {
      //function，在请求超时时调用
    }
  };
  网络请求(网络请求请求单页语言包请求参数);
}

function 多语言() {
  if (getCookie().hasOwnProperty("language")) {
    vm.language.code = getCookie().language;
    请求语言包(vm.language.code);
  } else {
    if (vm.language.codes.hasOwnProperty(navigator.language)) {
      setCookie("language", navigator.language, 365);
    } else {
      setCookie("language", "en-US", 365);
    }
    多语言()
  }
}
多语言();
