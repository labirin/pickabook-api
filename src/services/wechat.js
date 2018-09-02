import request from "request";
import config from "./config";

const SNS_URL = "https://api.weixin.qq.com/sns/jscode2session";
const app_id = "wxa06b46a0f1a492a0";
const app_secret="1d341dcecd252d5d2edb0813a76b2f14";


exports.getAuthCode = function(code) {
  return new Promise((resolve, reject) =>
    
    request.get(
      {
        url: SNS_URL,
        qs: {
          appid: app_id,
          secret: app_secret,
          js_code: code,
          grant_type: "authorization_code" 
        },
        json: true
      },
      (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }
        console.log("error", body);
        if (body.errcode) {
          return resolve({ errmsg: body.errmsg });
        }
        resolve(body);
      }
    )
  );
};

// 'https://api.weixin.qq.com/sns/jscode2session?appid='+APPID+'&secret='+SECRET+'&js_code='+JSCODE+'+&grant_type=authorization_code'


