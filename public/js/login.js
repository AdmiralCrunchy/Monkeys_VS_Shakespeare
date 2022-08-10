document.querySelector('#login').addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        email: document.querySelector("#login-email").value,
        password: document.querySelector('#login-password').value,
    }
    console.log(userObj)


    fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            location.href = "/chat"
        } else {
            alert("trumpet sound")
        }
    })
})