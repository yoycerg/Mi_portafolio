const root = document.documentElement;
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const searchInput = document.getElementById("projectSearch");
const filterButtons = [...document.querySelectorAll(".filter-button")];
const projectCards = [...document.querySelectorAll(".project-card")];
const emptyState = document.getElementById("emptyState");
const dialog = document.getElementById("projectDialog");
const toast = document.getElementById("toast");
let activeFilter = "todos";
let toastTimer;

const projectInfo = {
  tasktrack: {
    category: "PYTHON · FLASK · CRUD",
    title: "TaskTrack",
    summary: "Aplicación web de gestión de tareas desarrollada como práctica para comprender cómo se conectan las vistas, las rutas del servidor y los datos.",
    objective: "Organizar tareas y practicar las operaciones básicas de creación, lectura, actualización y eliminación de registros.",
    learning: ["Estructurar rutas y controladores en Flask.", "Construir formularios y páginas HTML con plantillas.", "Conectar la aplicación con una base de datos y trabajar con registros.", "Comprender el flujo de una aplicación web con sesiones de usuario, según la configuración del proyecto."],
    tech: ["Python", "Flask", "HTML", "CSS", "SQL", "CRUD"]
  },
  cinepedia: {
    category: "PYTHON · FLASK · ESTRUCTURA MVC",
    title: "CinePedia",
    summary: "Proyecto académico web utilizado para practicar una estructura ordenada de aplicación, con módulos de controladores, vistas y lógica del servidor.",
    objective: "Reforzar la organización del código y el manejo de solicitudes y formularios dentro de una aplicación Flask.",
    learning: ["Organizar archivos y módulos de una aplicación.", "Conectar rutas con controladores y plantillas.", "Revisar importaciones y dependencias de Python.", "Trabajar con información relacionada con películas y formularios según los requisitos del proyecto."],
    tech: ["Python", "Flask", "Jinja", "HTML", "CSS", "SQL"]
  },
  bookhub: {
    category: "APLICACIÓN WEB · BASES DE DATOS",
    title: "BookHub",
    summary: "Aplicación de práctica orientada al registro de usuarios y libros, enfocada en formularios y almacenamiento de información.",
    objective: "Practicar cómo capturar datos desde una interfaz y trabajar con ellos mediante una aplicación conectada a una base de datos.",
    learning: ["Diseñar formularios para registrar información.", "Representar y gestionar registros de libros.", "Practicar consultas y relaciones de datos.", "Separar la estructura HTML de los estilos visuales."],
    tech: ["HTML", "CSS", "Python / Flask", "SQL / MySQL"]
  },
  emocionamente: {
    category: "FRONTEND · DISEÑO RESPONSIVE",
    title: "EmocionaMente",
    summary: "Sitio web informativo sobre bienestar emocional y mental, organizado en secciones temáticas y diseñado para facilitar la navegación.",
    objective: "Crear una experiencia clara y accesible para explorar recursos sobre libros, música y espacios tranquilos de Santiago.",
    learning: ["Organizar páginas y enlaces de navegación.", "Aplicar CSS para construir una identidad visual consistente.", "Adaptar el diseño a diferentes tamaños de pantalla.", "Integrar iconos y recursos visuales en la interfaz."],
    tech: ["HTML5", "CSS3", "Bootstrap Icons", "Diseño responsive"]
  },
  mando: {
    category: "PROYECTO PERSONAL · CONECTIVIDAD",
    title: "Celular como mando",
    summary: "Proyecto de práctica que explora el uso de un teléfono móvil como mando de videojuegos mediante conexión Bluetooth.",
    objective: "Investigar cómo conectar dispositivos y transformar acciones realizadas en el teléfono en entradas para un juego compatible.",
    learning: ["Explorar comunicación inalámbrica Bluetooth.", "Pensar el diseño de controles y la interacción del usuario.", "Resolver problemas de compatibilidad entre dispositivos y juegos."],
    tech: ["Bluetooth", "Aplicación móvil", "Conectividad"]
  },
  pettrack: {
    category: "PROYECTO EN DESARROLLO · FLASK",
    title: "PetTrack",
    summary: "Propuesta de aplicación para que cada usuario registrado gestione la información de sus mascotas desde una interfaz web.",
    objective: "Practicar registro e inicio de sesión y asociar los registros de mascotas con el usuario correspondiente.",
    learning: ["Diseñar formularios de autenticación.", "Aplicar operaciones CRUD a los registros de mascotas.", "Relacionar usuarios y mascotas en una base de datos.", "Proteger las vistas para que cada usuario gestione sus propios datos."],
    tech: ["Python", "Flask", "HTML", "CSS", "SQL"]
  }
};


