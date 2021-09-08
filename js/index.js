const d = document,
    $chat = d.getElementById(`chat`);

const message = (message, type) => {
    $content =  $chat.querySelector(`.messages-content`);
    let contenido = $content.innerHTML;
    let respuesta;
    if(type === `IN`){
        respuesta = 
        `
        <article>
            <p class="in-message">${message}</p>
        </article>
        `
    } else {
        respuesta = 
        `
        <article class="text-end">
            <p class="out-message">${message}</p>
        </article>
        `
    }

    $content.innerHTML = contenido + respuesta;
}

const postMessage = (text) =>{
    let options = {
        method: `POST`,
        headers: {
            "Content-Type": `application/json; charset=utf-8`,
            "Authorization": `ccc16cef-fb8c-436f-bd1e-3c8fa821c571`
        },
        body: JSON.stringify({
            "question":`<${text}>`
        })
    }
    fetch(`https://qanda-contestador.azurewebsites.net/qnamaker/knowledgebases/75f2fa53-ebbe-4db6-8ea7-003ed5f8c601/generateAnswer`, options)
    .then(res => res ? res.json() : Promise.reject())
    .then(json => {
        let content = json.answers[0].answer;
        message(content, `OUT`);
    })
    .catch(err => console.log(err));
}

d.addEventListener(`click`, (e)=>{
    let $btnEvent = e.target;
    if($btnEvent.matches(`.btn-send`)  && d.getElementById("txt-content").value !== ""){
        let contenido = d.getElementById("txt-content");
        message(contenido.value, `IN`)
        postMessage(contenido.value);
        contenido.value = "";
    }
});

d.addEventListener(`keyup`, (e)=> {
    let key = e.key;
    if(key === `Enter` && d.getElementById("txt-content").value !== ""){
        let contenido = d.getElementById("txt-content");
        message(contenido.value, `IN`)
        postMessage(contenido.value);
        contenido.value = "";
    }
})