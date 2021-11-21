ticketText = document.querySelector("#ticket-text");
btn = document.querySelector("button");
message = document.querySelector("#message");
message_container = document.querySelector("#message-container");
pending = document.querySelector("#lblPendientes")

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
        socket.emit('pending-tickets',null,(total) => {
            pending.innerText = total;
        })
        ticketText.innerText = `ticket número ${ticket.turn}`;

    })
});

socket.on("pending-tickets",(total)=>{
    pending.innerText = total;
})

socket.on('connect', () => {
    btn.disabled = false;
    
});

socket.on('disconnect', () => {
    btn.disabled = true;
});