let currentLanguage = "es";
const translations = {
"PORTAFOLIO · DESARROLLO WEB":"PORTFOLIO · WEB DEVELOPMENT",
"Convirtiendo ideas en ":"Turning ideas into ",
"soluciones digitales.":"digital solutions.",
"Soy ":"I'm ",
", estudiante de programación y desarrollador en formación. Creo proyectos web para aprender, resolver problemas y fortalecer mis habilidades técnicas.":", a programming student and aspiring developer. I build web projects to learn, solve problems, and strengthen my technical skills.",
"Explorar proyectos ":"Explore projects ",
"Contactar":"Get in touch","Sobre mí":"About me","Habilidades":"Skills","Proyectos":"Projects","Contacto":"Contact",
"Aprendiendo y construyendo":"Learning and building",
"Interfaces y diseño adaptable":"Interfaces and responsive design",
"Fundamentos con Python y Flask":"Python and Flask fundamentals",
"Consultas y bases de datos SQL":"SQL queries and databases",
"Aprendizaje práctico continuo":"Continuous hands-on learning",
"01 / SOBRE MÍ":"01 / ABOUT ME","Curiosidad técnica, ":"Technical curiosity, ","aprendizaje constante.":"continuous learning.",
"Estoy formándome en programación y desarrollo web, con experiencia práctica en ejercicios y proyectos académicos que combinan interfaces, lógica de programación y almacenamiento de información.":"I'm training in programming and web development, with hands-on experience in exercises and academic projects combining interfaces, programming logic, and data storage.",
"Me gusta entender cómo funciona cada parte de una aplicación: desde la estructura visual y la interacción del usuario hasta las rutas del servidor y la conexión con una base de datos. También tengo conocimientos básicos de instalación de sistemas operativos y mantenimiento de equipos.":"I enjoy understanding how each part of an application works: from visual structure and user interaction to server routes and database connections. I also have basic experience installing operating systems and maintaining computers.",
"Busco seguir creciendo, documentar mejor mis proyectos y adquirir experiencia colaborando en soluciones reales.":"I aim to keep improving, document my projects more clearly, and gain experience contributing to real-world solutions.",
"MI FORMA DE TRABAJAR":"HOW I WORK","Responsabilidad":"Responsibility",
"Organizar el trabajo y cumplir los objetivos propuestos.":"Organize work and meet the goals set.",
"Resolución de problemas":"Problem solving","Investigar errores y probar soluciones de forma ordenada.":"Investigate errors and test solutions methodically.",
"Aprendizaje práctico":"Practical learning","Transformar los conceptos estudiados en proyectos funcionales.":"Turn concepts into working projects.",
"02 / HABILIDADES":"02 / SKILLS","Herramientas con las que ":"Tools I work ","estoy trabajando.":"with.",
"Tecnologías que he utilizado en ejercicios, prácticas y proyectos personales o académicos. El nivel puede variar según la herramienta.":"Technologies I've used in exercises, practice, and personal or academic projects. My proficiency varies by tool.",
"Desarrollo frontend":"Frontend development","Construcción de páginas web estructuradas, estilos visuales y comportamiento interactivo.":"Building structured web pages, visual styles, and interactive behavior.",
"Backend":"Backend","Fundamentos de aplicaciones web, rutas, formularios, sesiones y validación con Python.":"Web application fundamentals, routes, forms, sessions, and validation with Python.",
"Bases de datos":"Databases","Práctica con almacenamiento de información, consultas y conexión desde aplicaciones.":"Practice with data storage, queries, and application database connections.",
"Herramientas y soporte":"Tools and support","Control de versiones, uso de editores y tareas básicas de instalación y mantenimiento.":"Version control, code editors, and basic installation and maintenance tasks.",
"Mi objetivo es consolidar estas bases y profundizar especialmente en JavaScript, Python, Flask y buenas prácticas de desarrollo.":"My goal is to strengthen these foundations and deepen my knowledge of JavaScript, Python, Flask, and development best practices.",
"03 / PROYECTOS":"03 / PROJECTS","Aprender haciendo.":"Learning by building.",
"Una selección de proyectos y prácticas. Abre cada ficha para conocer su propósito, funciones y tecnologías.":"A selection of projects and practice work. Open a card to learn about its purpose, features, and technologies.",
"Buscar un proyecto...":"Search projects...","Todos":"All","Otros":"Other","Ver detalles ":"View details ",
"Los proyectos académicos y en desarrollo se identifican como tales. Los enlaces a demos o repositorios se agregarán cuando estén publicados.":"Academic and in-progress projects are labeled accordingly. Demo and repository links will be added when available.",
"Aplicación de gestión de tareas para practicar el flujo completo de una aplicación web conectada a una base de datos.":"Task management app for practicing the full workflow of a web application connected to a database.",
"Proyecto de práctica orientado a construir una aplicación web organizada en controladores, vistas y lógica de servidor.":"Practice project for building a web app organized into controllers, views, and server logic.",
"Aplicación de práctica para registrar usuarios y libros, con foco en formularios, manejo de información y operaciones sobre registros.":"Practice app for registering users and books, focusing on forms, information handling, and record operations.",
"Sitio informativo dedicado al bienestar emocional, con secciones de libros, música y un mapa de espacios tranquilos de Santiago.":"Informational site about emotional well-being, with sections for books, music, and a map of peaceful places in Santiago.",
"Proyecto personal que explora el uso de Bluetooth para conectar un teléfono y utilizarlo como mando en juegos compatibles.":"Practice project exploring Bluetooth to connect a phone and use it as a controller for compatible games.",
"Propuesta de aplicación para que usuarios registrados administren la información de sus mascotas, practicando autenticación y CRUD.":"App concept for registered users to manage their pets' information while practicing authentication and CRUD operations.",
"Práctica académica":"Academic practice","Proyecto web":"Web project","Proyecto de práctica":"Practice project","Proyecto en desarrollo":"In progress",
"04 / PRESENTACIÓN":"04 / INTRODUCTION","También puedes conocer mi trabajo en ":"You can also learn about my work through a ",
"Esta sección está preparada para incluir una presentación breve de 1 a 2 minutos. Puedes explicar quién eres, qué has construido y qué quieres aprender a continuación.":"This section is ready for a short 1–2 minute introduction. You can explain who you are, what you've built, and what you want to learn next.",
"Presentación profesional":"Professional introduction",

"05 / CONTACTO":"05 / CONTACT","¿Hablamos de tecnología?":"Let's talk about technology.",
"Estoy interesado en seguir aprendiendo, desarrollar proyectos y explorar oportunidades de práctica o crecimiento profesional.":"I'm interested in continuing to learn, building projects, and exploring internship or professional growth opportunities.",
"CORREO ELECTRÓNICO":"EMAIL ADDRESS","Copiar correo":"Copy email",

"Construido con HTML, CSS y JavaScript.":"Built with HTML, CSS, and JavaScript.","Volver arriba ↑":"Back to top ↑",
"DETALLES DEL PROYECTO":"PROJECT DETAILS","Objetivo":"Objective","Qué practiqué":"What I practiced",
"No se encontraron proyectos con esa búsqueda. Prueba con otro término o filtro.":"No projects found. Try a different search term or filter.",
"Soy":"I’m","Explorar proyectos":"Explore projects","Curiosidad técnica,":"Technical curiosity,","Datos":"Data","Enfoque":"Focus","Convirtiendo ideas en":"Turning ideas into",
"soluciones digitales.":"digital solutions.",
"Herramientas con las que":"Tools I work",
"estoy trabajando.":"with.",
"También puedes conocer mi trabajo en":"You can also explore my work through",
"video.":"video.",
"Todos":"All","Web":"Web","Python / Flask":"Python / Flask","Otros":"Other",
"WEB APP":"WEB APP","SITIO INFORMATIVO":"INFORMATIONAL SITE","PROYECTO PERSONAL":"PERSONAL PROJECT",
"Práctica académica":"Academic project","Proyecto web":"Web project","Proyecto de práctica":"Practice project","Proyecto en desarrollo":"In progress",
"Python · Flask":"Python · Flask","Web · Datos":"Web · Data","Frontend":"Frontend","Conectividad":"Connectivity",
"Aplicación de gestión de tareas para practicar el flujo completo de una aplicación web conectada a una base de datos.":"A task management app for practicing the full workflow of a web application connected to a database.",
"Proyecto de práctica orientado a construir una aplicación web organizada en controladores, vistas y lógica de servidor.":"A practice project focused on building a web app organized into controllers, views, and server-side logic.",
"Aplicación de práctica para registrar usuarios y libros, con foco en formularios, manejo de información y operaciones sobre registros.":"A practice app for registering users and books, focusing on forms, data handling, and record operations.",
"Sitio informativo dedicado al bienestar emocional, con secciones de libros, música y un mapa de espacios tranquilos de Santiago.":"An informational website about emotional well-being, with sections for books, music, and a map of peaceful places in Santiago.",
"Proyecto personal que explora el uso de Bluetooth para conectar un teléfono y utilizarlo como mando en juegos compatibles.":"A personal project exploring Bluetooth connectivity to use a phone as a controller for compatible games.",
"Propuesta de aplicación para que usuarios registrados administren la información de sus mascotas, practicando autenticación y CRUD.":"An app concept that lets registered users manage their pets' information while practicing authentication and CRUD operations.",
"Ver detalles":"View details","Celular como mando":"Phone as a game controller","Bienestar":"Well-being",
"Saltar al contenido":"Skip to content","Navegación principal":"Main navigation","Abrir menú":"Open menu","Cerrar menú":"Close menu",
"Resumen de tecnologías":"Technology overview","Resumen profesional":"Professional summary","Filtrar proyectos":"Filter projects",
"Buscar proyectos":"Search projects","Cambiar tema":"Toggle theme","Cambiar idioma":"Change language","Cerrar detalles":"Close details",



};
const projectInfoEnglish = {
 tasktrack:{category:"PYTHON · FLASK · CRUD",title:"TaskTrack",summary:"A task management web app built to understand how views, server routes, and data work together.",objective:"Organize tasks and practice create, read, update, and delete operations.",learning:["Structure routes and controllers in Flask.","Build forms and HTML pages using templates.","Connect the app to a database and manage records.","Understand user sessions where implemented."],tech:["Python","Flask","HTML","CSS","SQL","CRUD"]},
 cinepedia:{category:"PYTHON · FLASK · MVC STRUCTURE",title:"CinePedia",summary:"An academic web project for practicing an organized application structure with controllers, views, and server-side logic.",objective:"Strengthen code organization and request/form handling in Flask.",learning:["Organize application files and modules.","Connect routes with controllers and templates.","Review Python imports and dependencies.","Work with movie-related information and forms as required."],tech:["Python","Flask","Jinja","HTML","CSS","SQL"]},
 bookhub:{category:"WEB APP · DATABASES",title:"BookHub",summary:"A practice application for registering users and books, focusing on forms and information storage.",objective:"Practice capturing data through an interface and managing it through a database-connected app.",learning:["Design forms to register information.","Manage book records.","Practice queries and data relationships.","Separate HTML structure from visual styles."],tech:["HTML","CSS","Python / Flask","SQL / MySQL"]},
 emocionamente:{category:"FRONTEND · RESPONSIVE DESIGN",title:"EmocionaMente",summary:"An informational website about emotional well-being, with themed sections and clear navigation.",objective:"Create an accessible experience for exploring books, music, and peaceful places in Santiago.",learning:["Organize pages and navigation links.","Use CSS for a consistent visual identity.","Adapt layouts to different screen sizes.","Integrate icons and visual resources."],tech:["HTML5","CSS3","Bootstrap Icons","Responsive design"]},
 mando:{category:"PERSONAL PROJECT · CONNECTIVITY",title:"Phone as a game controller",summary:"A practice project exploring how a mobile phone can be used as a game controller through Bluetooth.",objective:"Explore device connectivity and how phone actions can become input for a compatible game.",learning:["Explore Bluetooth communication.","Consider controller design and user interaction.","Investigate compatibility between devices and games."],tech:["Bluetooth","Mobile app","Connectivity"]},
 pettrack:{category:"IN PROGRESS · FLASK",title:"PetTrack",summary:"An app concept where each registered user manages information about their pets through a web interface.",objective:"Practice registration and login and associate pet records with the correct user.",learning:["Design authentication forms.","Apply CRUD operations to pet records.","Relate users and pets in a database.","Protect views so users manage only their own data."],tech:["Python","Flask","HTML","CSS","SQL"]}
};
const languageMessages = {
 es:{search:"Buscar un proyecto...",empty:"No se encontraron proyectos con esa búsqueda. Prueba con otro término o filtro.",copied:"Correo copiado al portapapeles.",fallback:"Abriendo tu aplicación de correo.",label:"Cambiar idioma a inglés"},
 en:{search:"Search projects...",empty:"No projects found. Try a different search term or filter.",copied:"Email copied to clipboard.",fallback:"Opening your email app.",label:"Cambiar idioma a español"}
};
function fillProjectDialog(key){
 const data=(currentLanguage==="en"?projectInfoEnglish:projectInfo)[key]; if(!data)return;
 dialog.dataset.projectKey=key;
 document.getElementById("dialogCategory").textContent=data.category;
 document.getElementById("dialogTitle").textContent=data.title;
 document.getElementById("dialogSummary").textContent=data.summary;
 document.getElementById("dialogObjective").textContent=data.objective;
 document.getElementById("dialogLearning").replaceChildren(...data.learning.map(s=>{const li=document.createElement("li");li.textContent=s;return li;}));
 document.getElementById("dialogTech").replaceChildren(...data.tech.map(s=>{const span=document.createElement("span");span.textContent=s;return span;}));
}
// Save each original text node once so switching languages never corrupts text.
const originalTextNodes = new Map();
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  if (node.parentElement && !node.parentElement.closest("script,style")) {
    originalTextNodes.set(node, node.nodeValue);
  }
}

