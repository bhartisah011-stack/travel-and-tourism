const destinationDatabase = [
    {
        id: 1,
        title: "Paris, France",
        country: "france",
        budget: "luxury",
        category: "city",
        rating: "⭐ 4.8",
        img: "https://www.fodors.com/wp-content/uploads/2018/10/HERO_UltimateParis_Heroshutterstock_112137761.jpg",
        desc: "Experience the city of lights, stunning architecture, and world-class cuisine."
    },
    {
        id: 2,
        title: "Kyoto Temples, Japan",
        country: "japan",
        budget: "mid-range",
        category: "city",
        rating: "⭐ 4.7",
        img: "https://kinkakujitemple.com/wp-content/uploads/2024/11/kinkakuji-temple-golden-pavilion-kyoto-japan-summer-view-1.jpg",
        desc: "Explore classical Buddhist temples, peaceful gardens, and historic imperial architecture."
    },
    {
        id: 3,
        title: "Goa Beaches, India",
        country: "india",
        budget: "budget-friendly",
        category: "beach",
        rating: "⭐ 4.6",
        img: "https://uploads-ssl.webflow.com/576fd5a8f192527e50a4b95c/5c0e6928a90b66f0a989c278_best%20beaches%20in%20goa%20for%20foreigners-min.jpg",
        desc: "Famous for its pristine coastlines, vibrant nightlife, and historic architectural landmarks."
    },
    {
        id: 4,
        title: "Grand Canyon, America",
        country: "america",
        budget: "mid-range",
        category: "mountain",
        rating: "⭐ 4.9",
        img: "https://www.worldatlas.com/upload/e4/3a/a6/shutterstock-97706066.jpg",
        desc: "A massive, breathtaking canyon structure carved deep over millions of years by the Colorado River."
    },
    {
        id: 5,
        title: "Taj Mahal, India",
        country: "india",
        budget: "budget-friendly",
        category: "city",
        rating: "⭐ 4.9",
        img: "https://static.thehosteller.com/blogimage/1-1679545985742.jpg",
        desc: "An spectacular architectural monument of white marble built in memory of an empire."
    },
    {
        id: 6,
        title: "New York City, America",
        country: "america",
        budget: "luxury",
        category: "city",
        rating: "⭐ 4.8",
        img: "https://wallpapers.com/images/hd/new-york-city-desktop-jgg3haet631yi5d9.jpg",
        desc: "The city that never sleeps, known for broadway productions, towering skylines, and culture."
    },
    {
        id: 7,
        title: "French Riviera, France",
        country: "france",
        budget: "luxury",
        category: "beach",
        rating: "⭐ 4.7",
        img: "https://assets3.thrillist.com/v1/image/2782713/1200x600/scale;",
        desc: "The beautiful Mediterranean coastline hosting luxurious coastal resort cities like Nice."
    },
    {
        id: 8,
        title: "Mount Fuji, Japan",
        country: "japan",
        budget: "mid-range",
        category: "mountain",
        rating: "⭐ 4.9",
        img: "https://www.goodfreephotos.com/albums/japan/other-japan/landscape-with-clouds-and-mount-fuji-japan.jpg",
        desc: "Japan's highest, most iconic volcanic peak—celebrated for its symmetrical beauty."
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const destGrid = document.getElementById('destination-grid');
    const destSearch = document.getElementById('dest-search');
    const filterCountry = document.getElementById('filter-country');
    const filterBudget = document.getElementById('filter-budget');
    const filterCategory = document.getElementById('filter-category');

    renderCards(destinationDatabase);

    function renderCards(dataPool) {
        destGrid.innerHTML = '';
        
        if (dataPool.length === 0) {
            destGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <h3>No matching destinations found.</h3>
                    <p style="margin-top: 8px;">Try modifying your text parameters or clearing selected filter groups.</p>
                </div>`;
            return;
        }

        dataPool.forEach(item => {
            const templateHTML = `
                <div class="card destination-card">
                    <div class="card-img" style="background: url('${item.img}') no-repeat center/cover;"></div>
                    <div class="card-body">
                        <div class="card-meta">
                            <span class="rating">${item.rating}</span>
                            <span class="category" style="text-transform: capitalize;">${item.category}</span>
                        </div>
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                        <button class="btn btn-outline dest-view-btn" data-id="${item.id}">View Details</button>
                    </div>
                </div>`;
            destGrid.insertAdjacentHTML('beforeend', templateHTML);
        });

        document.querySelectorAll('.dest-view-btn').forEach(button => {
            button.onclick = (e) => {
                const extractionId = parseInt(e.target.getAttribute('data-id'));
                const matchedDestination = destinationDatabase.find(target => target.id === extractionId);
                if (matchedDestination) {
                    alert(` Destination Hub Spotlight:\n\n Place: ${matchedDestination.title}\n Tier: ${matchedDestination.budget.toUpperCase()} Budget\n Style Category: ${matchedDestination.category.toUpperCase()}\n\n"${matchedDestination.desc}"`);
                }
            };
        });
    }

    function processActiveFilters() {
        const textQuery = destSearch.value.trim().toLowerCase();
        const activeCountry = filterCountry.value;
        const activeBudget = filterBudget.value;
        const activeCategory = filterCategory.value;

        const evaluatedPool = destinationDatabase.filter(destination => {
            const textMatch = destination.title.toLowerCase().includes(textQuery) || destination.desc.toLowerCase().includes(textQuery);
            const countryMatch = (activeCountry === 'all') || (destination.country === activeCountry);
            const budgetMatch = (activeBudget === 'all') || (destination.budget === activeBudget);
            const categoryMatch = (activeCategory === 'all') || (destination.category === activeCategory);

            return textMatch && countryMatch && budgetMatch && categoryMatch;
        });

        renderCards(evaluatedPool);
    }

    destSearch.addEventListener('input', processActiveFilters);
    filterCountry.addEventListener('change', processActiveFilters);
    filterBudget.addEventListener('change', processActiveFilters);
    filterCategory.addEventListener('change', processActiveFilters);
});
