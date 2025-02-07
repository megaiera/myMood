/* DOM */
let internsList = document.querySelector('#internsList');
let filtersList = document.querySelector('#filter_radiobtns');
const accessManage = document.getElementById('access-management');
let internInfos = document.createElement('li');
internsList.appendChild(internInfos)

/* ROUTES API */

const protocol="http://localhost:3000";
const adminRoot="/admin";
const endpointUsers="/users";
const endpointGroups="/groups/";


let internsDataRequest=`${protocol}${adminRoot}${endpointUsers}`;
let token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbXltb29kLmZyIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzM4ODYxNTA3LCJleHAiOjE3Mzg5NDc5MDd9.qW0eLNgSuowN1x15KJ6oUE3QJirWuP1KbsY4y73por4";

let initParam={
     method:'GET',
     headers:{
          Accept:'application/json',
          Authorization: `Bearer ${token}` /* important! besoin du token admin pour accéder aux données */
     }}


/* FETCH RÉCUPÉRER TOUS LES UTILISATEURS */

fetch(internsDataRequest, initParam)
     .then(response => response.json())
     .then(data=> showInterns(data))
     .catch(error=>console.log(error));

function showInterns(data){
     console.log(data)
     for(let stagiaire of data[0]){
          let internInfos = document.createElement('li');
          internInfos.setAttribute("class", "oneIntern");
          internInfos.setAttribute("id", `${stagiaire.nom}${stagiaire.prenom}`);

          internInfos.innerHTML=`<span class="liName infoLabel"> ${stagiaire.prenom} </span>
          <span class="liSurname infoLabel"> ${stagiaire.nom} </span> 
          <select name="formations" class="liCourse infoLabel addIntern_selectCourse"> <option class=addIntern_option" value="${stagiaire.groupe}"> ${stagiaire.groupe} </option> </select>
          <span class="liMail infoLabel"> ${stagiaire.email} </span>
          <input type="checkbox" value="delete">`;

          internsList.appendChild(internInfos);
     }
}

/* FONCTION CRÉER UN NOUVEAU STAGIAIRE */
/* GESTION > CRÉATION LISTE DES STAGIAIRES */


/* FETCH RÉCUPÉRER TOUTES LES FORMATIONS */

let groupsRequest=`${protocol}${adminRoot}${endpointGroups}`;

fetch(groupsRequest, initParam)
     .then(response=>response.json())
     .then(data=>showGroups(data))
     .catch(error=>console.log(error));

/* GESTION > MENU FORMATIONS */

function showGroups(data){
     console.log(data)
     for (let formation of data){
          let formationLi = document.createElement('li');
          formationLi.setAttribute('class', 'formationLi');
          formationLi.innerHTML=`<input id="${formation.id_groupe}" type="radio" name="team">
           <label for="${formation.id_groupe}"> ${formation.nom_groupe} </label>`
          filtersList.appendChild(formationLi);
     }
}

/* GESTION > CRÉER UN NOUVEAU GROUPE */

function createNewCourse(){
     const courseName = document.getElementById('addCourseTextInput').value;
     if (!courseName){
          alert('Des caractères doivent être entrés');
          return;
     }

     const newCourse = {nom_groupe: courseName};

     fetch(groupsRequest, {
          method: 'POST',
          headers: {
               'Content-Type':'application/json',
               Authorization: `Bearer ${token}` /* important! besoin du token admin pour accéder aux données */
          },
          body:JSON.stringify(newCourse)
     })
     .then(response=> response.json())
     .then(data=> {
          console.log('Groupe créee?', data);
     })
     .catch(error=>console.error('Erreur', error))
}

/* GESTION > SUPPRIMER UN GROUPE */

