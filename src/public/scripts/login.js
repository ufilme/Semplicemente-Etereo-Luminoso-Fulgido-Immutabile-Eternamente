let username, password;

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None";
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
    
        fetch(apiUrl, requestData).then(
            (promise) => promise.json().then(
                (response) => {
                    if (!promise.ok) {
                        console.log(promise)
                    } else {
                        setCookie("token", response, 365)
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