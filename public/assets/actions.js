$( document ).ready(function() {


    // 
    // Toggle Secure
    // 
    $('#toggle-secure').click(function(){
        var $btn = $(this);
        $.get('/togglesecure', function(data){
            console.log(data);
            if(data.secure) {
                $btn.addClass('btn-success');
                $btn.removeClass('btn-danger');
                $btn.text('Secure');
            } else {
                $btn.addClass('btn-danger');
                $btn.removeClass('btn-success');
                $btn.text('Vulnerable');
            }
        });
    });

    //
    // Checkbox 
    //
    $('.big-checkbox').click(function(){
        var $checkbox = $(this);
        var task_id = $checkbox.data('task-id');
        var checked = $checkbox.prop("checked");
        $.get(`/task/${task_id}?complete=${checked}`, function(data){
            $checkbox.prop("checked", checked)    
        })        
    })


});