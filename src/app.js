const APP_VERSION = '1.0.0';
let estadoConexion = navigator.onLine;
console.log(estadoConexion);

// Elementos DOM
const installBtn = document.getElementById('install-btn');
const notificationBtn = document.getElementById('notification-btn');
const coneccionEstado = document.getElementById('connection-status');

// Función mejorada para actualizar estado
function actualizarEstadoConexion() {
  estadoConexion = navigator.onLine;

  if(estadoConexion) {
    coneccionEstado.textContent = 'En línea';
    coneccionEstado.className = 'connection-status online';  // Corregido a 'online'
    ocultarOfflineMensaje();
    // Opcional: Sincronizar datos pendientes aquí
  } else {
    coneccionEstado.textContent = 'Sin conexión';
    coneccionEstado.className = 'connection-status offline';
    mostrarOfflineMensaje();
  }
  
  // Persistir estado inmediatamente
  sessionStorage.setItem('networkStatus', estadoConexion ? 'online' : 'offline');
}

// Mostrar Mensaje offline (mejorado)
function mostrarOfflineMensaje() {
  if(!document.getElementById('offline-banner')) {
    const banner = document.createElement('div');
    banner.id = 'offline-banner';
    banner.innerHTML = `
      <div class="offline-alert">
        <p>Si conexion</p>
      </div>
    `;
    document.body.prepend(banner);
  }
}

// Ocultar mensaje offline
function ocultarOfflineMensaje() {
  const banner = document.getElementById('offline-banner');
  if(banner) banner.remove();
}

// Variable para el deferred prompt
let deferredPrompt;

// Registrar Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/PupaSV-FE/src/sw.js')
      .then(registration => {
        console.log('ServiceWorker registrado con éxito:', registration.scope);
        
        // Verificar actualizaciones
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateNotification();
            }
          });
        });
      })
      .catch(err => {
        console.error('Error al registrar ServiceWorker:', err);
      });
  });
}

// Manejar el evento beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove('hidden');
  
  installBtn.addEventListener('click', () => {
    installBtn.classList.add('hidden');
    deferredPrompt.prompt();
    
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log(' instalar la PWA');
      } else {
        console.log('no instalar la PWA');
      }
      deferredPrompt = null;
    });
  });
});

// Verificar si la app ya está instalada
window.addEventListener('appinstalled', () => {
  console.log('PWA instalada');
  installBtn.classList.add('hidden');
  deferredPrompt = null;
});


window.addEventListener('online', () =>{
  actualizarEstadoConexion();

});

window.addEventListener('offline', actualizarEstadoConexion);

actualizarEstadoConexion();

//persistir estado
window.addEventListener('beforeunload', () =>{
  sessionStorage.setItem('networkStatus', estadoConexion ? 'online': 'offline');
});


window.addEventListener('load', () =>{
  const guardarEstado = sessionStorage.getItem('networkStatus');
  if(guardarEstado === 'offline' && navigator.onLine){
    //reconectar si hay conexion
    window.location.reload();
  }
});
