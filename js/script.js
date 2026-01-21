// Menu mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('mobile-open');
      mobileMenuBtn.textContent = isExpanded ? '☰' : '✕';
    });

    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Fermer menu mobile
          if (window.innerWidth <= 768) {
            navLinks.classList.remove('mobile-open');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.textContent = '☰';
          }
          
          // Scroll
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });

    // Animation compétences
    function animateSkills() {
      const skillBars = document.querySelectorAll('.level-fill');
      skillBars.forEach(bar => {
        const width = getComputedStyle(bar).getPropertyValue('--level');
        bar.style.width = '0';
        setTimeout(() => {
          bar.style.width = width;
        }, 300);
      });
    }

    // Observer pour animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'competences') {
            animateSkills();
          }
          // Animation pour cartes
          if (entry.target.classList.contains('competence-card') || 
              entry.target.classList.contains('projet-card') ||
              entry.target.classList.contains('about-photo')) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        }
      });
    }, { threshold: 0.1 });

    // Observer les éléments
    document.querySelectorAll('#competences, .competence-card, .projet-card, .about-photo').forEach(el => {
      if (el.classList.contains('competence-card') || 
          el.classList.contains('projet-card') ||
          el.classList.contains('about-photo')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      }
      observer.observe(el);
    });

    // Formulaire de contact
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('button');
      const originalText = submitBtn.textContent;

      // Désactiver bouton
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours...';

      // Simuler envoi
      setTimeout(() => {
        // Succès
        formStatus.textContent = '✓ Message envoyé avec succès !';
        formStatus.className = 'form-status success';
        formStatus.style.display = 'block';
        
        // Réinitialiser
        this.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        // Cacher message après 5s
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 1500);
    });

    // Fonction pour changer la photo
    const photoPlaceholder = document.querySelector('.photo-placeholder');
    photoPlaceholder.addEventListener('click', function() {
      this.innerHTML = `
        <i class="fas fa-camera" style="font-size: 2rem; margin-bottom: 1rem;"></i>
        <span style="color: #4a9eff;">Cliquez pour télécharger votre photo</span>
        <small style="font-size: 0.8rem; color: #666; margin-top: 0.5rem;">
          Formats supportés: JPG, PNG, WebP
        </small>
      `;
      setTimeout(() => {
        alert("Fonctionnalité de téléchargement de photo - À implémenter");
      }, 500);
    });

    // Adaptations responsive
    function handleResize() {
      if (window.innerWidth > 768) {
        navLinks.classList.remove('mobile-open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.textContent = '☰';
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // CSS pour le message de statut
    const style = document.createElement('style');
    style.textContent = `
      .form-status {
        margin-top: 1.5rem;
        padding: 1rem;
        border-radius: 6px;
        text-align: center;
        display: none;
        animation: fadeIn 0.3s ease;
      }
      .form-status.success {
        background: rgba(16, 185, 129, 0.1);
        border: 1px solid rgba(16, 185, 129, 0.3);
        color: #10b981;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);