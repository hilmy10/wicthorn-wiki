// macOS Style Search JavaScript
// Search data
const searchData = [
    {
        category: 'Company',
        items: [
            {
                title: 'Company Overview',
                subtitle: 'Mission, vision, and company values',
                icon: '📊',
                color: '#007AFF',
                keywords: ['company', 'overview', 'mission', 'vision', 'values']
            },
            {
                title: 'Strategic Goals',
                subtitle: 'Company strategic planning and goals',
                icon: '🎯',
                color: '#34C759',
                keywords: ['strategic', 'goals', 'planning', 'strategy']
            },
            {
                title: 'Organizational Chart',
                subtitle: 'Company structure and hierarchy',
                icon: '🏗️',
                color: '#FF9500',
                keywords: ['organization', 'chart', 'structure', 'hierarchy']
            }
        ]
    },
    {
        category: 'Departments',
        items: [
            {
                title: 'Human Resources',
                subtitle: 'Employee management and policies',
                icon: '👤',
                color: '#34C759',
                keywords: ['hr', 'human', 'resources', 'employee', 'staff']
            },
            {
                title: 'Marketing',
                subtitle: 'Marketing campaigns and strategies',
                icon: '📢',
                color: '#FF2D92',
                keywords: ['marketing', 'campaigns', 'promotion', 'advertising']
            },
            {
                title: 'Finance',
                subtitle: 'Financial planning and budgets',
                icon: '💵',
                color: '#5856D6',
                keywords: ['finance', 'budget', 'money', 'financial']
            },
            {
                title: 'Operations',
                subtitle: 'Daily operations and processes',
                icon: '⚙️',
                color: '#8E8E93',
                keywords: ['operations', 'process', 'workflow', 'daily']
            }
        ]
    },
    {
        category: 'Resources',
        items: [
            {
                title: 'Documentation Library',
                subtitle: 'Access company documentation',
                icon: '📚',
                color: '#5856D6',
                keywords: ['documentation', 'docs', 'library', 'manual']
            },
            {
                title: 'Tools & Software',
                subtitle: 'Access company tools and software',
                icon: '🛠️',
                color: '#AF52DE',
                keywords: ['tools', 'software', 'apps', 'applications']
            },
            {
                title: 'Employee Handbook',
                subtitle: 'Employee guidelines and policies',
                icon: '📖',
                color: '#FF6B35',
                keywords: ['handbook', 'employee', 'guidelines', 'policies']
            }
        ]
    }
];

let currentHighlight = -1;
let currentResults = [];

// Inject HTML when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    injectSearchHTML();
    bindSearchEvents();
});

