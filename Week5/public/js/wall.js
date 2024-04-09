if(document.readyState !== "loading"){
    console.log("Document is ready");
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function(){
        console.log("Document ready after waiting!");
        initializeCode();
    })
}


function initializeCode() {
    const options = {
        edge: 'right',
        draggable: false,
        inDuration: 250,
        outDuration: 200,
        onOpenStart: null,
        onOpenEnd: null,
        onCloseStart: null,
        onCloseEnd: null,
        preventScrolling: true
    };

    const elems = document.querySelectorAll('.sidenav');
    const instances = M.Sidenav.init(elems, options);

    const addPoemButton = document.getElementById("add-poem");

    addPoemButton.addEventListener("click", function() {
        const poemInput = document.getElementById("poem-input");
        
        const vip = document.getElementById("vip");

        fetch("http://localhost:3000/api/poems", {
            method: "post",
            headers: {
                "Content-type": "application/json"
            },
            body: '{ "poem": "' + poemInput.value + '", "vip": ' + vip.checked + ' }'
           })
           .then(response => response.json())
           .then(data => {
               console.log(data);
           })


        addNewPoem(poemInput.value, vip.checked);
    });

    const addPoemButtonFromApi = document.getElementById("add-poem-from-api");

    addPoemButtonFromApi.addEventListener("click", function() {

        fetch("http://localhost:3000/api/poems")
            .then(response => response.json())
            .then(data => {
                data.forEach(poem => {
                    addNewPoem(poem.poem, poem.vip);  

                });
            });
    });
}

async function loadJson() {
    let url = "https://jsonplaceholder.typicode.com/posts";
    let response = await fetch(url);

    let poems = await response.json();
    console.log(poems);

    poems.forEach(poem => {
        addNewPoem(poem.title, false);    
    });
}


function addNewPoem(poem, vip) {
    const theWall = document.getElementById("the-wall");
    let newListItem = document.createElement("li");

    if (vip == true) {
        newListItem.classList.add("vip");
    }

    newListItem.classList.add("col", "s6", "m4", "l3");

    newListItem.appendChild(document.createTextNode(poem));

    theWall.appendChild(newListItem);
    console.log("Working... adding new stuff...")
}