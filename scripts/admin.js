const form = document.getElementById("song-form");
const songList = document.getElementById("song-list");
const titoloLabel = document.getElementById("Titolo");
const artistaLabel = document.getElementById("Artista");
const genereLabel = document.getElementById("Genere");
const linkLabel = document.getElementById("Link");
const returnButton = document.getElementById("back-btn");

form.addEventListener("submit", AddSong);
returnButton.addEventListener("click", ()=>
{
    window.location.href = "../index.html";        
});

// visualizzazione song list
window.onload = ()=>
{
    AggiornamentoLista();
    console.log(localStorage.length);
    
};



// aggiunta canzone localStorage
function AddSong()
{
    let canzone = 
    {
        id: "canzone-" + Date.now(),
        titolo: titoloLabel.value,
        artista: artistaLabel.value,
        genere: genereLabel.value,
        link: linkLabel.value 
    }
    localStorage.setItem(canzone.id, JSON.stringify(canzone));
    
    
    AggiornamentoLista();
}

function LeggiLocalStorage()
{
    let songs = [];
    for (let j = 0; j < localStorage.length; j++) 
    {
        const key = localStorage.key(j);
        if (key.startsWith("canzone-"))
        {
            songs.push(JSON.parse(localStorage.getItem(key)));
        }   
    } 
    return songs;
}

function AggiornamentoLista()
{
    let songs = LeggiLocalStorage();
    songList.innerHTML = "";
    songs.forEach((elem)=>
    {
        let elemLi = document.createElement("li");
        let elemSpan = document.createElement("span");
        let elemButton = document.createElement("button");

        elemButton.className = "delete-btn";
        elemButton.innerText = "Elimina";
        
        elemSpan.innerText = elem.titolo + " - " + elem.artista;
        elemLi.appendChild(elemSpan);
        elemLi.appendChild(elemButton);
        elemLi.id =  elem.id;
        songList.appendChild(elemLi);
    }); 
    MappaBottoni();
}

function MappaBottoni()
{
    
    let bottoni = document.getElementsByClassName("delete-btn");
    Array.from(bottoni).forEach(elem => 
    {
        elem.onclick = (e)=>
        {
            let li = e.target.parentElement;
            localStorage.removeItem(li.id);
            AggiornamentoLista();
        }
    });
}

