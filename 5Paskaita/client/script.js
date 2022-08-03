//padarom GET is musu sukurto serverio
//atsidarom console narsyklej ir turim matyt vardus
fetch("http://localhost:8080/names")
.then((resp) => resp.json())
.then((response) => {
    console.log(response);
    //susikuriam atvaizdavima html'e
    const ul = document.createElement("ul");

    //kiekvienam naujam vardui sukuriam li elementa ir sudedam i ul
    response.forEach(name => {
        const li = document.createElement("li");
        li.textContent = name;
        ul.append(li);
    });
    document.body.append(ul);
})
.catch((error) =>console.log(error));