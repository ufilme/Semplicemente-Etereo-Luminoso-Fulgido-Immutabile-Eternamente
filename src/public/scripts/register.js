let username, password;

async function handleFormSubmit(event){
    event.preventDefault()
    try {
        const apiUrl = "/api/auth/register";
    
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
                    if (!response.ok) {
                        console.log(response)
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