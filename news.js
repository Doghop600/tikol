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
const filterRating = document.querySelector('#filter-rating')
const imgRating = document.querySelector('#img-rating')


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
    const sortedData = data.sort((a, b) => b.rating - a.rating);

    newsSect.innerHTML = sortedData
        .map((item, index) => {
            const stars = Array(5)
                .fill('<i class="fa-regular fa-star"></i>') // Пустые звёзды
                .fill('<i class="fa-solid fa-star"></i>', 0, item.rating) // Закрашенные звёзды
                .join("");

            // Обработка отсутствия категории
            const categories = item.category && item.category.trim() !== "" 
                ? item.category.split(", ").map(cat => `<span class="category-item">${cat}</span>`).join(", ")
                : "No categories"; 

            return `<div class="divCard" data-index="${index}">
                <h5>${item.title}</h5>
                <p>${item.description}</p>
                <img src="${item.imgUrl}" alt="News Image"/>
                <p>
                    Categories:
                    ${categories}
                </p>
                <p>Rating: ${stars}</p>
                <p>Date: ${item.date}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>`;
        })
        .join("");
};



formAddNews.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formAddNews);
    const news = Object.fromEntries(formData);

    // Обработка пустого поля категории
    if (!news.category || news.category.trim() === "") {
        news.category = "No categories";
    }

    news.rating = Number(news.rating); // Преобразуем рейтинг в число
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
        document.querySelector("#edit-url").value = news.url
        

        openModal(editModal);
    }
});

// Save edited news
editModal.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();

    // Update the news item in the array
    const title = document.querySelector("#edit-title").value;
    const description = document.querySelector("#edit-description").value;
    const url = document.querySelector('#edit-url').value

    newsArr[editingIndex] = { title, description, url }; // Update the item
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

filterRating.addEventListener('change', () => {
    const filter = filterRating.value; // Получаем выбранное значение
    const filteredNews = newsArr.filter((item) => {
        return filter === 'all' || item.rating === Number(filter);
    });
    drawNews(filteredNews); // Отображаем отфильтрованные новости
});

imgRating.addEventListener('change', () => {
    const filterImg = imgRating.value
    const filtredImg = newsArr.filter((item) => {
        return filterImg === 'all' || (filterImg === 'without' && (!item.imgUrl || item.imgUrl.trim() === ''))
        || (filterImg === 'with' && item.imgUrl || item.imgUrl.trim() !== '');
    })
    drawNews(filtredImg)
})

function fetchData() {
    document.getElementById('loader').style.display = 'block';
    document.getElementById('content').style.display = 'none';
  
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
  
      const data = { name: 'John Doe', email: 'john.doe@example.com' };
  
      document.getElementById('data').textContent = JSON.stringify(data, null, 2);
      document.getElementById('content').style.display = 'block';
    }, 3000); 
  }
  
document.getElementById('fetchButton').addEventListener('click', fetchData);

const criptoUrl = 'https://api.coindesk.com/v1/bpi/currentprice.json'

function getCriptoData() {
    const output = document.querySelector('aside')

    fetch(criptoUrl).then(response => {
        return response.json()
    }).then(data=>{
        console.log(data)
        output.innerHTML = `USD-BTC: ${data.bpi.USD.rate} <br> EUR-BTC: ${data.bpi.USD.rate}`
    })
    .catch(error => {
        console.log(error)
        output.textContent = `error: ${error.massage}`
    })
    console.log(fetch(criptoUrl))
}
getCriptoData()

newsSect.addEventListener("click", (event) => {
    if (event.target.classList.contains("category-item")) {
        const cardElement = event.target.closest(".divCard");
        const cardIndex = Number(cardElement.dataset.index);
        const clickedCategory = event.target.textContent.trim();

        removeCategory(cardIndex, clickedCategory);
    }
});

const removeCategory = (index, category) => {
    const cardData = newsArr[index];

    // Удаляем категорию
    const categories = cardData.category.split(", ");
    const filteredCategories = categories.filter(cat => cat !== category);
    cardData.category = filteredCategories.join(", ");

    // Сохраняем изменения
    saveToLocalStorage();
    drawNews(newsArr);
};
