// search.js
class WikiSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.searchData = [];
        this.debounceTimer = null;
        
        this.init();
    }

    async init() {
        await this.loadSearchData();
        this.bindEvents();
    }

    async loadSearchData() {
        try {
            // In a real implementation, this would load from data/search-data.json
            // For now, we'll use mock data
            this.searchData = [
                {
                    title: "Wicthorn Overview",
                    content: "Basic gameplay mechanics and getting started guide",
                    url: "pages/gameplay/overview.html",
                    category: "Gameplay"
                },
                {
                    title: "Character Classes",
                    content: "Warrior, Mage, Rogue, and Ranger class guides",
                    url: "pages/characters/classes.html",
                    category: "Characters"
                },
                {
                    title: "Spell System",
                    content: "Magic spells, enchantments, and casting mechanics",
                    url: "pages/gameplay/spells.html",
                    category: "Gameplay"
                },
                {
                    title: "Shadow Realm",
                    content: "Dark dimension with powerful enemies and rare loot",
                    url: "pages/world/shadow-realm.html",
                    category: "World"
                },
                {
                    title: "Legendary Weapons",
                    content: "Rare and powerful weapons found throughout Wicthorn",
                    url: "pages/items/weapons.html",
                    category: "Items"
                },
                {
                    title: "Boss Strategies",
                    content: "Tactics and tips for defeating major bosses",
                    url: "pages/guides/bosses.html",
                    category: "Guides"
                },
                {
                    title: "Ancient Artifacts",
                    content: "Mystical items with unique powers and abilities",
                    url: "pages/items/artifacts.html",
                    category: "Items"
                },
                {
                    title: "Dragon Lord Valdris",
                    content: "Final boss guide and lore information",
                    url: "pages/characters/valdris.html",
                    category: "Characters"
                },
                {
                    title: "Crystal Caves",
                    content: "Underground dungeon filled with valuable crystals",
                    url: "pages/world/crystal-caves.html",
                    category: "World"
                },
                {
                    title: "Crafting Guide",
                    content: "Create powerful items and equipment",
                    url: "pages/guides/crafting.html",
                    category: "Guides"
                }
            ];
        } catch (error) {
            console.error('Failed to load search data:', error);
        }
    }

    bindEvents() {
        if (!this.searchInput) return;

        this.searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();
            
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                if (query.length >= 2) {
                    this.performSearch(query);
                } else {
                    this.hideResults();
                }
            }, 300);
        });

        this.searchInput.addEventListener('focus', () => {
            if (this.searchInput.value.trim().length >= 2) {
                this.showResults();
            }
        });

        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container') && !e.target.closest('.search-results')) {
                this.hideResults();
            }
        });

        // Keyboard navigation
        this.searchInput.addEventListener('keydown', (e) => {
            const items = this.searchResults.querySelectorAll('.search-result-item');
            const activeItem = this.searchResults.querySelector('.search-result-item.active');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!activeItem) {
                    items[0]?.classList.add('active');
                } else {
                    activeItem.classList.remove('active');
                    const nextItem = activeItem.nextElementSibling || items[0];
                    nextItem.classList.add('active');
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (!activeItem) {
                    items[items.length - 1]?.classList.add('active');
                } else {
                    activeItem.classList.remove('active');
                    const prevItem = activeItem.previousElementSibling || items[items.length - 1];
                    prevItem.classList.add('active');
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeItem) {
                    const link = activeItem.querySelector('a');
                    if (link) link.click();
                }
            } else if (e.key === 'Escape') {
                this.hideResults();
                this.searchInput.blur();
            }
        });
    }

    performSearch(query) {
        const results = this.searchData.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );

        this.displayResults(results, query);
    }

    displayResults(results, query) {
        if (!this.searchResults) return;

        if (results.length === 0) {
            this.searchResults.innerHTML = `
                <div class="search-result-item">
                    <div style="text-align: center; color: rgba(255,255,255,0.6);">
                        <i class="fas fa-search"></i>
                        <p>No results found for "${query}"</p>
                    </div>
                </div>
            `;
        } else {
            this.searchResults.innerHTML = results.map(result