"use strict"

const url = "https://auth-production-afa2.up.railway.app/api/" 
const login = document.getElementById("login");
//Event listener för logga in knappen
login.addEventListener("click", async (event)=>{
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let error;
    try {
        const response = await fetch(url + "login", {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        
        //If server side error
        if(response.status == 400){
            throw new Error("Invalid username/password");
        }else if(response.status == 401){
            throw new Error("Incorrect username/password");
        }
        
        
    } catch (err) {
        error = err;
        document.getElementById("printed").textContent = "Det gick inte att logga in pga: " + error.message;
    }finally{
        if(!error){
            document.getElementById("printed").textContent = "Nu är du inloggad";
            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
        }
    }
});


const signup = document.getElementById("signup");
//Event listener för skapa konto knappen
signup.addEventListener("click", async (event)=>{
    event.preventDefault();

    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const email = document.getElementById("email").value; 

    let account = {
        username: newUsername,
        password: newPassword,
        email: email
    }
    let error;
    try {
        const response = await fetch(url + "register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(account)
        });
       
        //If server error
        if(response.status == 400){
            throw new Error("Invalid Invalid input");
        }else if(response.status == 500){
            throw new Error("Internal server error");
        }
        
    } catch (err) {
        error = err;
        document.getElementById("printed").textContent = "Det gick inte att skapa konto pga: " + error.message;
    }finally{
        if(!error){
            document.getElementById("printed").textContent = "Ditt konto har skapats";
            document.getElementById("newUsername").value = "";
            document.getElementById("newPassword").value = "";
            document.getElementById("email").value = ""; 
        }
    }
    });