module.exports= {
          "expressInterest": function(sender,recipient_email, message,apikey,callback){
                    let curlString = `curl -s --user 'api:${apikey}'
                              https://api.mailgun.net/v3/sandbox0efb1a68e1a94a56a5b0131e19cb4340.mailgun.org/messages
                              -F from='Woof-app'
                               -F to='${recipient_email}'
                               -F subject='${sender} wants to connect with your dog!'
                               -F text='${message}' `
                    require("child_process").exec(curlString,function(err,data){
                              if(err){
                                        console.log(`email did not send correctly, for ${sender} to ${recipient} `);
                                        throw err;
                                }
                              else{
                                        console.log(data);
                                        callback();
                              }
                    });
          }

}
