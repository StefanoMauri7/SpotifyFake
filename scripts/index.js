
// GESTIONE PASSWORD

const password = "Rampina07";
const cardsContainer = document.getElementById("cards-container");
const shuffleButton = document.getElementById("shuffle-btn");
const loginButton = document.getElementById("loginButton");
const testPassword = document.getElementById("testPassword")
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", ricercaDinamica);
shuffleButton.addEventListener("click", shuffle);
testPassword.addEventListener("click", ()=>
{
    let passwordInput = document.getElementById("password");
    if(passwordInput.value == password)
    {
        loginButton.style.display= "block";
    }
    else
    {
        alert("password errata");
    }
});

// SCARICAMENTO DATI DA LOCAL STORAGE


window.onload = () =>
{
    cardsContainer.innerHTML = "";
    let songs = LeggiLocalStorage();
    songs.forEach((song)=>
    {
        CreaCard(song);
    });


}

function CreaCard(song)
{
    //creazione elementi della card

    let divCard = document.createElement("div");
        divCard.className = "card";
        
        let divCardContent = document.createElement("div");
        divCardContent.className = "card-content";
        
        let h2SongName = document.createElement("h2");
        h2SongName.innerText = song.titolo;

        let pArtist = document.createElement("p");
        pArtist.className = "artist";
        pArtist.innerText = song.artista;

        let link = document.createElement("a");
        link.href = song.link;
        link.target = "_blank";
        link.innerText = "Ascolta";

        let image = document.createElement("img");
        image.className = "card-icon";
        image.src = SelectIconSource(song.genere);              //TODO
        image.alt = "Icona canzone";
        

        // CREAZIONE GERARCHIE E AGGIUNTA A DOCUMENT

        divCardContent.appendChild(h2SongName);
        divCardContent.appendChild(pArtist);
        divCardContent.appendChild(link);
        divCard.appendChild(divCardContent);
        divCard.appendChild(image);
        
        cardsContainer.appendChild(divCard);
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




function shuffle()
{
    let songs = LeggiLocalStorage();
    let max = songs.length;
    let n = Math.floor(Math.random() * max);
    let song = songs[n];
    window.open(song.link);

}

function ricercaDinamica()
{
    let testo = searchInput.value.toLowerCase();
    let songs = LeggiLocalStorage();

    cardsContainer.innerHTML = "";

    songs.forEach((song) =>
    {
        if(song.titolo.toLowerCase().includes(testo) || song.artista.toLowerCase().includes(testo))
        {
            CreaCard(song);
        }
    });
}


function SelectIconSource(genere)
{
    
    if(genere=="rock")
    {
        return "icons/rockMusic.png";
    }
    if(genere=="classic")
    {
        return "icons/classicMusic.png";
    }
    if(genere=="jazz")
    {
        return "icons/jazzMusic.png";
    }
    if(genere=="metal")
    {
        return "icons/metalMusic.png";
    }
    if(genere=="pop")
    {
        return "icons/popMusic.png";
    }
    if(genere=="rap")
    {
        return "icons/rapMusic.png";
    }
    if(genere=="trap")
    {
        return "icons/trapMusic.png";
    }
    if(genere=="country")
    {
        return "icons/countryMusic.png";
    }
    if(genere=="hiphop")
    {
        return "icons/hiphopMusic.png";
    }
}
