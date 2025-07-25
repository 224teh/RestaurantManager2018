// Configuration du chatbot O'CAFÉ
class OCafeBot {
    constructor() {
        this.isOpen = false;
        this.responses = {
            greetings: [
                "Bonjour ! Bienvenue chez O'CAFÉ ! Comment puis-je vous aider aujourd'hui ?",
                "Salut ! Que puis-je faire pour vous chez O'CAFÉ ?",
                "Hello ! Ravi de vous accueillir chez O'CAFÉ. En quoi puis-je vous assister ?"
            ],
            menu: [
                "Notre menu propose une sélection de cafés artisanaux, pâtisseries fraîches et boissons chaudes. Nos spécialités incluent l'Espresso (2.50€), le Cappuccino (3.50€) et le Latte (4.00€). Que souhaitez-vous savoir de plus ?",
                "Nous avons trois catégories : Cafés, Pâtisseries et Boissons. Nos croissants sont à 1.80€ et nos muffins à 2.50€. Quel type de produit vous intéresse ?",
                "Notre carte comprend des cafés premium, des viennoiseries artisanales et des boissons variées. Les prix vont de 1.80€ à 4.50€. Voulez-vous des détails sur une catégorie particulière ?"
            ],
            hours: [
                "Nous sommes ouverts tous les jours de 7h00 à 22h00, 7 jours sur 7 ! Parfait pour votre café du matin ou votre pause de l'après-midi.",
                "Nos horaires : 7h00 - 22h00, du lundi au dimanche. Nous vous accueillons même le weekend !",
                "O'CAFÉ vous ouvre ses portes de 7h à 22h tous les jours de la semaine. À bientôt !"
            ],
            location: [
                "Vous nous trouverez au 123 Rue du Café, 75001 Paris. Nous sommes facilement accessibles en métro !",
                "Notre adresse : 123 Rue du Café, 75001 Paris, France. N'hésitez pas à venir nous rendre visite !",
                "Nous sommes situés au cœur de Paris, 123 Rue du Café dans le 1er arrondissement."
            ],
            coffee: [
                "Nous servons des cafés de qualité premium, torréfiés artisanalement. Nos grains sont sélectionnés avec soin et notre café est bio et équitable !",
                "Notre passion pour le café nous pousse à choisir les meilleurs grains. Nous proposons Espresso, Americano, Cappuccino, Latte et bien plus !",
                "Chez O'CAFÉ, chaque tasse est préparée avec amour. Nous utilisons uniquement des grains bio et équitables pour un goût exceptionnel."
            ],
            wifi: [
                "Oui ! Nous offrons le WiFi gratuit à tous nos clients. Parfait pour travailler ou se détendre avec un bon café.",
                "Le WiFi est gratuit chez O'CAFÉ ! Venez avec votre ordinateur portable et profitez de notre ambiance chaleureuse.",
                "Connexion WiFi gratuite disponible ! Idéal pour les étudiants et les professionnels."
            ],
            reservation: [
                "Pour les réservations, vous pouvez nous appeler au 01 23 45 67 89 ou nous envoyer un email à contact@ocafe.fr",
                "Contactez-nous au 01 23 45 67 89 pour réserver votre table ou pour toute question particulière !",
                "Réservations par téléphone au 01 23 45 67 89 ou par email à contact@ocafe.fr. Nous serons ravis de vous accueillir !"
            ],
            default: [
                "Je ne suis pas sûr de comprendre votre question. Pouvez-vous me demander des informations sur notre menu, nos horaires, notre localisation ou nos cafés ?",
                "Hmm, je n'ai pas bien saisi. Je peux vous renseigner sur notre menu, nos horaires d'ouverture, notre adresse ou nos spécialités café !",
                "Désolé, je ne comprends pas bien. Essayez de me demander des infos sur notre carte, nos heures d'ouverture, où nous trouver, ou nos cafés !"
            ]
        };
        
        this.keywords = {
            greetings: ['bonjour', 'salut', 'hello', 'bonsoir', 'hey', 'coucou'],
            menu: ['menu', 'carte', 'prix', 'coût', 'coute', 'produit', 'nourriture', 'manger', 'boire', 'pâtisserie', 'viennoiserie'],
            hours: ['heure', 'horaire', 'ouvert', 'ferme', 'ouvre', 'quand', 'temps'],
            location: ['adresse', 'où', 'situe', 'trouve', 'localisation', 'lieu', 'paris'],
            coffee: ['café', 'espresso', 'cappuccino', 'latte', 'americano', 'grain', 'torréfaction', 'bio', 'équitable'],
            wifi: ['wifi', 'internet', 'connexion', 'gratuit', 'ordinateur', 'laptop'],
            reservation: ['réservation', 'réserver', 'table', 'place', 'contact', 'téléphone', 'email']
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
    }

    setupEventListeners() {
        const chatIcon = document.querySelector('.chat-icon');
        const closeChat = document.getElementById('closeChat');
        const sendButton = document.getElementById('sendMessage');
        const chatInput = document.getElementById('chatInput');
        const contactForm = document.getElementById('contactForm');

        // Chat bot toggle
        chatIcon.addEventListener('click', () => this.toggleChat());
        closeChat.addEventListener('click', () => this.closeChat());

        // Send message
        sendButton.addEventListener('click', () => this.sendMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Contact form
        contactForm.addEventListener('submit', (e) => this.handleContactForm(e));

        // CTA button
        const ctaButton = document.querySelector('.cta-button');
        ctaButton.addEventListener('click', () => {
            document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
        });

        // Mobile navigation
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    setupNavigation() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(139, 69, 19, 0.98)';
            } else {
                header.style.background = 'rgba(139, 69, 19, 0.95)';
            }
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatWindow');
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatWindow.classList.add('active');
            this.addMessage("Bonjour ! Je suis l'assistant virtuel d'O'CAFÉ. Comment puis-je vous aider aujourd'hui ?", 'bot');
        } else {
            chatWindow.classList.remove('active');
        }
    }

