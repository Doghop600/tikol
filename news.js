const newsArr = []
const closeBtn = document.querySelector('#closeBtn')
const formAddNews = document.querySelector('#formAddNews')
const btnNews = document.querySelector('#news-btn')
const newsSect = document.querySelector('.news')
const notifications = document.querySelector(".notifications")
const modal = document.querySelector('#edit-modal')
const editForm = document.querySelector('#edit-form')

const openModal = () => {
    modal.classList.add('open');
    overlay.classList.add('open');
  };
const closeModal = () => {
    modal.classList.remove('open');
    overlay.classList.remove('open');
    editingProductId = null; // Clear editing state
  };

btnNews.addEventListener('click', function () {
    formAddNews.style.display = 'flex'
})

const drawNews = (data) => {
    newsSect.innerHTML = data
        .map((item, index) => {
            return `<div class="divCard" data-index="${index}">
                <h5>${item.title}</h5>
                <p>${item.description}</p>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>`;
        })
        .join('');
};

formAddNews.addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(formAddNews);
    const news = Object.fromEntries(formData);

    newsArr.push(news);

    drawNews(newsArr);

    formAddNews.style.display = 'none';

    createToast('success');
});

// Обработчик для кнопки Close
closeBtn.addEventListener('click', function (event) {
    event.preventDefault(); // Предотвращает поведение по умолчанию (например, submit)
    formAddNews.style.display = 'none'; // Просто закрывает форму
});


const toastDetails = {
    timer: 5000,
    success: {
        icon: "fa-circle-check",
        text: "Новость успешно добавлена!",
    },
    error: {
        icon: "fa-circle-xmark",
        text: "Ошибка: невозможно удалить эту карточку.",
    },
    info: {
        icon: "fa-circle-info",
        text: "Информация об удалении.",
    },
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

// Удаление карточек
newsSect.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        const card = event.target.closest('.divCard');
        const index = Number(card.dataset.index);

        
        newsArr.splice(index, 1);
        drawNews(newsArr);
        createToast('success');
        
    }

    if(event.target.classList.contains('edit-btn')) {
        openModal()
    }

});

editForm.addEventListener('submit', function(event) {
    event.preventDefault()
})