const form = document.getElementById("form");
form.addEventListener("submit", submitForm);
const formData = new FormData();
const file = document.getElementById("file");
function submitForm(e) {
  e.preventDefault();
  formData.append("user_file",file.files[0])
  // console.log(file.files[0]);
  fetch("http://localhost:8000/upload", {
    method: "POST",
    body: formData
  })
    .then((res) => {
      alert("File uploaded");
    })
    .catch((err) => console.log("Something went wrong",err));
}
