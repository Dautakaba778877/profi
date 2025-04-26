document.addEventListener("DOMContentLoaded", () => {
    console.log("Скрипт загружен!");

    // Переключение темы
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const body = document.body;
        themeToggle.addEventListener('click', () => {
            body.setAttribute('data-theme', body.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
            themeToggle.querySelector('i').classList.toggle('fa-moon');
            themeToggle.querySelector('i').classList.toggle('fa-sun');
        });
    }

    // Плавный скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Эффект скролла для хедера
    const header = document.querySelector('header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }
            if (currentScroll > lastScroll) {
                header.classList.add('scroll-down');
                header.classList.remove('scroll-up');
            } else {
                header.classList.add('scroll-up');
                header.classList.remove('scroll-down');
            }
            lastScroll = currentScroll;
        });
    }

    // Анимация при скролле
    const animateOnScroll = () => {
        document.querySelectorAll('.fade-in').forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('visible');
            }
        });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Обработчик отправки формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
            contactForm.reset();
        });
    }

    // Анимация прогресса навыков
    const skillCards = document.querySelectorAll('.skill-card');
    const animateSkills = () => {
        skillCards.forEach(card => {
            const progress = card.querySelector('.skill-progress');
            if (progress) {
                const percentage = progress.dataset.width || "100%";
                progress.style.width = '0';
                setTimeout(() => {
                    progress.style.width = percentage;
                }, 100);
            }
        });
    };

    // Наблюдатель за секцией навыков
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(skillsSection);
    }

    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            console.log("Кнопка меню нажата!");
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') &&
                !mobileMenu.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error("Элементы мобильного меню не найдены!");
    }
});
        
document.querySelector('.contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    
    const response = await fetch('send_mail.php', {
        method: 'POST',
        body: formData
    });

    const result = await response.text();
    alert(result);
});
