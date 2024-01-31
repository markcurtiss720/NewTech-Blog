const deleteButton = document.getElementById('delete-btn');

const deleteBlog = async (event) => {
    event.preventDefault();
    console.log('click');

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
      
    console.log(id)
    const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }

}

deleteButton.addEventListener('click', deleteBlog);