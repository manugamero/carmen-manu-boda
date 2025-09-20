// Efectos de parallax y animaciones
document.addEventListener('DOMContentLoaded', function() {
    // Función para detectar elementos visibles
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Función para activar animaciones
    function activateAnimations() {
        const elements = document.querySelectorAll('.section-title, .timeline-item, .form-info, .wedding-form');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Efecto parallax
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Event listeners
    window.addEventListener('scroll', function() {
        activateAnimations();
        handleParallax();
    });

    // Activar animaciones iniciales
    activateAnimations();

    // Contador de personas
    window.increaseCount = function() {
        const input = document.getElementById('personas');
        const currentValue = parseInt(input.value);
        if (currentValue < 10) {
            input.value = currentValue + 1;
        }
    };

    window.decreaseCount = function() {
        const input = document.getElementById('personas');
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    };

    // Manejo del formulario
    document.getElementById('weddingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const nombre = formData.get('nombre');
        const telefono = formData.get('telefono');
        const personas = formData.get('personas');
        const opciones = formData.get('opciones');
        const restricciones = formData.get('restricciones');
        
        // Crear el contenido del email
        const emailContent = `
Nueva confirmación de asistencia a la boda:

Nombre: ${nombre}
Teléfono: ${telefono || 'No proporcionado'}
Número de personas: ${personas}
Tipo de invitación: ${opciones}
Restricciones alimentarias: ${restricciones || 'Ninguna'}

---
Enviado desde el formulario web
        `.trim();
        
        // Crear el enlace mailto
        const subject = `Boda ${nombre}`;
        const mailtoLink = `mailto:manu@manugamero.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailContent)}`;
        
        // Abrir el cliente de email
        window.location.href = mailtoLink;
        
        // Mostrar mensaje de confirmación
        alert('¡Gracias por confirmar tu asistencia! Se abrirá tu cliente de email para enviar la confirmación.');
        
        // Resetear el formulario
        this.reset();
        document.getElementById('personas').value = 1;
    });
});
