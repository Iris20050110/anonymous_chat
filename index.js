$(document).ready(function(){

    var pusher = new Pusher('4269220ff011ab4e6a7b', {
        cluster: 'mt1',
        encrypted: false
    });

    var channel = pusher.subscribe('public-chat');
    channel.bind('message-added', onMessageAdded);

    $('#btn-chat').click(function(){
        const message = $("#message").val();
        $("#message").val("");

        //send message
        $.post( "http://localhost:5000/message", { message } );
    });

    function onMessageAdded(data) {
        let template = $("#new-message").html();
        template = template.replace("{{body}}", data.message);

        $(".chat").append(template);
    }
});