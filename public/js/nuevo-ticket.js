lblNuevoTicket = document.querySelector('#lblNuevoTicket');
createButton = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    createButton.disabled = false;

});

socket.on('disconnect', () => {
    createButton.disabled=true;
});

socket.on('last-ticket',(payload) => {
    lblNuevoTicket.innerText = payload;
});

createButton.addEventListener('click',() => {
    socket.emit('next-ticket',null,(ticket) => {
        lblNuevoTicket.innerText = ticket
    })
})