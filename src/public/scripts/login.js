let usernameLogin, passwordLogin;

function createCookie(name, value, days) {
    var expires = '', date = new Date();
    if (days) {
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
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
            body: JSON.stringify({"username": usernameLogin, "password": passwordLogin}),
        };

        fetch(apiUrl, requestData).then(
            (promise) => promise.json().then(
                (response) => {
                    if (!promise.ok) {
                        document.body.style.backgroundSize = "500px"
                        if (document.body.style.backgroundImage != ""){
                            document.body.style.backgroundImage = "url('https://ideogram.ai/assets/image/lossless/response/VpAOgmRzRhi20wg_ErsN1A')"
                        } else {
                            document.body.style.backgroundImage = "url('https://ideogram.ai/assets/image/lossless/response/w15c4iNnTHK5mCh9CZiF3A')"
                        }
                        setTimeout(() => {
                            document.body.style.backgroundImage = ""
                        }, 5000)
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

function handleUsernameLogin(e) {
    usernameLogin = e.target.value;
};

function handlePasswordLogin(e) {
    passwordLogin = e.target.value;
};

document.getElementById('loginForm').addEventListener('submit', handleFormSubmit);
document.getElementById('input-username').addEventListener('change', handleUsernameLogin);
document.getElementById('input-password').addEventListener('change', handlePasswordLogin);