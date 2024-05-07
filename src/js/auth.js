"use strict"

const url = "https://auth-production-afa2.up.railway.app/api/" 
const login = document.getElementById("login");
//Event listener för logga in knappen
login.addEventListener("click", async (event)=>{
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    //Kontroll att fälten är ifyllda
    if(!username || !password){
        return document.getElementById("printed").textContent = "Felaktigt användarnamn/lösenord";
    }

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

        const data = await response.json();
        
        //If server side error
        if(response.status == 400){
            throw new Error("Invalid username/password");
        }else if(response.status == 401){
            throw new Error("Incorrect username/password");
        }else{
            sessionStorage.setItem("token", data);
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

    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();
    const email = document.getElementById("email").value.trim(); 

    //Kontroll att fälten är korrekta
    if(!newUsername || !newPassword || !email){
        return document.getElementById("printed").textContent = "Alla fält måste vara ifyllda";
    }
    //Kontrollera email format
    const emailRx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const correctFormat = emailRx.test(email);
    if(correctFormat == false){
        return document.getElementById("printed").textContent = "Email formatet måste vara xxx@xxx.xxx";
    }
    //Kontrollera att lösenordet är minst 6 char
    const passRx = /^.{6,}$/;
    const correctPass = passRx.test(newPassword);
    if(correctPass == false){
        return document.getElementById("printed").textContent = "Lösenordet måste minst innehålla 6 tecken";
    }
    
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