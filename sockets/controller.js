const TicketControl = require("../models/Ticket-Control");


const ticketControl = new TicketControl();


const socketController = (socket) => {

    socket.emit('last-ticket',ticketControl.last);
    
   

    socket.on('disconnect', () => {

    });

    socket.on('next-ticket', (payload, callback) => {

        const next = ticketControl.nextTicket();

        callback(next)

    })

}



module.exports = {
    socketController
}

