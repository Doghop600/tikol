// Selectors
const newsArr = [];
const formAddNews = document.querySelector("#formAddNews");
const btnNews = document.querySelector("#news-btn");
const newsSect = document.querySelector(".news");
const notifications = document.querySelector(".notifications");
const addNewsModal = document.querySelector("#add-news-modal");
const editModal = document.querySelector("#edit-modal");
const overlay = document.querySelector("#modal-overlay");
const closeAddNewsModalBtn = document.querySelector(".close-modal-btn");
const closeEditModalBtn = document.querySelector("#close-edit-modal");
const chanelBtn = document.querySelector('#chanelBtn')
const filterCategory = document.querySelector('#filter-category')

let editingIndex = null; // To store the index of the card being edited

// Functions to open/close modals
const openModal = (modal) => {
    modal.classList.add("open");
    overlay.classList.add("open");
};
const closeModal = (modal) => {
    modal.classList.remove("open");
    overlay.classList.remove("open");
};

// Save to localStorage
const saveToLocalStorage = () => {
    try {
        localStorage.setItem("news", JSON.stringify(newsArr));
        console.log("Data saved to localStorage:", newsArr);
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};


// Load from localStorage
const loadFromLocalStorage = () => {
    try {
        const storedNews = JSON.parse(localStorage.getItem("news"));
        if (storedNews) {
            newsArr.push(...storedNews);
            drawNews(newsArr);
        }
        console.log("Data loaded from localStorage:", newsArr);
    } catch (error) {
        console.error("Error loading from localStorage:", error);
    }
};


// Закрытие модального окна редактирования
closeEditModalBtn.addEventListener('click', () => {
    closeModal(editModal); // Закрываем модальное окно редактирования
});


closeEditModalBtn.addEventListener('click', () => {
    closeModal(editModal)
})

// Add News Modal
btnNews.addEventListener("click", () => openModal(addNewsModal));
closeAddNewsModalBtn.addEventListener("click", () => closeModal(addNewsModal));
overlay.addEventListener("click", () => {
    closeModal(addNewsModal);
    closeModal(editModal);
});

// Draw news cards
const drawNews = (data) => {
    newsSect.innerHTML = data
        .map((item, index) => {
            return `<div class="divCard" data-index="${index}">
                <h5>${item.title}</h5>
                <p>${item.description}</p>
                <img src=${item.imgUrl}/>
                <p>#${item.category}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>`;
        })
        .join("");
};

// Add news
formAddNews.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formAddNews);
    const news = Object.fromEntries(formData);

    newsArr.push(news);
    drawNews(newsArr);
    saveToLocalStorage();

    closeModal(addNewsModal);
    formAddNews.reset();

    createToast("success");
});

// Toast notifications
const toastDetails = {
    timer: 5000,
    success: { icon: "fa-circle-check", text: "Operation successful!" },
    error: { icon: "fa-circle-xmark", text: "Error occurred!" },
};

const removeToast = (toast) => {
    toast.classList.add("hide");
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
};

const createToast = (id) => {
    const { icon, text } = toastDetails[id];
    const toast = document.createElement("li");
    toast.className = `toast ${id}`;
    toast.innerHTML = `<div class="column">
                           <i class="fa-solid ${icon}"></i>
                           <span>${text}</span>
                        </div>
                        <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast);
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
};

// Delete and Edit functionality
newsSect.addEventListener("click", (event) => {
    const card = event.target.closest(".divCard");
    const index = Number(card.dataset.index);

    // Deleting a card
    if (event.target.classList.contains("delete-btn")) {
        newsArr.splice(index, 1);
        drawNews(newsArr);
        saveToLocalStorage();
        createToast("success");
    }

    // Editing a card
    if (event.target.classList.contains("edit-btn")) {
        editingIndex = index; // Save the index of the card being edited

        // Populate the edit form with the existing data
        const news = newsArr[editingIndex];
        document.querySelector("#edit-title").value = news.title;
        document.querySelector("#edit-description").value = news.description;

        openModal(editModal);
    }
});

// Save edited news
editModal.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Update the news item in the array
    const title = document.querySelector("#edit-title").value;
    const description = document.querySelector("#edit-description").value;

    newsArr[editingIndex] = { title, description }; // Update the item
    drawNews(newsArr); // Redraw the news cards
    saveToLocalStorage();
    
    closeModal(editModal); // Close the modal
    createToast("success"); // Show success toast
    editingIndex = null; // Reset the editing index
});

// Load data on page load
document.addEventListener("DOMContentLoaded", loadFromLocalStorage);

filterCategory.addEventListener('change',() => {
    const filter = filterCategory.value
    console.log(filter)
    const result = newsArr.filter((item)=>{
        return filter === 'all' || item.category === filter
    })
    drawNews(result)
})

