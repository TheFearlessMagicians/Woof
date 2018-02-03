(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };

        sendMessage = function (text,me) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            if (me == true){
                    message_side = 'right';
            }else{
                      message_side = 'left';
            }
            $('.message_input').val('');
            $messages = $('.messages');

            message = new Message({
                text: text,
                message_side: message_side
            });
            message.draw();
            return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
 };});

          //LISTENERS
        $('.send_message').click(function (e) {
                  socket.emit('SEND_MESSAGE',getMessageText());
            return sendMessage(getMessageText(),me=true);
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                    socket.emit('SEND_MESSAGE',getMessageText());
                return sendMessage(getMessageText(),me=true);
            }

        });
        //SOCKET CODE FOR CHAT SCRIPT.
        socket.on('MESSAGE_SENT',function(message){
                  sendMessage(message,me=false);
        })
        //sendMessage('Hello Philip! :)');
      //  setTimeout(function () {
          //  return sendMessage('Hi Sandy! How are you?');
        //}, 1000);
        //return setTimeout(function () {
//            return sendMessage('I\'m fine, thank you!');
  //      }, 2000);
    }).call(this);
