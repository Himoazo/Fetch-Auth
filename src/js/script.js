"use strict";
const url = "https://auth-production-afa2.up.railway.app/api/workexperiences/" //API url

fetchData();
// Hämta lagrad data från db . GET
async function fetchData() {
    const tbody = document.getElementById("data");
    try {
        const response = await fetch(url);
        const data = await response.json();
        //Loop genom inhämtad data och skapa tr för varje entry med tillhörande tds
        for(let entry of data){
            let id = entry._id;
            const tr = document.createElement("tr");
            tr.classList.add("exp");
            const td1 = document.createElement("td");
            td1.classList.add(id);
            td1.textContent = entry.companyname;
            td1.contentEditable = true;
            const td2 = document.createElement("td");
            td2.classList.add(id);
            td2.textContent = entry.jobtitle;
            td2.contentEditable = true;
            const td3 = document.createElement("td");
            td3.classList.add(id);
            td3.textContent = entry.location;
            td3.contentEditable = true;
            const td4 = document.createElement("td");
            td4.classList.add(id);
            td4.contentEditable = true;
            td4.textContent = new Date(entry.startdate).toLocaleDateString(); //Formatera date som kommer från sql
            const td5 = document.createElement("td");
            td5.classList.add(id);
            // Visa "pågående" om inget slutdatum angivit
            if(entry.enddate == null){
                td5.textContent = "Pågående";
            }else{
                td5.textContent = new Date(entry.enddate).toLocaleDateString();
            }
            td5.contentEditable = true;
            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delBtn"); 
            deleteBtn.textContent = "Delete";
            //Event for Delete knappen
            deleteBtn.addEventListener("click", ()=>{ 
                deleteEntry(id);
            });
            const td6 = document.createElement("td");
            td6.appendChild(deleteBtn);
            const editBtn = document.createElement("button");
            editBtn.classList.add("editBtn");
            editBtn.textContent = "Edit";
            //Event for edit knappen
            editBtn.addEventListener("click", ()=>{
                editEntry(id);
            });
            const td7 = document.createElement("td");
            td7.appendChild(editBtn);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);
            tbody.appendChild(tr);
        }
        
    } catch (error) {
        console.error('Fetch error:', error);
    }
} 

// funktion för att ta bort en rad från db vid viss id- DELETE request
async function deleteEntry(id){
    const confirm = window.confirm("Är du säker att du vill ta bort denna arbetserfarenhet?");

    if(confirm){
        let error;
        try {   
            const token = sessionStorage.getItem('token');
            const response = await fetch(`https://auth-production-afa2.up.railway.app/api/workexperiences/${id}`, 
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                }, 
                credentials: "include"
            });
            
            const data = await response.json();
            if(response.status == 401){
            throw new Error(data.message);
        }
            } catch (err) {
                error = err;
                document.getElementById("editError").textContent = error;
            } finally{
                if(!error){
                    window.location.reload();
                }
            }
    }else{
        console.log("avbruten borttagning");
    }   
}
// Triggas vid klick på edit knappen
function editEntry(id){
    let tdATA = document.getElementsByClassName(id);

    if(tdATA[4].textContent == "Pågående"){

    }
    let expEdit = {
        companyname: tdATA[0].textContent,
        jobtitle: tdATA[1].textContent,
        location: tdATA[2].textContent,
        startdate: tdATA[3].textContent,
        enddate: tdATA[4].textContent
    }
    const confirm = window.confirm("Är du säker att du vill ändra uppgifter i en arbetserfarenhet?");
    if (expEdit.companyname && expEdit.jobtitle && expEdit.location && expEdit.startdate){
        if(confirm){
            putData(expEdit, id);
        }else{
            return;
        }
        
    }else{
        document.getElementById("editError").textContent = "Vänligen fyll i alla obligatoriska fällt";
    }
    
}
// PUT request, redigerar data in en rad i db
async function putData(expEdit, id){
    let error;
    try {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`https://auth-production-afa2.up.railway.app/api/workexperiences/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify(expEdit),
            credentials: "include"
        });
        const data = await response.json();
        if(response.status == 401){
            throw new Error(data.message);
        }
        
    } catch (err) {
        error = err;
        document.getElementById("editError").textContent = "Det gick inte att redigera pga: " + error;
    }finally{
        if(!error){
            document.getElementById("editError").textContent = "En arbetserfarenhet har redigerats";
        }
    }
}






