//Susikurti folderi -> client (4paskaitoj)
//client susikurti index html ir js
//index html pasirasau tvarkingai

fetch("http://localhost:5050")
.then(resp => resp.json())
.then(response => {
    console.log(response);
    const ul = document.createElement("ul");
    response.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = user;
        ul.append(li);
    });
    document.body.append(ul);
})
.catch((error) =>console.log(error));

fetch("http://localhost:5050/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(["Domante"])
  });