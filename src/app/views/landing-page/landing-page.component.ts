import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // 👈 importa esto
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Registramos el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements AfterViewInit, OnDestroy, OnInit {
  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


  goToLogin() {
  this.router.navigate(['/home']);
}

  isChatOpenLarge: boolean = false;
  userMessage: string = '';
  messages: { from: string; text: string }[] = []; // Arreglo para almacenar los mensajes

  // Alternar la visibilidad del chat
  toggleChatLarge() {
    this.isChatOpenLarge = !this.isChatOpenLarge;

    if (this.isChatOpenLarge && this.messages.length === 0) {
      // Si el chat se abre y no hay mensajes previos, agregar el saludo inicial
      this.messages.push({
        from: 'bot',
        text: '¡Hola! ¿En qué puedo ayudarte hoy?',
      });
    }
  }

  // Función para enviar el mensaje
  sendMessage() {
    if (this.userMessage.trim()) {
      // Agregar el mensaje del usuario al arreglo de mensajes
      this.messages.push({ from: 'user', text: this.userMessage });

      // Agregar la respuesta del chatbot (en este caso, la misma que el mensaje del usuario)
      this.messages.push({ from: 'bot', text: this.userMessage });

      // Limpiar el campo de entrada
      this.userMessage = '';

      // Desplazar el contenedor hacia abajo
      setTimeout(() => this.scrollToBottom(), 0); // Usamos setTimeout para asegurarnos de que el DOM se haya actualizado antes
    }
  }

  // Desplazar el contenedor hacia abajo
  private scrollToBottom() {
    const chatContainer = document.querySelector('.flex-1');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight; // Siempre muestra el último mensaje
    }
  }

  // Función que detecta cuando el usuario presiona Enter
  onEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evitar que la página se recargue si está dentro de un formulario
      this.sendMessage(); // Enviar el mensaje
    }
  }

  constructor(private route: ActivatedRoute, private router: Router) {}

  // refrescamos la pagina para que las animaciones vuelvan a su posisicion original
  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.refreshPage();
    });
  }

  ngAfterViewInit() {
    // Creamos las animaciones
    this.createParallaxEffect();
    this.createImageAnimation();
    this.createScrollTrigger('.image-container');
    this.funtionAnimationLeft('.funciones-container-left');
    this.funtionAnimationRight('.funciones-container-right');
    this.funtionAnimationLeft2('.funciones-container-left-2');
    this.createScrollTrigger('.soluciones-section');

    // Forzamos a ScrollTrigger a recalcular las posiciones de los triggers
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    // Limpiar cualquier ScrollTrigger al destruir el componente
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  // Animación Parallax para el fondo (con ScrollTrigger)
  createParallaxEffect() {
    gsap.to('.bg-cover', {
      y: '-40%', // Mueve el fondo hacia arriba a medida que se hace scroll
      ease: 'none', // Sin suavizado para un movimiento constante
      scrollTrigger: {
        trigger: '#parallaxSection', // El trigger es la sección completa
        start: 'top 70%', // La animación comienza cuando la parte superior de la sección entra en el viewport
        end: 'bottom 20%', // La animación termina cuando la parte inferior de la sección sale del viewport
        scrub: true, // Vincula el parallax al desplazamiento del scroll
        markers: false, // Desactiva los marcadores (puedes activarlos para depurar)
        toggleActions: 'play none none none', // Acciones al entrar/salir (no hará nada al salir)
      },
    });
  }

  createImageAnimation() {
    gsap.from('#imgCabecera', {
      y: 30, // Inicia la imagen 300px abajo
      opacity: 0, // Empieza con opacidad 0 (invisible)
      duration: 1.5, // Duración de la animación
      ease: 'power1.out',
    });
  }

  funtionAnimationLeft(sectionClass: string) {
      // Ejecuta la animación solo en pantallas grandes
      gsap.from(`${sectionClass} .div-slide`, {
        x: -150,
        opacity: 0,
        duration: 0.2,
        ease: 'power4.in',
        scrollTrigger: {
          trigger: `${sectionClass}`, // El trigger es la sección completa
          start: 'top 95%', // La animación comienza cuando la parte superior de la sección llega al 95% del viewport
          end: 'bottom 30%', // La animación termina cuando la parte inferior de la sección pasa el 30% del viewport
          toggleActions: 'play reverse play reverse', // La animación se ejecuta al entrar y se revierte al salir
          once: false, // Esto asegura que la animación se repita cada vez que la sección sea visible
          markers: false, // Marcadores para depuración (puedes eliminarlos cuando ya funcione correctamente)
        },
      });
    }


  funtionAnimationRight(sectionClass: string) {
      gsap.from(`${sectionClass} .div-slide`, {
        x: 150,
        opacity: 0,
        duration: 0.2,
        ease: 'power4.in',
        scrollTrigger: {
          trigger: `${sectionClass}`, // El trigger es la sección completa
          start: 'top 95%', // La animación comienza cuando la parte superior de la sección llega al 75% del viewport
          end: 'bottom 30%', // La animación termina cuando la parte inferior de la sección pasa el 25% del viewport
          toggleActions: 'play reverse play reverse', // La animación se ejecuta al entrar y se revierte al salir
          once: false, // Esto asegura que la animación se repita cada vez que la sección sea visible
          markers: false, // Marcadores para depuración (puedes eliminarlo cuando ya funcione correctamente)
        },
      });
  }

  funtionAnimationLeft2(sectionClass: string) {
      gsap.from(`${sectionClass} .div-slide`, {
        x: -150,
        opacity: 0,
        duration: 0.2,
        ease: 'power4.in',
        scrollTrigger: {
          trigger: `${sectionClass}`, // El trigger es la sección completa
          start: 'top 95%', // La animación comienza cuando la parte superior de la sección llega al 75% del viewport
          end: 'bottom 30%', // La animación termina cuando la parte inferior de la sección pasa el 25% del viewport
          toggleActions: 'play reverse play reverse', // La animación se ejecuta al entrar y se revierte al salir
          once: false, // Esto asegura que la animación se repita cada vez que la sección sea visible
          markers: false, // Marcadores para depuración (puedes eliminarlo cuando ya funcione correctamente)
        },
      });
  }

  createScrollTrigger(sectionClass: string) {
    gsap.from(`${sectionClass} .div-slide`, {
      x: -300,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: `${sectionClass}`, // El trigger es la sección completa
        start: 'top 75%', // La animación comienza cuando la parte superior de la sección llega al 75% del viewport
        end: 'bottom 70%', // La animación termina cuando la parte inferior de la sección pasa el 25% del viewport
        toggleActions: 'play reverse play reverse', // La animación se ejecuta al entrar y se revierte al salir
        once: false, // Esto asegura que la animación se repita cada vez que la sección sea visible
        markers: false, // Marcadores para depuración (puedes eliminarlo cuando ya funcione correctamente)
      },
    });
  }

  refreshPage() {
    ScrollTrigger.refresh();
  }

  dropdownOpen = false;

  countries = [
    {
      name: 'Argentina',
      icon: '/Images/Paises/icono_argentina.webp',
      link: '/Argentina',
    },
    {
      name: 'Bolivia',
      icon: '/Images/Paises/icono_bolivia.webp',
      link: '/Bolivia',
    },
    { name: 'Chile', icon: '/Images/Paises/icono_chile.webp', link: '/Chile' },
    {
      name: 'Colombia',
      icon: '/Images/Paises/icono_colombia.webp',
      link: '/Colombia',
    },
    {
      name: 'Costa Rica',
      icon: '/Images/Paises/icono_costarica.webp',
      link: '/CostaRica',
    },
    {
      name: 'Ecuador',
      icon: '/Images/Paises/icono_ecuador.webp',
      link: '/Ecuador',
    },
    {
      name: 'El Salvador',
      icon: '/Images/Paises/icono_elsalvador.webp',
      link: '/ElSalvador',
    },
    {
      name: 'Guatemala',
      icon: '/Images/Paises/icono_guatemala.webp',
      link: '/Guatemala',
    },
    {
      name: 'Honduras',
      icon: '/Images/Paises/icono_honduras.webp',
      link: '/Honduras',
    },
    {
      name: 'México',
      icon: '/Images/Paises/icono_mexico.webp',
      link: '/Mexico',
    },
    {
      name: 'Nicaragua',
      icon: '/Images/Paises/icono_nicaragua.webp',
      link: '/Nicaragua',
    },
    {
      name: 'Panamá',
      icon: '/Images/Paises/icono_panama.webp',
      link: '/Panama',
    },
    {
      name: 'Paraguay',
      icon: '/Images/Paises/icono_paraguay.webp',
      link: '/Paraguay',
    },
    { name: 'Perú', icon: '/Images/Paises/icono_peru.webp', link: '/Peru' },
    {
      name: 'Puerto Rico',
      icon: '/Images/Paises/icono_puertorico.webp',
      link: '/PuertoRico',
    },
    {
      name: 'Rep. Dominicana',
      icon: '/Images/Paises/icono_republicadominicana.webp',
      link: '/RepublicaDominicana',
    },
    {
      name: 'Uruguay',
      icon: '/Images/Paises/icono_uruguay.webp',
      link: '/Uruguay',
    },
    {
      name: 'Venezuela',
      icon: '/Images/Paises/icono_venezuela.webp',
      link: '/Venezuela',
    },
  ];

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
