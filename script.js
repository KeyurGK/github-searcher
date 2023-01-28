const APIURL = 'https://api.github.com/users/';
const form = document.getElementById('form');
const main = document.getElementById('main');
const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');



searchBtn.addEventListener('click', (e) =>
{
    e.preventDefault();
    const user = search.value;

    if(user){
        getUser(user);
        getRepo(user);
        search.value='';
    }
    else{
        alert('Please enter the username! ')
    }
});



async function getUser(user){
    const resp = await fetch(APIURL + user);
    const respData = await resp.json();
     if(respData.name === null){
        alert('Sorry, User does not exist!');
    }
    else{
        createUserCard(respData);
    }
    
}

async function getRepo(user){
    const resp=await fetch(APIURL + user + '/repos');
    const respData = await resp.json();

    addReposCard(respData);
}

function addReposCard(repos){
    const repoRow = document.getElementById('repoRow');
     repos.forEach((repo) =>
     {
        const repoRowEl=document.createElement('a');
        repoRowEl.href = repo.html_url;
        repoRowEl.innerText = repo.name;
        repoRow.appendChild(repoRowEl);

     });
}


function createUserCard(user){
    
 cardHTML = `
    <div class='card'>
    <div>
        <img class='avatar' src='${user.avatar_url}'
        alt='${user.name}'/>
    </div>
    <div class='user-info'>
        <h2>${user.name}</h2>
        <p>${user.bio}</p>

        <ul>
            <li>Location : ${user.location}</li>
            <li>Following : ${user.following}</li>
            <li>Repos : ${user.public_repos}</li>
        </ul>
        <div id = 'repoRow'>
        <h1>Repositories</h1></div>
    </div>
    
    </div>`;

    main.innerHTML = cardHTML;
}

