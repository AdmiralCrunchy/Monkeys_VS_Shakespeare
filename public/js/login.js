document.getElementById('loginBtn').addEventListener("click", e => {
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
            console.log("this worked")
            Logged_in = true;
            location.href = "/chat"
        } else {
            alert("trumpet sound")
        }
    })
})

document.getElementById('signUpBtn').addEventListener("click", e => {
    e.preventDefault();
    console.log("You are pressing this button")
    const userObj = {
        username: document.querySelector("#new-username-form").value,
        email: document.querySelector("#new-email-form").value,
        password: document.querySelector('#new-password-form').value,
    }
    console.log(userObj)

    fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userObj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => {
        if (res.ok) {
            Logged_in = true;
            location.href = "/chat"
        } else {
            alert("trumpet sound")
        }
    })
})