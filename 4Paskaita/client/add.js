//POST darom
// const addNewUser = (event) => {
//     event.preventDefault();
//     // isitraukti  duomenis is formos
//     const name = document.getElementById("lname").value;
 
//     //susikuriame objekta
//     const newUser = {name: name.value};
//     //apsirasome metoda, ka darysime su duomenimis
//     const params = {
//         method: "POST",
//         body: JSON.stringify(newUser),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//         },
//     };

//     fetch("https://localhost:8080/users", params)
//     .then((resp) => resp.json())
//     .then((response) => {
//         console.log(response);
//     })
//     .catch((error) => {
//         console.error(error);
//     });
//     };
    
const names = [];

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("lname").value;
  names.push(name);

  fetch("http://localhost:5050/users", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(names),
  });
});