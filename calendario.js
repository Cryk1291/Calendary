
if(localStorage.getItem("prova") == null){
    console.log("mimmo");
    var save_data = {
        Jan: {
            selected: []
        },
        Feb: {
            selected: []
        },
        Mar: {
            selected: []
        },
        Apr: {
            selected: []
        },
        May: {
            selected: []
        },
        Jun: {
            selected: []
        },
        Jul: {
            selected: []
        },
        Aug: {
            selected: []
        },
        Sep: {
            selected: []
        },
        Oct: {
            selected: []
        },
        Nov: {
            selected: []
        },
        Dec: {
            selected: []
        }
        
    }
    localStorage.setItem("prova", JSON.stringify(save_data));
}
else{
    console.log("mammo");
    var save_data = JSON.parse(localStorage.getItem("prova"));
    console.log(save_data);
}
    
const months = {
    Jenuary : { days : 31 , tag : "Jan"}, 
    February: { days : 28 , tag : "Feb"}, 
    March: { days : 31 , tag : "Mar"}, 
    April: { days : 30 , tag : "Apr"},  
    May: { days : 31 , tag : "May"},
    June: { days : 30 , tag : "Jun"}, 
    July: { days : 31 , tag : "Jul"}, 
    August : { days : 31 , tag : "Aug"}, 
    September : { days : 30 , tag : "Sep"}, 
    October: { days : 31 , tag : "Oct"}, 
    November : { days : 30 , tag : "Nov"},
    December: { days : 31 , tag : "Dec"},
}

/* CREAZIONE BOTTONI SCELTA MESI */
const cont_bottoni = document.querySelector("#button_container");
for(let mon of Object.entries(months)){
    const son = document.createElement('button');
    son.textContent = mon[0];
    son.classList.add("month_selection"); 
    son.id = mon[1].tag;
    cont_bottoni.appendChild(son);
}
/* AGGIUNTA EVENTO BOTTONI SCELTA MESI */
const bottoni = document.querySelectorAll(".month_selection");
for(let obj of bottoni)
    obj.addEventListener('click', handler);



const month = document.querySelectorAll('#container_mese'); //OTTERRO' UN VETTORE DI 12 CASELLE


function handler(event){
    const container = document.querySelector("#container");
    const mese_cliccato = event.currentTarget;
    console.log(mese_cliccato.id);
    
    const container_mese = document.createElement('div');
    const month = document.createElement('h1');
    month.textContent = mese_cliccato.textContent;
    container_mese.appendChild(month);
    container_mese.classList.add('container');
    container_mese.id = mese_cliccato.id;
    container.appendChild(container_mese); //INSERISCO IL CONTENITORE DEL MESE NEL CONTENITORE GENERICO
    for(let mon of Object.entries(months)){
        if(mon[0] === mese_cliccato.textContent){
            for(let i=0; i<mon[1].days; i++){
                const day_block = document.createElement('div'); //blocco del singolo giorno
                const day_block_number = document.createElement('div'); //NUMERO IN GRIGRIO GRANDE
                const day_tag = document.createElement('div'); //contenitore (GIORNO+ PRIME 3 LETTERE)
                const header = document.createElement('h3');  //SCRITTA "Prime 3 lettere del mese"
                
                day_block_number.classList.add('background-number');
                day_block_number.textContent = i+1; //NUMERO IN GRIGIO
                day_tag.classList.add('tag');
                header.textContent = mon[1].tag;
                day_block.classList.add('day');  
                day_block.id= i+1;
                day_tag.appendChild(header);
                day_block.appendChild(day_tag);
                day_block.appendChild(day_block_number);
                container_mese.appendChild(day_block);
            }
        }
    }
    crossHandler(mese_cliccato.id);
     
    /* AGGIUNGO AL MESE, LA POSSIBILITA' DI CLICCARE LE CASELLE */
    const days = document.querySelectorAll('.day');
    for(let j=0; j<days.length; j++)
        days[j].addEventListener('click', clickDay);
    

    const child = document.querySelector('#' + mese_cliccato.id);
    cont_bottoni.removeChild(child);
    //console.log(document.removeChild('#' + name));

/*
    for(let mon of Object.entries(months)){
        const container_mese = document.createElement('div');
        const month = document.createElement('h1');
        month.textContent = mon[0];
        container_mese.appendChild(month);
        container_mese.classList.add('container');
        container_mese.id = 'container_mese';
        container.appendChild(container_mese); //INSERISCO IL CONTENITORE DEL MESE NEL CONTENITORE GENERICO
        for(let i=0; i<mon[1].days; i++){
            const day_block = document.createElement('div'); //blocco del singolo giorno
            const day_block_number = document.createElement('div'); //NUMERO IN GRIGRIO GRANDE
            const day_tag = document.createElement('div'); //contenitore (GIORNO+ PRIME 3 LETTERE)
            const header = document.createElement('h3');  //SCRITTA "Prime 3 lettere del mese"
            
            day_block_number.classList.add('background-number');
            day_block_number.textContent = i+1; //NUMERO IN GRIGIO
            day_tag.classList.add('tag');
            header.textContent = mon[1].tag;
            day_block.classList.add('day');
            day_block.textContent = i+1;    
            day_tag.appendChild(header);
            day_block.appendChild(day_tag);
            day_block.appendChild(day_block_number);
            container_mese.appendChild(day_block);
        }
        const prova= container_mese.querySelectorAll('.day .cross');
    }*/
}

function clickDay(event){
    const day = event.currentTarget;   //CHI HO REALEMTNE CLICCATO
    const id = day.id;
    const key_set = Object.entries(save_data);
    const father = day.parentNode;

    if(day.querySelector('.cross') === null){   
        for(let i = 0; i<key_set.length; i++){   
            if(key_set[i][0] == father.id){
                key_set[i][1].selected.push(id);
                localStorage.setItem("prova", JSON.stringify(save_data));
                break;
            }
        }
        const image = document.createElement('img');
        image.classList.add('cross');
        image.src = "/img/cross.png";
        day.appendChild(image);
    }    
    else
    {
        for(let i = 0; i<key_set.length; i++){   
            if(key_set[i][0] == father.id){
                key_set[i][1].selected.pop(id);
                localStorage.setItem("prova", JSON.stringify(save_data));
                break;
            }
        }
        const cross = day.querySelector('.cross');
        day.removeChild(cross);
    }
 
}

function crossHandler(month){
    console.log("mese" + month);
    const key_set = Object.entries(save_data);
    for(let key of key_set){ //ESPLORO IL SET DI CHIAVI
        if(key[0] == month){
            const giorni_mese = document.querySelectorAll('.container #' + month + " .day");
            for(let j=0 ; j<key[1].selected.length; j++){
                const day = giorni_mese[key[1].selected[j] - 1];
                const image = document.createElement('img');
                image.classList.add('cross');
                image.src = "img/cross.png";
                day.appendChild(image);
            }
        }
        break;
    }
    
}
