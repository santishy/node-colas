const TicketControl = require("../models/Ticket-Control");


const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('last-four',ticketControl.lastfour);
    socket.emit('pending-tickets',ticketControl.tickets.length)

    socket.on('disconnect', () => {

    });

    socket.on('next-ticket', (payload, callback) => {

        const next = ticketControl.nextTicket();
        callback(next)
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length)

    });

    socket.on('attend-ticket', ({ desk }, callback) => {

        if (!desk) {
            callback({ ok: false, msg: 'No se envio el escritorio' });
            return;
        }

        const ticket = ticketControl.attendTicket(desk);

        if (!ticket) {
            callback({ ok: false, msg: 'No hay tickets por atender el escritorio' });
            return;
        }
        socket.broadcast.emit('last-four', ticketControl.lastfour)
        socket.broadcast.emit('pending-tickets',ticketControl.tickets.length)
        socket.emit('pending-tickets',ticketControl.tickets.length);
        callback({ ok: true, ticket })
    });



}



module.exports = {
    socketController
}

