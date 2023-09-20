const postslist = document.querySelector('.posts-list')
const addPost = document.querySelector('.add-post-form')
const titleValue = document.getElementById('title-value')
const contentValue = document.getElementById('textarea')
const btnClick = document.querySelector('.btn')
const url = 'https://65098c5df6553137159ba347.mockapi.io/todos'
let output = '';

const renderPosts = (posts) => {
    posts.forEach(post => {
        output += `
            <div class="card mt-4 col-md-6 bg-ligt">
            <div class="card-body" data-id="${post.id}">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.content}</p>
                <a href="#" class="card-link" id='edit-post'>Edit</a>
                <a href="#" class="card-link" id='delete-post'>Delete</a>
            </div>
        </div>`
    });
    postslist.innerHTML = output
}

/* Get : Read the posts 
Method : GET*/
fetch(url)
    .then(res => res.json())
    .then(data => { renderPosts(data) });

/* Create : Submit new post
   Method : POST */

addPost.addEventListener('submit', (e) => {
    e.preventDefault();

    let newTask = {
        title: titleValue.value,
        content: contentValue.value,
    }

    fetch(url, {
        method: 'POST',
        header: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
        .then(res => res.json())
        .then(data => {
            const dataArr = []
            dataArr.push(data)
            renderPosts(dataArr)
        })
    //reset input field to empty

    titleValue.value = ''
    contentValue.value = ''
})

/*  */

postslist.addEventListener('click', (e) => {
    e.preventDefault()
    let delButtonPressed = e.target.id == 'delete-post'
    let editButtonPressed = e.target.id == 'edit-post'

    let id = e.target.parentElement.dataset.id

    //Delete - remove existing post
    //Method: DELETE

    if (delButtonPressed) {
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => location.reload())
    }
    if (editButtonPressed) {
        const parent = e.target.parentElement
        let titleContent = parent.querySelector('.card-title').textContent
        let bodyContent = parent.querySelector('.card-text').textContent
        titleValue.value = titleContent
        contentValue.value = bodyContent
    }

    /* update - update the existing post
        Methid: FETCH */
    btnClick.addEventListener('click', (e) => {
        e.preventDefault()
        fetch(`${url}/${id}`, {
            method: 'PUT',
            header: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: titleValue.value,
                content: contentValue.value
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
    })


})


var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
    "title": "Priyanka",
    "content": "This uis a content area"
});

var requestOptions = {
    method: 'PATCH',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

fetch("https://65098c5df6553137159ba347.mockapi.io/todos/2", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
