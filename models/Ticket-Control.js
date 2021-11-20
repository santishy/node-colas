const fs = require('fs');
const path = require('path');

//Se hace esta clase para definir el objeto, que no solo sea un turno sino q tmb establesca el escritorio
class Ticket {
    constructor(turn, desk) {
        this.turn = turn;
        this.desk = desk;
    }
}

class TicketControl {
    constructor() {
        this.last = 0;
        this.now = new Date().getDate();
        this.lastfour = [];
        this.tickets = [];
        this.init();
    }

    get toJson() {
        return {
            last: this.last,
            now: this.now,
            lastfour: this.lastfour,
            tickets: this.tickets
        }
    }

    init() {
        let { now, last, lastfour, tickets } = require('../db/data.json');
        if (now === new Date().getDate()) {
            this.tickets = tickets;
            this.last = last;
            this.lastfour = lastfour;
        }
        else {
            this.save();
        }
    }

    nextTicket() {
        this.last += 1;
        this.tickets.push(new Ticket(this.last, null));
        this.save();
        return 'Turno ' + this.last;
    }

    attendTicket(desk) {

        if (!this.tickets.length)
            return null;

        //extraigo el primer ticket del array
        const firstTicket = this.tickets.shift();
        firstTicket.desk = desk;

        //agrego en la primera posicion del array
        this.lastfour.unshift(firstTicket);

        if (this.lastfour.length > 4) {
            //con -1 aparentemente apunta a la ultima posición
            this.lastfour.splice(-1, 1);
        }

        this.save();

       

        return firstTicket;
    }

    save() {
        const path_db = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(path_db, JSON.stringify(this.toJson));
    }
}

module.exports = TicketControl;