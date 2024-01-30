const button = document.getElementById('button')

const createBlog = async (event) => {
    event.preventDefault();
    console.log("click");

    const title = document.getElementById('blogTitle').value.trim();

    const article = document.getElementById('articleText').value.trim();

    if(title && article) {
        const response = await fetch('/api/create', {
            method: 'POST',
            body: JSON.stringify({
                title,
                article,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.href = '/dashboard';
        } else {
            alert(response.statusText);
        }
    } else {
        alert("Please enter title and contents for your article")
        return
    }
}


button.addEventListener('click', createBlog);
