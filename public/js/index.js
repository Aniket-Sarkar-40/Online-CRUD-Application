// require("dotenv").config();
const url = `http://localhost:8000/api`;

// let secKey = process.env.SECRET_KEY;
// console.log(secKey);

async function getData() {
    const res = await fetch(url);
    const users = await res.json();
    return users;

}

let a = getData()
    .then((data) => {
        let tableBody = document.getElementById('tableBody');
        let cardBody = document.getElementById('card');
        let dataObj = data;
        // console.log(dataObj);
        let html = "";
        let html2 = "";
        dataObj.forEach((element, i) => {
            html += `<tr>
                        <th scope="row"><div class= "form-check"> <input type="radio" onclick="delById()" name="radio" class="select" id="${i+1}" value = "${element._id}"></th></div>
                        <th scope="row">${i+1}</th>
                        <td>${element.name}</td>
                        <td>${element.phoneNumber}</td>
                        <td>${element.Email}</td>
                        <td>${element.Hobbies}</td>
                        
                    </tr>`;
            html2 += `<div class="col mb-4" >
                            <div class="card shadow h-100">
                                <div class="card-body text-center">
                                    <h5 class="card-title">${i+1}. ${element.name}</h5>
                                    <p class="card-title">${element.phoneNumber}, ${element.Email}</p>
                                    <p class="card-text">${element.Hobbies}.</p>
                                    <a href="/${element._id}/delete" class="btn btn-danger">Delete</a>
                                    <a href="/${element._id}/update" class="btn btn-info">Update</a>
                                    <a href="/${element._id}/mail" class="btn btn-success">Send Mail</a>
                                </div>
                            </div>
                        </div>`;

            tableBody.innerHTML = html;
            cardBody.innerHTML = html2;
        });
    }).catch((err) => {
        console.log("cant fetch");
    });

const delBtn = document.getElementById('delete')
const updateBtn = document.getElementById('update');
const mailBtn = document.getElementById('mail');
const updateButton = document.getElementById('updateButton');
let select = document.getElementsByClassName('select');
let reqId;


const delById = ()=>{
    Array.from(select).forEach(op => {
        if (op.checked) {
            reqId = op.value;
        }
    });
    // console.log(reqId);
    delBtn.setAttribute('href',`/${reqId}/delete`)
    updateBtn.setAttribute('href',`/${reqId}/update`);
    mailBtn.setAttribute('href',`/${reqId}/mail`);

}
