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
        const time = today.getHours() + "h" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","¡Hola! Ahora son: " + time,[]);
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
    
    /* Embed sound iframe
    WA.ui.website.open({
        url: "https://open.spotify.com/embed/playlist/7puNue3FaF5kpR8k5ElLDP",
        position: {
            vertical: "top",
            horizontal: "right",
        },
        size: {
            height: "80px",
            width: "30vw",
        },
    });*/

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
