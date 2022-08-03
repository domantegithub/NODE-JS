//issitraukiam forma
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  //issitraukiam varda
  const nameInput = document.getElementById("lname");
  console.log(nameInput.value);

  const nameObject = { name: nameInput.value };
  console.log(nameObject);
  //apsirasom metoda
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nameObject),
  };
//gavom varda papostinam ji
  fetch("http://localhost:8080/names", options)
    .then((resp) => resp.json())
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.error(error));
});