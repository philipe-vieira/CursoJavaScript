// setTimeout(function(){ alert("Hello"); }, 3000);
var body = document.querySelector('body');
var input = document.querySelector('input');
var button = document.querySelector('button#addUser');
var list = document.createElement("ul");

// listLoading();

button.onclick = () => {
    
    SearchUser(input.value) 
    .then(function(resolve){
        
        if(resolve.name != undefined || resolve.length  == 0){

            alert("usuario indefinido");
        } else {
            var data =  resolve;
            listRepos(data);
        }
    })
    .catch(function(error){
        alert(error);
    });
}

function SearchUser(user) {
    return new Promise(
        (resolve, reject)=>{
            var request = new XMLHttpRequest();
            request.open("GET", "https://api.github.com/users/" + user + "/repos");
            request.send(null);
            listLoading();
            
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(JSON.parse(request.responseText));
                    } else {
                        reject("Erro na requisição");
                    }
                }
            }
        }
    );
}

function listRepos ( repos ) {
    list.innerHTML = '';

    for (repo of repos ) {
        var itemList = document.createElement('li');
        var linkItem = document.createElement('a');
        var textlink = document.createTextNode(repo.name);
        linkItem.setAttribute( 'href', repo.html_url);
        linkItem.setAttribute( 'target', '_blank')
        linkItem.appendChild(textlink);
        itemList.setAttribute( 'id', repo.id);
        itemList.appendChild(linkItem);

        list.appendChild(itemList);
    }

    body.appendChild(list);
}

function listLoading () {
    list.innerHTML = '';
    var itemList = document.createElement('li');
    var text = document.createTextNode("Carregando...");

    itemList.appendChild(text);

    list.appendChild(itemList);

    body.appendChild(list);
}




