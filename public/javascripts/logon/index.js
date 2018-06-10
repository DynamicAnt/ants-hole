$(function(){
    $('#logon').on('click',function(){
       $.post('/logon/',{
         username:$('#username').val(),
         password:$('#password').val(),
       },function(data){
           if(data.code===0){
               location.href = '/';
           }else{
               alert(data.message);
           }
       });
    });
});