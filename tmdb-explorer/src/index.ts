
function main(_event: Event) {

    const app = document.getElementById("app");

    if(!app) throw new Error("No Se Encontró Ningún Elemento Con Id: 'app'");
    
    const h1 = document.createElement("h1");
    h1.innerText = "TMDB Explorer";

    app.appendChild(h1);
}

window.addEventListener("DOMContentLoaded", main);