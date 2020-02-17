const categorias = 'https://api.thecatapi.com/v1/categories';
var catID; //Esto lo pongo así aquí para acordarme que tengo que meterlo luego en una función y añadirselo a la url de abajo, la de la constante imágenes
const imagenes = 'https://api.thecatapi.com/v1/images/search?size=9&category_ids='+catID;

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




const myPromise = request(categorias);
console.log('will be pending when logged', myPromise)

myPromise
    .then(function imprimirPosts(json) {
        console.log('when resolve is found it comes here with the response, in this case posts ')

        const listGato = JSON.parse(json);
        listGato.forEach(gato => document.getElementById("gato").innerHTML += "<option value="+gato.name+">"+gato.name+"</option>");

    })
    .catch(function handleErrors(error) {
        console.log('when a reject is executed it will come here ignoring the then statement ', error)
    })
