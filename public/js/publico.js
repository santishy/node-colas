lblTicket1 = document.querySelector('#lblTicket1');
lblEscritorio1 = document.querySelector('#lblEscritorio1');
lblTicket2 = document.querySelector('#lblTicket2');
lblEscritorio2 = document.querySelector('#lblEscritorio2');
lblTicket3 = document.querySelector('#lblTicket3');
lblEscritorio3 = document.querySelector('#lblEscritorio3');
lblTicket4 = document.querySelector('#lblTicket4');
lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();


socket.on('connect',() => {
    console.log('conectado')
})

socket.on('disconnect',() => {
    console.log('desconectado')
})

socket.on('last-four',(payload) => {
    
    //Se hizo en este evento lo del audio, por que es cuando se atiende un ticket y se dispara este evento
    //de que se atiende ticket y pues por simplicidad y no crear otro evento personalizado
    //mejor se le da play al audio aqui, ya que un ticket esta siendo atendido.
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    const [ticket1,ticket2,ticket3,ticket4] = payload;
    if(ticket1){
        lblTicket1.innerText = ticket1.turn;
        lblEscritorio1.innerText = ticket1.desk;
    }
    if(ticket2){
        lblTicket2.innerText = ticket2.turn;
        lblEscritorio2.innerText = ticket2.desk;
    }
    if(ticket3){
        lblTicket3.innerText = ticket3.turn;
        lblEscritorio3.innerText = ticket3.desk;
    }
    if(ticket4){
        lblTicket4.innerText = ticket4.turn;
        lblEscritorio4.innerText = ticket4.desk;
    }
})