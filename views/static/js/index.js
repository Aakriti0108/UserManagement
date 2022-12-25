let listDiv = document.getElementById('list-div');

let url = "http://localhost:4000";
let jwt_token = sessionStorage.getItem('token');
const options = { 
    headers : { 
        "authorization" : `${jwt_token}` 
    } 
};

let users = [];

let getClick = async (e) => {
    e.preventDefault();
    try {
        

        if(e.target.id == "logout"){
            sessionStorage.removeItem('token');
            window.location.replace(`${url}/login.html`);
        }

        if(e.target.className == "list-edit"){
            let id = e.target.parentNode.parentNode.querySelector(".list-hidden").innerText;
            let name = e.target.parentNode.parentNode.querySelector(".list-name").innerText;
            let profession = e.target.parentNode.parentNode.querySelector(".list-profession").innerText;
            let phone = e.target.parentNode.parentNode.querySelector(".list-phone").innerText;
            let tempName = prompt('Change Name? Keep Blank Otherwise : '+name);
            let tempProfession = prompt('Change Profession? Keep Blank Otherwise : '+profession);
            let tempPhone = prompt('Change Phone? Keep Blank Otherwise : '+phone);
            if(confirm('Confirm!')){
                if(tempName != ""){
                    name = tempName;
                }
                if(tempProfession!= ""){
                    profession = tempProfession;
                }
                if(tempPhone != ""){
                    phone = String(tempPhone);
                }
                if(tempPhone.length!=0 && tempPhone.length!=10){
                    alert("Invalid Phone Length :"+phone.length);
                    return;
                }
                let body = {
                    userId : id,
                    name : name,
                    profession : profession,
                    phone : phone
                }
                console.log(body);
                let response = await axios.post(`${url}/user/update-user`, body, options);
                if(response.data.success == true){
                    e.target.parentNode.parentNode.querySelector(".list-name").innerText = name;
                    e.target.parentNode.parentNode.querySelector(".list-phone").innerText = phone;
                    e.target.parentNode.parentNode.querySelector(".list-profession").innerText = profession;
                }
            }
        }

        if(e.target.className == "list-delete"){
            let id = e.target.parentNode.parentNode.querySelector(".list-hidden").innerText;
            let body = {
                userId : id
            }
            let response = await axios.post(`${url}/user/delete-user`, body, options);
            console.log(response);
            if(response.data.success == true){
                e.target.parentNode.parentNode.remove();
            }
        }

    } catch (error) {
        console.log(error);
    }

}

let loadUsers = async (e) =>{ 
    e.preventDefault();
    try {
        if(!sessionStorage.getItem('token')){
            window.location.replace(`${url}/login.html`);
            return;
        }

        let response = await axios.get(`${url}/user/get-all-users`, options);
        console.log(response);
        if(response.data.success==true){

            users = response.data.data;
            if(users.length>0){
                let textHtml = "";
                for(let i=0;i<users.length;i++){
                    textHtml += `<div id="list-item${users[i]._id.toString()}" class="list-item">
                                    <div class="list-hidden" style="display:none;">${users[i]._id.toString()}</div>
                                    {
                                    <div class="list-span">Name : <div class="list-name">${users[i].name}</div></div>
                                    <div class="list-span">Email : <div class="list-email">${users[i].email}</div></div>
                                    <div class="list-span">Profession : <div class="list-profession">${users[i].profession}</div></div>
                                    <div class="list-span">Phone : <div class="list-phone">${users[i].phone}</div></div>
                                    }
                                    <div class="list-span"><button class="list-edit">Edit<button></div>
                                    <div class="list-span"><button class="list-delete">Delete<button></div>
                                </div>`;
                }
                document.getElementById('list-div').innerHTML += textHtml;
            }else{
                alert("No Users To Show!");
            }

        }else{
            alert("No Response From Server!");
            console.log("Success Failure! : ",response);
        }

    } catch (error) {
        console.log(error);
    }
}

document.addEventListener("click",getClick);
document.addEventListener("DOMContentLoaded",loadUsers);