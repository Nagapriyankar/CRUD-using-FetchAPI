const postslist = document.querySelector('.posts-list')
const addPost = document.querySelector('.add-post-form')
const titleValue = document.getElementById('title-value')
const contentValue = document.getElementById('textarea')
const btnClick = document.querySelector('.btn')
const url = 'https://65069e523a38daf4803e871d.mockapi.io/todo'
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
            method: 'PATCH',
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



