console.log('hello world')

const form = document.getElementById('signInForm');
const username = document.getElementById('username');
const password = document.getElementById('password');


function redirect() {
    window.location.replace("http://localhost:3000/index.html")
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (username.value === "" || password.value === "") {
        alert("input fields cannot be empty");
    }
    postData(username.value, password.value);
})


function postData(username, password) {

    const url = `http://localhost:3000/signIn`;
    console.log(url);
    axios
        .post(url, { Password: password, username: username })
        .then((response) => {
            console.log(response);
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("id", JSON.stringify(response.data.id));
            alert("successfully signed In");
            window.location.replace('http://localhost:3000/upload.html')
        })
        .catch((error) => console.log(error));
}

