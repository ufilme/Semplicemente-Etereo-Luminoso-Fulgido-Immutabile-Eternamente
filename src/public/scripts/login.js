let username, password;

function createCookie(name, value, days) {
    console.log(document.cookie)
    var expires = '', date = new Date();
    if (days) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
    console.log(document.cookie)
}

function handleFormSubmit(event){
    event.preventDefault()
    try {
        const apiUrl = "/api/auth/login";
    
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"username": username, "password": password}),
        };
    
        console.log("caca")
        fetch(apiUrl, requestData).then(
            (promise) => promise.json().then(
                (response) => {
                    if (!promise.ok) {
                        console.log(promise)
                    } else {
                        createCookie("token", response, 365)
                        window.location.href = "/";
                    }
                }
        ))
    
        } catch (error) {
        console.log(error);
    }
}

function handleUsername(e) {
    username = e.target.value;
};

function handlePassword(e) {
    password = e.target.value;
};

document.getElementById('loginForm').addEventListener('submit', handleFormSubmit);
document.getElementById('input-username').addEventListener('change', handleUsername);
document.getElementById('input-password').addEventListener('change', handlePassword);