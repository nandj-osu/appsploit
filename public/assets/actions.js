$( document ).ready(function() {


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



});