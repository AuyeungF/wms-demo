import Vue from "vue";
import axios from "axios";

let host = "";

// 开发环境
if (process.env.NODE_ENV == 'development') {
    host = "http://192.168.1.16:9992";
// 线上环境
}else if(process.env.NODE_ENV == 'production'){
    host = "http://localhost:8080";
}


//拦截
axios.interceptors.request.use(
    config => {
        let token = localStorage.getItem("token");
        if(token){
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers["XX-Token"] = `${token}`;
            config.headers["XX-Device-Type"] = "wxapp";

        }
        if(config.url.indexOf(host) === -1) {
            config.url = host + config.url;/*拼接完整请求路径*/
        }
        return config;
    },
    err=>{
        return  Promise.reject(err);
    });

export default async (url="",data={},method="GET")=>{
    method = method.toUpperCase();

  var obj = {};
  if(method = "GET") {
      obj.params = data;
  } else if (method == "POST"){
      obj.data = data;
  }
  obj.method = method;
  obj.url = url;

  return new Promise((resolve,reject) =>{
      axios(obj).then(response => {
          console.log(response);
         /* if (response.status == 200) {

              resolve(response.data);
          } else {
              reject(response);
          }*/
      }).catch(err =>{
          console.log(err);
         /* if(err.response.status == 401) {
              resolve(err.response.data);
          }else if(err.response.status == 402){
              resolve(err.response.data);
          } else {
              reject(err);
          }*/
      });
  });
};
