const button = document.getElementById('button')

const createComment = async (event) => {
    event.preventDefault();
    console.log('click')

    const comment_text = document.getElementById('inputComment').value.trim();

    const blog_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];

        if (comment_text) {
            const response = await fetch('/api/comments', {
              method: 'POST',
              body: JSON.stringify({
                blog_id,
                comment_text
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
          
            if (response.ok) {
              document.location.reload();
            } else {
              alert(response.statusText);
            }
          }
    
}



button.addEventListener('click', createComment);
