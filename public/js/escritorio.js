ticketText = document.querySelector("#ticket-text");
btn = document.querySelector("button");
message = document.querySelector("#message");
message_container = document.querySelector("#message-container");

const socket = io();

urlSearchParams = new URLSearchParams(window.location.search);

if (!urlSearchParams.has('escritorio')) {
    window.location.href = "http://localhost:8080/";
    throw new Error('No envio el escritorio');

}

message_container.style.display = 'none';

const desk = urlSearchParams.get('escritorio');

btn.addEventListener('click', () => {

    socket.emit('attend-ticket', {desk}, ({ok,ticket,msg}) => {
        if(!ok){
            message_container.style.display = '';
            message.innerText = msg;
            return;
        }
        ticketText.innerText = `ticket número ${ticket.turn}`;
    })
});

socket.on('connect', () => {
    btn.disabled = false;
});

socket.on('disconnect', () => {
    btn.disabled = true;
});

