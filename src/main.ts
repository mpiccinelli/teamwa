/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })
    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp);

    WA.room.onEnterLayer('codeZone').subscribe(() =>{
        currentPopup = WA.ui.openPopup("codePopup","Esta es la sala de grabación, solo pueden entrar las personas autorizadas. Por favor, introduzca su código de acceso.",[]);
    })
    WA.room.onLeaveLayer('codeZone').subscribe(closePopUp);

    WA.room.onEnterLayer('informacaoBalcaoZone').subscribe(() =>{
        currentPopup = WA.ui.openPopup("informacaobalcaoPopup","¡Hola! ¡Bienvenido a Opia Games Hub! ¡Elige un juego y diviértete!",[]);
    })
    WA.room.onLeaveLayer('informacaoBalcaoZone').subscribe(closePopUp);

    

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
