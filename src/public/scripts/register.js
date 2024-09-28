let usernameRegister, passwordRegister;

async function handleFormSubmit(event){
    event.preventDefault()
    try {
        const apiUrl = "/api/auth/register";
    
        const requestData = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"username": usernameRegister, "password": passwordRegister}),
        };
    
        fetch(apiUrl, requestData).then(
            (promise) => promise.json().then(
                (response) => {
                    if (!promise.ok) {
                        document.body.style.backgroundSize = "500px"
                        if (document.body.style.backgroundImage != ""){
                            document.body.style.backgroundImage = "url('https://ideogram.ai/assets/image/lossless/response/7EyJ7arVRhycc4UgFeb1ww')"
                        } else {
                            document.body.style.backgroundImage = "url('https://ideogram.ai/assets/image/lossless/response/3zxK9R6HSHm9ZP8gcHTu7g')"
                        }
                        setTimeout(() => {
                            document.body.style.backgroundImage = ""
                        }, 5000)
                    } else {
                        window.location.href = "/auth/login";
                    }
                }
        ))
    
        } catch (error) {
        console.log(error);
    }
}

function handleUsernameRegister(e) {
    usernameRegister = e.target.value;
};

function handlePasswordRegister(e) {
    passwordRegister = e.target.value;
};

document.getElementById('loginForm').addEventListener('submit', handleFormSubmit);
document.getElementById('input-username').addEventListener('change', handleUsernameRegister);
document.getElementById('input-password').addEventListener('change', handlePasswordRegister);