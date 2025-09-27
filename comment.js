// ======= Load saved comments =======
let comments = JSON.parse(localStorage.getItem("comments")) || [];
let editingId = null;
renderComments();

// ======= Submit or Update Comment =======
function submitComment() {
  const name = document.getElementById('name').value.trim();
  const commentText = document.getElementById('comment').value.trim();

  if (!name || !commentText) {
    alert("Please enter both name and comment.");
    return;
  }

  // ===== Editing existing comment =====
  if (editingId !== null) {
    const index = comments.findIndex(c => c.id === editingId);

    // Only mark as edited if text actually changed
    if (comments[index].comment !== commentText) {
      if (!comments[index].edited) {
        comments[index].originalComment = comments[index].comment;
      }
      comments[index].comment = commentText;
      comments[index].edited = true;
    }

    editingId = null;
    document.querySelector("button[type='submit']").textContent = "Submit";

  } 
  // ===== Adding new comment =====
  else {
    const now = new Date();
    const newComment = {
      id: Date.now(),
      name,
      comment: commentText,
      originalComment: null,
      edited: false,
      liked: false,
      date: `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`,
      time: `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`
    };
    comments.push(newComment);
  }

  localStorage.setItem("comments", JSON.stringify(comments));
  document.getElementById('name').value = '';
  document.getElementById('comment').value = '';
  renderComments();
}

// ======= Render Comments =======
function renderComments() {
  const commentsDiv = document.getElementById('c');
  commentsDiv.innerHTML = '';

  if (comments.length === 0) {
    commentsDiv.innerHTML = `<p class="text-gray-500 italic">No comments yet. Be the first to comment!</p>`;
    return;
  }

  comments.forEach(c => {
    commentsDiv.innerHTML += `
      <div class="bg-gray-100 rounded-md p-3 mb-4">
        <p class="font-semibold">${c.name}</p>
        <p>${c.comment} ${c.edited ? '<span class="text-xs text-gray-500">(edited)</span>' : ''}</p>

        <div class="flex justify-between mt-2">
          <div class="text-xs text-gray-500">${c.date} • ${c.time}</div>
          <div>
            <button onclick="toggleLike(${c.id})" class="mr-2">${c.liked ? `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-red-500"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>` : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-5 h-5 text-gray-400"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`}</button>
            <button onclick="deleteComment(${c.id})" class="bg-red-600 text-white text-sm mr-2 hover:bg-red-500 py-1 px-4 rounded-md">Delete</button>
            <button onclick="editComment(${c.id})" class="bg-blue-600 text-white text-sm mr-2 hover:bg-blue-500 py-1 px-4 rounded-md">Edit</button>
            ${c.edited ? `<button onclick="seeOriginal(${c.id})" class="text-blue-500 text-xs">See original</button>` : ''}
          </div>
        </div>
      </div>
    `;
  });
}

// ======= Delete Comment =======
function deleteComment(id) {
  comments = comments.filter(c => c.id !== id);
  localStorage.setItem("comments", JSON.stringify(comments));
  renderComments();
}

// ======= Edit Comment =======
function editComment(id) {
  if (editingId !== null) {
    alert("Finish editing your current comment first!");
    return;
  }

  const commentToEdit = comments.find(c => c.id === id);
  if (!commentToEdit) return;

  document.getElementById('name').value = commentToEdit.name;
  document.getElementById('comment').value = commentToEdit.comment;

  editingId = id;
  document.querySelector("button[type='submit']").textContent = "Update";
}

// ======= See Original Comment =======
function seeOriginal(id) {
  const comment = comments.find(c => c.id === id);
  if (comment && comment.originalComment) {
    alert(`Original message:\n${comment.originalComment}`);
  }
}

// ======= Like Comment =======

function toggleLike(id) {
  const index = comments.findIndex(c => c.id === id);
  if (index !== -1) {
    comments[index].liked = !comments[index].liked;
    localStorage.setItem("comments", JSON.stringify(comments));
    renderComments();
  }
}