// Inject search HTML
function injectSearchHTML() {
    const searchHTML = `
        <!-- Trigger Button -->
        <button class="mac-search-trigger" onclick="openMacSearch()">
            <svg viewBox="0 0 24 24">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
        </button>

        <!-- Search Overlay -->
        <div class="mac-search-overlay" id="macSearchOverlay" onclick="closeMacSearch(event)">
            <div class="mac-search-container" onclick="event.stopPropagation()">
                <div class="mac-search-input-container">
                    <input 
                        type="text" 
                        class="mac-search-input" 
                        placeholder="Search..." 
                        id="macSearchInput"
                        autocomplete="off"
                        spellcheck="false"
                    >
                    <div class="mac-search-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                    </div>
                </div>
                
                <div class="mac-search-results" id="macSearchResults">
                    <!-- Default content -->
                    <div class="mac-search-category">Recent</div>
                    
                    <div class="mac-search-item" onclick="handleSearchClick('Company Overview')">
                        <div class="mac-search-item-icon" style="background: #007AFF;">📊</div>
                        <div class="mac-search-item-content">
                            <div class="mac-search-item-title">Company Overview</div>
                            <div class="mac-search-item-subtitle">Mission, vision, and company values</div>
                        </div>
                    </div>
                    
                    <div class="mac-search-item" onclick="handleSearchClick('Human Resources')">
                        <div class="mac-search-item-icon" style="background: #34C759;">👤</div>
                        <div class="mac-search-item-content">
                            <div class="mac-search-item-title">Human Resources</div>
                            <div class="mac-search-item-subtitle">Employee management and policies</div>
                        </div>
                    </div>
                    
                    <div class="mac-search-item" onclick="handleSearchClick('Project Management')">
                        <div class="mac-search-item-icon" style="background: #FF9500;">📈</div>
                        <div class="mac-search-item-content">
                            <div class="mac-search-item-title">Project Management</div>
                            <div class="mac-search-item-subtitle">Track and manage projects</div>
                        </div>
                    </div>
                    
                    <div class="mac-search-category">Suggestions</div>
                    
                    <div class="mac-search-item" onclick="handleSearchClick('Documentation')">
                        <div class="mac-search-item-icon" style="background: #5856D6;">📚</div>
                        <div class="mac-search-item-content">
                            <div class="mac-search-item-title">Documentation Library</div>
                            <div class="mac-search-item-subtitle">Access company documentation</div>
                        </div>
                    </div>
                    
                    <div class="mac-search-item" onclick="handleSearchClick('Tools')">
                        <div class="mac-search-item-icon" style="background: #AF52DE;">🛠️</div>
                        <div class="mac-search-item-content">
                            <div class="mac-search-item-title">Tools & Software</div>
                            <div class="mac-search-item-subtitle">Access company tools and software</div>
                        </div>
                    </div>
                    
                    <div class="mac-search-item" onclick="handleSearchClick('Communication')">
                        <div class="mac-search-item-icon" style="background: #FF2D92;">💬</div>
                        <div class="mac-search-item-content">
                            <div class="mac-search-item-title">Communication Hub</div>
                            <div class="mac-search-item-subtitle">Team communication and messaging</div>
                        </div>
                    </div>
                </div>
                
                <div class="mac-search-shortcut">
                    Press <span class="mac-search-shortcut-key">⌘</span><span class="mac-search-shortcut-key">K</span> to search, <span class="mac-search-shortcut-key">Esc</span> to close
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', searchHTML);
}

// Bind search events
function bindSearchEvents() {
    const input = document.getElementById('macSearchInput');
    
    // Search input
    input.addEventListener('input', function(e) {
        performSearch(e.target.value);
        currentHighlight = -1;
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Cmd+K or Ctrl+K to open search
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openMacSearch();
            return;
        }

        // Only handle other shortcuts when search is open
        if (!document.getElementById('macSearchOverlay').classList.contains('active')) {
            return;
        }

        // Escape to close
        if (e.key === 'Escape') {
            closeMacSearch();
            return;
        }

        // Arrow navigation
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentHighlight = Math.min(currentHighlight + 1, currentResults.length - 1);
            updateHighlight();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentHighlight = Math.max(currentHighlight - 1, -1);
            updateHighlight();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentHighlight >= 0 && currentResults[currentHighlight]) {
                currentResults[currentHighlight].click();
            }
        }
    });
}

// Open search
function openMacSearch() {
    const overlay = document.getElementById('macSearchOverlay');
    const input = document.getElementById('macSearchInput');
    
    overlay.classList.add('active');
    input.focus();
    input.value = '';
    showDefaultResults();
    currentHighlight = -1;
}

// Close search
function closeMacSearch(event) {
    if (event && event.target !== document.getElementById('macSearchOverlay')) return;
    
    const overlay = document.getElementById('macSearchOverlay');
    overlay.classList.remove('active');
    currentHighlight = -1;
}

// Show default results
function showDefaultResults() {
    const resultsContainer = document.getElementById('macSearchResults');
    resultsContainer.innerHTML = `
        <div class="mac-search-category">Recent</div>
        <div class="mac-search-item" onclick="handleSearchClick('Company Overview')">
            <div class="mac-search-item-icon" style="background: #007AFF;">📊</div>
            <div class="mac-search-item-content">
                <div class="mac-search-item-title">Company Overview</div>
                <div class="mac-search-item-subtitle">Mission, vision, and company values</div>
            </div>
        </div>
        <div class="mac-search-item" onclick="handleSearchClick('Human Resources')">
            <div class="mac-search-item-icon" style="background: #34C759;">👤</div>
            <div class="mac-search-item-content">
                <div class="mac-search-item-title">Human Resources</div>
                <div class="mac-search-item-subtitle">Employee management and policies</div>
            </div>
        </div>
        <div class="mac-search-category">Suggestions</div>
        <div class="mac-search-item" onclick="handleSearchClick('Documentation')">
            <div class="mac-search-item-icon" style="background: #5856D6;">📚</div>
            <div class="mac-search-item-content">
                <div class="mac-search-item-title">Documentation Library</div>
                <div class="mac-search-item-subtitle">Access company documentation</div>
            </div>
        </div>
    `;
    currentResults = document.querySelectorAll('.mac-search-item');
}

// Search function
function performSearch(query) {
    if (!query.trim()) {
        showDefaultResults();
        return;
    }

    const results = [];
    const queryLower = query.toLowerCase();

    searchData.forEach(category => {
        const categoryResults = category.items.filter(item => {
            return item.title.toLowerCase().includes(queryLower) ||
                   item.subtitle.toLowerCase().includes(queryLower) ||
                   item.keywords.some(keyword => keyword.includes(queryLower));
        });

        if (categoryResults.length > 0) {
            results.push({
                category: category.category,
                items: categoryResults
            });
        }
    });

    displayResults(results);
}

// Display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('macSearchResults');
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="mac-search-no-results">
                No results found
            </div>
        `;
        currentResults = [];
        return;
    }

    let html = '';
    results.forEach(category => {
        html += `<div class="mac-search-category">${category.category}</div>`;
        category.items.forEach(item => {
            html += `
                <div class="mac-search-item" onclick="handleSearchClick('${item.title}')">
                    <div class="mac-search-item-icon" style="background: ${item.color};">${item.icon}</div>
                    <div class="mac-search-item-content">
                        <div class="mac-search-item-title">${item.title}</div>
                        <div class="mac-search-item-subtitle">${item.subtitle}</div>
                    </div>
                </div>
            `;
        });
    });

    resultsContainer.innerHTML = html;
    currentResults = document.querySelectorAll('.mac-search-item');
}

// Handle search item click
function handleSearchClick(itemTitle) {
    console.log('Selected:', itemTitle);
    
    // Handle specific items
    if (itemTitle === 'Documentation Library') {
        window.open('https://saltandspell.com', '_blank');
        closeMacSearch();
        return;
    }
    
    // Default action for other items
    alert(`You selected: ${itemTitle}`);
    closeMacSearch();
}

// Keyboard navigation
function updateHighlight() {
    currentResults.forEach((item, index) => {
        if (index === currentHighlight) {
            item.classList.add('highlighted');
        } else {
            item.classList.remove('highlighted');
        }
    });
}
