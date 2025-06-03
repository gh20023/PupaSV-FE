const APP_VERSION = '1.0.0';
//document.getElementById('app-version').textContent += APP_VERSION;


let estadoConexion = navigator.onLine;

//Elementos DOM

const installBtn = document.getElementById('install-btn');
const notificationBtn = document.getElementById('notification-btn');
const coneccionEstado = document.getElementById('connection-status');

function actualizarEstadoConexion(){
  estadoConexion = navigator.onLine;


  if(estadoConexion){
    coneccionEstado.textContent = 'En linea';
    coneccionEstado.className = 'connection-status offline';
    ocultarOfflineMensaje(); 
  }else{
    coneccionEstado.textContent = 'Sin conexion';
    coneccionEstado.className = 'connection-status offline'
    mostrarOfflineMensaje();
  }

}


//Mostrar Mensaje offline
function mostrarOfflineMensaje(){
  
  if(!document.getElementById('offline-banner')){
    const banner = document.createElement('div');
    banner.id = 'offline-banner';
    banner.innerHTML = `
      <div class="offline-alert">
        <p>Estás trabajando en modo offline. Algunas funciones pueden estar limitadas.</p>
      </div>
    `;
    document.body.prepend(banner);
  }

}

//ocultar mensaje
function ocultarOfflineMensaje(){
  const banner = document.getElementById('offline-banner');
  if(banner){
    banner.remove();
  }
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
        console.log('Usuario aceptó instalar la PWA');
      } else {
        console.log('Usuario rechazó instalar la PWA');
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
  actualizarConeccionEstado();


});

window.addEventListener('offline', actualizarEstadoConexion);

actualizarEstadoConexion();

//persistir estado
window.addEventListener('beforeunload', () =>{
  sessionStorage.setItem('networtStatus', estadoConexion ? 'online': 'offline');
});


window.addEventListener('load', () =>{
  const guardarEstado = sessionStorage.getItem('networkStatus');
  if(guardarEstado === 'offline' && navigator.onLine){
    //reconectar si hay conexion
    window.location.reload();
  }
});
