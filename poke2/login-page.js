const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");

let redirect_Page = () => {
    let tID = setTimeout(function () {
        window.location.href = "http://127.0.0.1:5501/";
        window.clearTimeout(tID);		// clear time out.
    }, 100);
}
// location.reload();

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    if (username === "slee@talentpath.com" && password === "webdev") {
        alert("Welcome to the Kanto Pokedex!");
        redirect_Page()
    } else {
        loginErrorMsg.style.opacity = 1;
    }
})