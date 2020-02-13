const postGet = 'https://api.thecatapi.com/v1/images/search';

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




const myPromise = request(postGet);
console.log('will be pending when logged', myPromise)

myPromise
    .then(function imprimirPosts(json) {
        console.log('when resolve is found it comes here with the response, in this case posts ')

        const listGato = JSON.parse(json);
        listGato.forEach(gato => document.getElementById("gato").innerHTML = "<img src="+gato.url+">");

    })
    .catch(function handleErrors(error) {
        console.log('when a reject is executed it will come here ignoring the then statement ', error)
    })
