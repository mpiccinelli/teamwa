/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    //Open clock Popup
    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })
    //Close Clock Popup
    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp);

    //Open Code door Popup
    WA.room.onEnterLayer('codeZone').subscribe(() =>{
        currentPopup = WA.ui.openPopup("codePopup","Esta es la sala de grabación, solo pueden entrar las personas autorizadas. Por favor, introduzca su código de acceso.",[]);
    })
    //Close Code door Popup
    WA.room.onLeaveLayer('codeZone').subscribe(closePopUp);

    //Open information Popup
    WA.room.onEnterLayer('informacaoBalcaoZone').subscribe(() =>{
        currentPopup = WA.ui.openPopup("informacaobalcaoPopup","¡Hola! ¡Bienvenido a Opia Games Hub! ¡Elige un juego y diviértete!",[]);
    })
    //Close information Popup
    WA.room.onLeaveLayer('informacaoBalcaoZone').subscribe(closePopUp);

    //Set config music casino
    var mySoundCasino = WA.sound.loadSound("assets/music/MusicaCasino.mp3");
    var configSoundCasino = {
        volume : 0.01,
        loop : true,
        rate : 1,
        detune : 1,
        delay : 0,
        seek : 0,
        mute : false
    }
    //Play music on enter layer casino
    WA.room.onEnterLayer('musicCasino').subscribe(() => {
        mySoundCasino.play(configSoundCasino);
    })
    //Stop music on enter layer casino
    WA.room.onLeaveLayer('musicCasino').subscribe(() => {
        mySoundCasino.stop();
    })

     //Set config music studio
     var mySoundEstudio = WA.sound.loadSound("assets/music/MusicaEstudio.mp3");
     var configSoundEstudio = {
         volume : 0.05,
         loop : true,
         rate : 1,
         detune : 1,
         delay : 0,
         seek : 0,
         mute : false
     }
     //Play music on enter layer casino
     WA.room.onEnterLayer('musicEstudio').subscribe(() => {
         mySoundEstudio.play(configSoundEstudio);
     })
     //Stop music on enter layer casino
     WA.room.onLeaveLayer('musicEstudio').subscribe(() => {
         mySoundEstudio.stop();
     })
    
    // Embed sound iframe
    WA.ui.website.open({
        url: "https://open.spotify.com/embed/playlist/7puNue3FaF5kpR8k5ElLDP",
        position: {
            vertical: "bottom",
            horizontal: "middle",
        },
        size: {
            height: "80px",
            width: "30vw",
        },
    });

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

//Function close opened Popup 
function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
