document.getElementById('loginBtn').addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        email: document.querySelector("#email-login").value,
        password: document.querySelector('#password-login').value,
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

document.getElementById('signUpBtn').addEventListener("submit", e => {
    e.preventDefault();
    const userObj = {
        username: document.querySelector("#new_username-form").value,
        email: document.querySelector("#new-email-form").value,
        password: document.querySelector('#new-password-form').value,
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