console.log('hello world')

const form = document.getElementById('myForm');
const firstName = document.getElementById('firstname');
const lastName = document.getElementById('lastname');
const username = document.getElementById('username');
const password = document.getElementById('password');


function redirect() {
    window.location.replace("http://localhost:3000/signIn.html")
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (firstName.value === "" || lastName.value === "" || username.value === "" || password.value === "") {
        alert("input fields cannot be empty");
    }
    postData(firstName.value, lastName.value, username.value, password.value);
})


function postData(firstname, lastname, username, password) {

    const url = `http://localhost:3000/signUp`;
    console.log(url);
    axios
        .post(url, { FirstName: firstname, LastName: lastname, Password: password, Username: username })
        .then((response) => {
            console.log(response);
            console.log(response.data.token)
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("id", JSON.stringify(response.data.id));
            alert("successfully signed up");
            window.location.replace('http://localhost:3000/upload.html')
        })
        .catch((error) => console.log(error));
}
