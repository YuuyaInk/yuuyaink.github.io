const jsonData = [
    {
        "name": "Home",
        "link": "/",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Contact",
        "link": "/contact.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Privacy Policy",
        "link": "/privacy.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
    {
        "name": "Terms of Use",
        "link": "/terms.html",
        "image": "/assets/images/logo.png",
        "text": "",
        "date": "March 11, 2024"
    },
];

let searchTerm = '';
let filteredResults = [];
const resultsPerPage = 3;
let currentPage = 1;

function filterResults(data, searchTerm) {
    return data.filter(item => item.name.toLowerCase().includes(searchTerm));
}

function getSearchParams() {
    const urlParams = new URLSearchParams(window.location.search);
    searchTerm = urlParams.get('s') || ''; // Obtém o valor de "?s=" da URL
    currentPage = parseInt(urlParams.get('p')) || 1; // Obtém o valor de "?p=" da URL
}

function search() {
    searchTerm = document.getElementById('searchInput').value.toLowerCase();
	getSearchParams(); // Obtém os parâmetros da URL
    filteredResults = filterResults(jsonData, searchTerm);

       const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('s', searchTerm);
    newUrl.searchParams.set('p', currentPage); // Atualiza "?p=" na URL
    window.history.pushState({ searchTerm, currentPage }, 'Resultados da Pesquisa', newUrl.href);

    document.getElementById('sqr').textContent = searchTerm;
    document.title = `Results for: ${searchTerm} | NillLog Games`;

    displayResults();
}

window.addEventListener('popstate', function (event) {
    if (event.state) {
        searchTerm = event.state.searchTerm;
        filteredResults = filterResults(jsonData, searchTerm);
        displayResults();
    }
});

function displayResults() {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    if (filteredResults.length === 0) {
        // Adiciona mensagem quando não há resultados
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'nk-info-box bg-danger';
        noResultsMessage.innerHTML = `<div class="nk-info-box-icon">
                                            <i class="ion-alert-circled"></i>
                                      </div>
                                        No results was founded!`;
        document.title = `No results of: ${searchTerm} | NillLog Games`                                
        searchResults.appendChild(noResultsMessage);
    } else {
        const startIndex = (currentPage - 1) * resultsPerPage;
        const endIndex = startIndex + resultsPerPage;
        const resultsToDisplay = filteredResults.slice(startIndex, endIndex);

        resultsToDisplay.forEach(result => {
            const li = document.createElement('div');
            li.className = 'nk-blog-post';
            li.innerHTML = `
                                <div class="nk-post-thumb">
                                    <div class="nk-post-type"><span class="ion-image"></span></div>
                                    <a href="${result.link}">
                                        <img src="${result.image}" alt="${result.name}" class="nk-img-stretch">
                                    </a>
                                </div>
                                <div class="nk-post-content">
                                    <h2 class="nk-post-title h4">
                                        <a href="${result.link}"><span>${result.name}</span></a>
                                    </h2>
                                    <div class="nk-post-date">
                                        ${result.date}
                                    </div>
                                    <div class="nk-post-text">
                                        <p>${result.text}</p>
                                    </div>
                                </div>
                            `;
            searchResults.appendChild(li);
        });
    }

    updatePaginationControls();
}

function updatePaginationControls() {
    const paginationControls = document.getElementById('paginationControls');
    paginationControls.innerHTML = '';

    const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

    const prevButton = document.createElement('a');
    prevButton.innerHTML = `<span class="nk-icon-arrow-left"></span>`;
    prevButton.className = (currentPage === 1) ? 'nk-pagination-prev disabled' : 'nk-pagination-prev';
    prevButton.addEventListener('click', () => goToPage(currentPage - 1));
    paginationControls.appendChild(prevButton);

    const nav = document.createElement('nav');
    const maxButtons = 4; // Número máximo de botões a serem exibidos

    for (let i = 1; i <= totalPages; i++) {
        if (totalPages > maxButtons && Math.abs(currentPage - i) > 1) {
            // Exibe apenas os botões próximos à página atual
            if (i === 1 || i === totalPages) {
                const pageButton = document.createElement('a');
                pageButton.href = '#';
                pageButton.textContent = i;
                pageButton.addEventListener('click', () => goToPage(i));
                nav.appendChild(pageButton);
            } else if (i === 2 || i === totalPages - 1) {
                // Adiciona "..." nos extremos se necessário
                const dots = document.createElement('span');
                dots.className = 'disabled';
                dots.textContent = '...';
                nav.appendChild(dots);
            }
        } else {
            // Exibe todos os botões
            const pageButton = document.createElement('a');
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => goToPage(i));
            if (i === currentPage) {
                pageButton.classList.add('nk-pagination-current-white');
            }
            nav.appendChild(pageButton);
        }
    }
    paginationControls.appendChild(nav);

    const nextButton = document.createElement('a');
    nextButton.innerHTML = `<span class="nk-icon-arrow-right"></span>`;
    nextButton.className = (currentPage === totalPages) ? 'nk-pagination-next disabled' : 'nk-pagination-next';
    nextButton.addEventListener('click', () => goToPage(currentPage + 1));
    paginationControls.appendChild(nextButton);
}

function goToPage(page) {
    currentPage = Math.max(1, Math.min(page, Math.ceil(filteredResults.length / resultsPerPage)));
    displayResults();
}

search();