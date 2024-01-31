const button = document.getElementById('button');

const editBlog = async (event) => {
    event.preventDefault();
    console.log("click");

    const title = document.getElementById('title').value.trim();

    const article = document.getElementById('article').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    if(title && article) {
        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title,
                article,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.ok) {
            document.location.replace('/dashboard/');
          } else {
            alert(response.statusText);
          };
    } else {
        alert("Please enter title and contents for your article")
        return
    };
};

button.addEventListener('click', editBlog);
