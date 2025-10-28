// Sistema di navigazione e collegamento tra le pagine
// Questo script deve essere incluso in tutte le pagine

document.addEventListener('DOMContentLoaded', function() {
    // 1. Aggiorna i link di navigazione in base alla pagina corrente
    function updateNavigation() {
        // Ottieni il nome del file corrente
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Seleziona tutti i link di navigazione
        const navLinks = document.querySelectorAll('nav a');
        
        // Rimuovi la classe "active" da tutti i link
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Aggiungi la classe active al link corrispondente alla pagina corrente
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
            
            // Gestisci il caso della pagina di dettaglio (mantieni attivo il link "Works")
            if (currentPage.startsWith('work-detail') && link.getAttribute('href') === 'works.html') {
                link.classList.add('active');
            }
        });
    }
    
    // 2. Gestisci il menu mobile
    function setupMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const nav = document.getElementById('mainNav');
        
        if (hamburger && nav) {
            hamburger.addEventListener('click', function() {
                nav.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
            
            // Chiudi il menu quando si clicca fuori
            document.addEventListener('click', function(event) {
                if (nav.classList.contains('active') && 
                    !nav.contains(event.target) && 
                    !hamburger.contains(event.target)) {
                    nav.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        }
    }
    
    // 3. Gestisci la trasparenza dell'header in homepage
    function setupHeaderTransparency() {
        // Verifica se siamo nella homepage
        const isHomePage = window.location.pathname.split('/').pop() === 'index.html' || 
                          window.location.pathname.split('/').pop() === '';
        
        const header = document.querySelector('header');
        
        if (isHomePage && header) {
            // Aggiungi inizialmente la classe transparent
            header.classList.add('transparent');
            
            // Gestisci la trasparenza durante lo scroll
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    header.classList.remove('transparent');
                } else {
                    header.classList.add('transparent');
                }
            });
        }
    }
    
    // 4. Gestisci i filtri nella pagina Works
    function setupWorksFilters() {
        // Verifica se siamo nella pagina works
        const isWorksPage = window.location.pathname.split('/').pop() === 'works.html';
        
        if (isWorksPage) {
            const filterOptions = document.querySelectorAll('.filter-option');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            filterOptions.forEach(option => {
                option.addEventListener('click', function() {
                    // Rimuovi active da tutti i filtri
                    filterOptions.forEach(opt => opt.classList.remove('active'));
                    
                    // Aggiungi active al filtro cliccato
                    this.classList.add('active');
                    
                    // Ottieni il valore del filtro
                    const filterValue = this.getAttribute('data-filter');
                    
                    // Filtra gli elementi della galleria
                    galleryItems.forEach(item => {
                        if (filterValue === 'all') {
                            item.style.display = 'block';
                        } else {
                            const categories = item.getAttribute('data-category').split(' ');
                            if (categories.includes(filterValue)) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        }
                    });
                });
            });
        }
    }
    
    // 5. Gestisci la navigazione della pagina di dettaglio
    function setupWorkDetail() {
        // Verifica se siamo nella pagina di dettaglio
        const isDetailPage = window.location.pathname.split('/').pop() === 'work-detail.html';
        
        if (isDetailPage) {
            // Ottieni l'ID dell'opera dalla query string
            const urlParams = new URLSearchParams(window.location.search);
            const id = parseInt(urlParams.get('id')) || 1;
            
            // Dati delle opere (da sostituire con dati reali)
            const works = [
                {
                    id: 1,
                    title: "Quattr'Opere",
                    year: "2021-2023",
                    medium: "Olio su tela",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                },
                {
                    id: 2,
                    title: "Quattr'Opere (dettaglio)",
                    year: "2021-2023",
                    medium: "Olio su tela",
                    description: "Un dettaglio ravvicinato dell'opera Quattr'Opere che rivela la texture e la tecnica pittorica.",
                },
                {
                    id: 3,
                    title: "Quattr'Opere",
                    year: "2021-2023",
                    medium: "Olio su tela",
                    description: "Terza variazione sul tema della serie Quattr'Opere, con un focus su combinazioni cromatiche diverse.",
                },
                {
                    id: 4,
                    title: "Commission #1",
                    year: "2021-2023",
                    medium: "Olio su tela",
                    description: "Opera commissionata che esplora temi e soggetti personalizzati secondo le richieste del committente.",
                },
                {
                    id: 5,
                    title: "Quattr'Opere",
                    year: "2022",
                    medium: "Olio su tela",
                    description: "Ultima variazione della serie Quattr'Opere, che conclude il ciclo artistico iniziato nel 2021.",
                }
            ];
            
            // Trova l'opera corrente
            const currentWork = works.find(work => work.id === id) || works[0];
            
            // Aggiorna il contenuto della pagina
            const elements = {
                title: document.getElementById('workTitle'),
                year: document.getElementById('workYear'),
                medium: document.getElementById('workMedium'),
                description: document.getElementById('workDescription')
            };
            
            if (elements.title) elements.title.textContent = currentWork.title;
            if (elements.year) elements.year.textContent = currentWork.year;
            if (elements.medium) elements.medium.textContent = currentWork.medium;
            if (elements.description) elements.description.textContent = currentWork.description;
            
            // Aggiorna i link di navigazione
            const prevWorkId = id > 1 ? id - 1 : works.length;
            const nextWorkId = id < works.length ? id + 1 : 1;
            
            const prevLink = document.getElementById('prevWorkLink');
            const nextLink = document.getElementById('nextWorkLink');
            
            if (prevLink) prevLink.href = `work-detail.html?id=${prevWorkId}`;
            if (nextLink) nextLink.href = `work-detail.html?id=${nextWorkId}`;
            
            // Gestisci la galleria di immagini
            setupGalleryNavigation();
        }
    }
    
    // 6. Gestisci la navigazione della galleria di immagini
    function setupGalleryNavigation() {
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        const mainImage = document.getElementById('mainArtworkImage');
        
        if (!thumbnails.length || !mainImage) return;
        
        let currentImageIndex = 0;
        
        // Raccolta delle immagini
        const images = [];
        thumbnails.forEach(thumb => {
            images.push({
                src: thumb.getAttribute('data-image'),
                alt: thumb.querySelector('img').getAttribute('alt')
            });
        });
        
        // Funzione per impostare l'immagine attiva
        function setActiveImage(index) {
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[index].classList.add('active');
            
            mainImage.src = images[index].src;
            mainImage.alt = images[index].alt;
            
            currentImageIndex = index;
        }
        
        // Eventi click sulle miniature
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                setActiveImage(index);
            });
        });
        
        // Bottoni di navigazione
        const prevBtn = document.getElementById('prevImageBtn');
        const nextBtn = document.getElementById('nextImageBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                let newIndex = currentImageIndex - 1;
                if (newIndex < 0) newIndex = images.length - 1;
                setActiveImage(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                let newIndex = currentImageIndex + 1;
                if (newIndex >= images.length) newIndex = 0;
                setActiveImage(newIndex);
            });
        }
        
        // Navigazione da tastiera
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                if (prevBtn) prevBtn.click();
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                if (nextBtn) nextBtn.click();
            }
        });
        
        // Swipe su mobile
        if ('ontouchstart' in window) {
            const artworkMain = document.querySelector('.artwork-main');
            if (artworkMain) {
                let touchStartX = 0;
                let touchEndX = 0;
                
                artworkMain.addEventListener('touchstart', function(e) {
                    touchStartX = e.changedTouches[0].screenX;
                });
                
                artworkMain.addEventListener('touchend', function(e) {
                    touchEndX = e.changedTouches[0].screenX;
                    
                    const swipeThreshold = 50;
                    if (touchEndX < touchStartX - swipeThreshold) {
                        if (nextBtn) nextBtn.click();
                    } else if (touchEndX > touchStartX + swipeThreshold) {
                        if (prevBtn) prevBtn.click();
                    }
                });
            }
        }
        
        // Zoom immagine
        if (mainImage) {
            mainImage.addEventListener('click', function() {
                if (this.classList.contains('zoomed')) {
                    this.classList.remove('zoomed');
                    this.style.cursor = 'zoom-in';
                } else {
                    this.classList.add('zoomed');
                    this.style.cursor = 'zoom-out';
                }
            });
        }
        
        // Precaricamento immagini
        setTimeout(function() {
            images.forEach(image => {
                const img = new Image();
                img.src = image.src;
            });
        }, 1000);
    }
    
    // 7. Gestisci il video in homepage
    function setupVideoBackground() {
        // Verifica se siamo nella homepage
        const isHomePage = window.location.pathname.split('/').pop() === 'index.html' || 
                          window.location.pathname.split('/').pop() === '';
        
        if (isHomePage) {
            const video = document.querySelector('.video-background');
            
            if (video) {
                // Tenta di avviare la riproduzione automatica
                video.play().catch(error => {
                    console.log("Riproduzione automatica impedita dal browser");
                    
                    // Crea un pulsante di riproduzione come fallback
                    const playButton = document.createElement('button');
                    playButton.className = 'video-play-btn';
                    playButton.innerHTML = 'Play Video';
                    playButton.style.cssText = `
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        z-index: 10;
                        padding: 15px 30px;
                        background-color: rgba(0,0,0,0.6);
                        color: white;
                        border: 1px solid white;
                        cursor: pointer;
                        font-size: 16px;
                    `;
                    
                    playButton.addEventListener('click', () => {
                        video.play();
                        playButton.style.display = 'none';
                    });
                    
                    const videoContainer = document.querySelector('.video-container');
                    if (videoContainer) {
                        videoContainer.appendChild(playButton);
                    }
                });
            }
        }
    }
    
    // Inizializza tutte le funzioni
    updateNavigation();
    setupMobileMenu();
    setupHeaderTransparency();
    setupWorksFilters();
    setupWorkDetail();
    setupVideoBackground();
});