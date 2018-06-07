$(function(){
    $('#join').on('click',function(){
       $.post('/join',{
         log_user_name:$('#username').val(),
         email:$('#email').val(),
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