function setLanguage(lang){
 currentLanguage=lang;
 document.documentElement.lang=lang;
 document.title=lang==="es"?"Yoycer García | Portafolio de desarrollo":"Yoycer García | Developer Portfolio";
 document.querySelector('meta[name="description"]').content=lang==="es"
   ?"Portafolio profesional de Yoycer García: desarrollo web, Python, Flask y bases de datos."
   :"Yoycer García’s professional portfolio: web development, Python, Flask, and databases.";
 originalTextNodes.forEach((original,node)=>{
   const key=original.trim();
   if(!key)return;
   const translated=lang==="en" ? (translations[key] || key) : key;
   const leading=original.match(/^\s*/)?.[0]||"";
   const trailing=original.match(/\s*$/)?.[0]||"";
   node.nodeValue=leading+translated+trailing;
 });
 const search=document.getElementById("projectSearch");
 search.placeholder=languageMessages[lang].search;
 search.setAttribute("aria-label",languageMessages[lang].search);
 document.getElementById("emptyState").textContent=languageMessages[lang].empty;
 document.getElementById("languageToggle").textContent=lang==="es"?"EN":"ES";
 document.getElementById("languageToggle").setAttribute("aria-label",languageMessages[lang].label);
 document.getElementById("menuToggle").setAttribute("aria-label",lang==="es"?"Abrir menú":"Open menu");
 document.querySelector(".nav").setAttribute("aria-label",lang==="es"?"Navegación principal":"Main navigation");
 document.querySelector(".filter-group").setAttribute("aria-label",lang==="es"?"Filtrar proyectos":"Filter projects");
 document.getElementById("themeToggle").setAttribute("aria-label",lang==="es"?"Cambiar tema":"Toggle theme");
 document.getElementById("dialogClose").setAttribute("aria-label",lang==="es"?"Cerrar detalles":"Close details");
 if(dialog.open && dialog.dataset.projectKey)fillProjectDialog(dialog.dataset.projectKey);
 filterProjects();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "dark") {
  root.dataset.theme = "dark";
  themeIcon.textContent = "☼";
}
themeToggle.addEventListener("click", () => {
  const dark = root.dataset.theme !== "dark";
  if (dark) {
    root.dataset.theme = "dark";
    localStorage.setItem("portfolio-theme", "dark");
    themeIcon.textContent = "☼";
  } else {
    delete root.dataset.theme;
    localStorage.setItem("portfolio-theme", "light");
    themeIcon.textContent = "◐";
  }
});

