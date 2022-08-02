document.querySelector('#login').addEventListener("submit", e=>{
    e.preventDefault();
    const userObj = {
        email: document.querySelector("#login-email").value,
        password: document.querySelector('#login-password').value,
    }
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
          location.href = "/secretclub"
        } else {
            alert("trumpet sound")
        }
    })
})