const categorias = 'https://api.thecatapi.com/v1/categories';
var imagenes = 'https://api.thecatapi.com/v1/images/search?limit=10&category_ids=';


function request(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.timeout = 2000;
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(xhr.status);
                }
            }
        };
        xhr.ontimeout = function () {
            reject('timeout')
        };
        xhr.open('get', url, true);
        xhr.send();
    });
}

document.getElementById("2").addEventListener("click", () => {
    pagina = 2;
});
document.getElementById("3").addEventListener("click", () => {
    pagina = 3;
});



document.getElementById("gato").addEventListener("change", () => {
   
    catID = document.getElementById("gato").value;
    imagenes=imagenes+catID;
    console.log("ESTA ES LA URL"+imagenes);
    const myPromise2 = request(imagenes);
    
    
    console.log('will be pending when logged', myPromise2)
    myPromise2
        .then(function imprimirPosts(json) {
            console.log('when resolve is found it comes here with the response, in this case posts ')

            const listGato = JSON.parse(json);
        console.log(listGato);
            document.getElementById("gatos").innerHTML = "";
            listGato.forEach(gato => document.getElementById("gatos").innerHTML += "<img src=" + gato.url + "><br>");

        })
        .catch(function handleErrors(error) {
            console.log('when a reject is executed it will come here ignoring the then statement ', error)
        })
});

const myPromise = request(categorias);
console.log('will be pending when logged', myPromise)

myPromise
    .then(function imprimirPosts(json) {
        console.log('when resolve is found it comes here with the response, in this case posts ')
        const listGato = JSON.parse(json);
        listGato.forEach(gato => document.getElementById("gato").innerHTML += "<option value=" + gato.id + ">" + gato.name + "</option>");

        var iu=document.getElementById("gato");
        for (let i =0; i<iu.length;i++){
        console.log(iu[i]);}
    })

    .catch(function handleErrors(error) {
        console.log('when a reject is executed it will come here ignoring the then statement ', error)
    })

