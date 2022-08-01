fetch("http://localhost:8080/")
.then(resp => resp.json())
.then(response => {
    console.log(response);
    const ol = document.createElement("ol");
    response.forEach((car) => {
        const li = document.createElement("li");
        li.textContent = car;
        ol.append(li);
    });
    document.body.append(ol);
})
.catch((error) =>console.log(error));

fetch("http://localhost:8080/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(["Domante"])
  });