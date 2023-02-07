function order() {
  const sort = document.querySelector('#sort')
  console.log(sort.value)
}

const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelectorAll("#password, #confirmPassword");

togglePassword.addEventListener("click", function () {
  // toggle the type attribute
  password.forEach(p => {
    const type = p.getAttribute("type") === "password" ? "text" : "password";
    p.setAttribute("type", type);
    // toggle the icon
    this.classList.toggle("bi-eye")
  })

})