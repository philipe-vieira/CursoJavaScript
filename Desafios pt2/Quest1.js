// setTimeout(function(){ alert("Hello"); }, 3000);
function checaIdade(idade) {
    return new Promise(
        (resolve, reject)=>{
            setTimeout(()=>{
                if (idade > 18) {
                    resolve();
                } else {
                    reject();
                }
            }, 2000)
        }
    );
}

checaIdade(50)
    .then(function() {
    console.log("Maior que 18");
    })
    .catch(function() {
    console.log("Menor que 18");
    });