function filterProjects() {
  const query = searchInput.value.trim().toLocaleLowerCase(currentLanguage === "en" ? "en" : "es");
  let visibleCount = 0;
  projectCards.forEach(card => {
    const categories = card.dataset.category.split(" ");
    const text = `${card.dataset.search} ${card.innerText}`.toLocaleLowerCase(currentLanguage === "en" ? "en" : "es");
    const matchesFilter = activeFilter === "todos" || categories.includes(activeFilter);
    const matchesQuery = !query || text.includes(query);
    const visible = matchesFilter && matchesQuery;
    card.hidden = !visible;
    if (visible) visibleCount++;
  });
  emptyState.hidden = visibleCount !== 0;
}
filterButtons.forEach(button => button.addEventListener("click", () => {
  activeFilter = button.dataset.filter;
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  filterProjects();
}));
searchInput.addEventListener("input", filterProjects);

document.querySelectorAll(".project-details").forEach(button => button.addEventListener("click", () => {
  fillProjectDialog(button.dataset.project);
  dialog.showModal();
}));
document.getElementById("dialogClose").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

document.getElementById("copyEmail").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("yoycer23@gmail.com");
    showToast(languageMessages[currentLanguage].copied);
  } catch {
    window.location.href = "mailto:yoycer23@gmail.com";
    showToast(languageMessages[currentLanguage].fallback);
  }
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}
filterProjects();

document.getElementById("languageToggle").addEventListener("click",()=>setLanguage(currentLanguage==="es"?"en":"es"));
