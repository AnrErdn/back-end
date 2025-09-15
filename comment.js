const comments = [];

function submitComment() {
  const name = document.getElementById('name').value.trim();
  const comment = document.getElementById('comment').value.trim();

  if (!name || !comment) {
    alert('Please enter both name and comment!');
    return;
  }

  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTime = `${hours}:${minutes}:${seconds} ${ampm}`;

  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0'); 
  const day = now.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const newComment = {
    name: name,
    comment: comment,
    date: formattedDate,
    time: formattedTime
  };

  comments.push(newComment);

  document.getElementById('name').value = '';
  document.getElementById('comment').value = '';

  renderComments();
}

function renderComments() {
  const commentsDiv = document.getElementById('c');
  commentsDiv.innerHTML = '';
  
  for (let i = 0; i < comments.length; i++) {
    const currentComment = comments[i];
    commentsDiv.innerHTML += `
    <div class="bg-gray-100 rounded-md p-3 mb-4">
      <p class="font-semibold">${currentComment.name}</p>
      <p>${currentComment.comment}</p>
      <div class="text-xs text-gray-500 mt-2 flex justify-end space-x-4">
        <span>${currentComment.date}</span>
        <span>${currentComment.time}</span>
      </div>
    </div>
    `;
  }
}

