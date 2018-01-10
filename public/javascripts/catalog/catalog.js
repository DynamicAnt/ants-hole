$(function(){
    $('.js-add').on('click',function(){
        $('input[name="model"]').val("new");
        $('#newCata').modal("show");
    });
    $('.js-modify').on('click',function(){
        var $tr = $(this).closest('tr');
        $('input[name="name"]').val($tr.data('name'));
        $('input[name="id"]').val($tr.data('id'));
        $('input[name="model"]').val("modify");
        $('#newCata').modal("show");
    });

    $('.js-save').on('click',function(){
        var model = $('input[name="model"]').val();
        var name = $('input[name="name"]').val();
        var id = $('input[name="id"]').val();
        var url = "";
        var params = {name:name};
        if(model==="modify"){
            url = '/admin/catalog/update';
            params.id = id;
        }else{
            url = '/admin/catalog/add';
        }
       $.post(url,params,function(data) {
            if(data&&data.flag===1){
                location.reload();
            }else{
                alert(data.msg);
            }
       },'json');
    });

    $('.js-del').on('click',function(){
        var id = $(this).closest('tr').data('id');
        $.post('/admin/catalog/delete',{
            id:id
        },function(data) {
            if(data&&data.flag===1){
                location.reload();
            }else{
                alert(data.msg);
            }
        },'json');
    });
});