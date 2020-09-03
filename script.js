let filter = "alle";
let personer;
document.addEventListener("DOMContentLoaded", loadJSON)
async function loadJSON() {
    const JSONData = await
    fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
    personer = await JSONData.json();
    visPersoner();
    addEventlistenersToButtons();
}


function visPersoner() {
    const templatePointer = document.querySelector("template");
    const listPointer = document.querySelector("section");
    listPointer.innerHTML = "";
    personer.feed.entry.forEach(person => {
        if (filter == "alle" || filter == person.gsx$kategori.$t) {
            console.log(person);
            const minKlon = templatePointer.cloneNode(true).content;
            minKlon.querySelector("h2").textContent = person.gsx$navn.$t;
            minKlon.querySelector("img").src = "imgs/small/" + person.gsx$billede.$t + "-sm.jpg";
            minKlon.querySelector("article").addEventListener("click", () => visDeltaljer(person));
            listPointer.appendChild(minKlon);
        }
    })
}


function visDeltaljer(person) {
    console.log(visDeltaljer);
    popop.style.display = "block";
    popop.querySelector("h2").textContent = person.gsx$navn.$t;
    //    popop.querySelector("h2").textContent = person.gsx$efternavn.$t;
    popop.querySelector(".lang").textContent = person.gsx$lang.$t;
    popop.querySelector(".kategori").textContent = person.gsx$kategori.$t;
    popop.querySelector(".pris").textContent = person.gsx$pris.$t;
    //    popop.querySelector("img").src = person.gsx$billede.$t;
    popop.querySelector("img").src = "imgs/large/" + person.gsx$billede.$t + ".jpg";
}


document.querySelector("#luk").addEventListener("click", () => popop.style.display = "none");

function addEventlistenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h3").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visPersoner();
}