    closeChat() {
        const chatWindow = document.getElementById('chatWindow');
        chatWindow.classList.remove('active');
        this.isOpen = false;
    }

    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot thinking time
            setTimeout(() => {
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            }, 500 + Math.random() * 1000);
        }
    }

    addMessage(message, type) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.textContent = message;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        let category = 'default';
        
        // Analyze message to determine category
        for (const [key, keywords] of Object.entries(this.keywords)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                category = key;
                break;
            }
        }
        
        // Get random response from category
        const responses = this.responses[category];
        const randomIndex = Math.floor(Math.random() * responses.length);
        
        return responses[randomIndex];
    }

    handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
        const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
        const message = formData.get('message') || e.target.querySelector('textarea').value;
        
        // Simulate form submission
        const button = e.target.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Envoi en cours...';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = 'Message envoyé !';
            button.style.background = '#28a745';
            
            // Reset form
            e.target.reset();
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 2000);
            
            // Show success message in chat if open
            if (this.isOpen) {
                this.addMessage(`Merci ${name} ! Votre message a été envoyé avec succès. Nous vous répondrons rapidement à ${email}.`, 'bot');
            }
        }, 1500);
    }

    // Easter egg: Konami code
    setupKonamiCode() {
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
        let userInput = [];
        
        document.addEventListener('keydown', (e) => {
            userInput.push(e.keyCode);
            userInput = userInput.slice(-konamiCode.length);
            
            if (userInput.join(',') === konamiCode.join(',')) {
                this.activateEasterEgg();
            }
        });
    }

    activateEasterEgg() {
        const coffeeCup = document.querySelector('.coffee-cup');
        coffeeCup.style.animation = 'spin 2s linear infinite';
        
        // Add spin animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            coffeeCup.style.animation = 'float 3s ease-in-out infinite';
        }, 4000);
        
        if (this.isOpen) {
            this.addMessage("🎉 Code secret activé ! Vous avez trouvé notre easter egg ! Voici un code promo : KONAMI10 pour 10% de réduction !", 'bot');
        }
    }

    // Animation on scroll
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.menu-category, .contact-item, .feature').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Initialize all features
    initializeAll() {
        this.setupScrollAnimations();
        this.setupKonamiCode();
        
        // Add some interactive feedback
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.background = '#f8f9fa';
                this.style.transform = 'translateX(5px)';
                this.style.transition = 'all 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.background = '';
                this.style.transform = '';
            });
        });
    }
}

// Initialize the bot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const bot = new OCafeBot();
    bot.initializeAll();
    
    // Add some dynamic content
    updateDateTime();
    setInterval(updateDateTime, 60000); // Update every minute
});

// Utility functions
function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    
    // You could add a datetime display element if needed
    console.log(`O'CAFÉ - ${now.toLocaleDateString('fr-FR', options)}`);
}

// Add some fun interactions
function addCoffeeParticles() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = '☕';
        particle.style.position = 'absolute';
        particle.style.fontSize = '20px';
        particle.style.opacity = '0.1';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 2}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        hero.appendChild(particle);
    }
}

// Initialize particles
setTimeout(addCoffeeParticles, 1000);

// Add service worker for offline functionality (basic)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}