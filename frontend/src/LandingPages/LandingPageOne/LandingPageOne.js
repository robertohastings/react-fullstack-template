
import React, {useContext, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styles from './LandingPageOne.module.css';
import { useScrollToTopBtn } from './hooks';
import Header2 from '../Header2';
import StateContext from '../../StateContext';

function LandingPageOne({content}) {
  // Hook para scroll to top
  const { showBtn, scrollToTop, btnRef } = useScrollToTopBtn();
  const location = useLocation();
  const appState = useContext(StateContext);
  console.log('appState:', appState);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);  

    return (
        <>
        {/* <Header2 /> */}
        <section id="inicio" className={styles["hero"]}>
            <div className={styles["container"]}>
                <div className={styles["hero-text"]}>
                    {/* <h1 className={styles["hero-title"]}>Tu Asistente Virtual Personalizado para un Éxito sin Límites</h1> */}
                    <h1 className={styles["hero-title"]}><div dangerouslySetInnerHTML={{ __html: appState.landingPage.inicioTitulo }} /></h1>
                    <p className={styles["hero-description"]}><div dangerouslySetInnerHTML={{ __html: appState.landingPage.inicioDescripcion }} /></p>
                    <a href="#contacto" className={styles["btn-primary"]}>¡Descubre cómo podemos ayudarte!</a>
                </div>
                <div className={styles["hero-image"]}>
                    {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsJa5teIeKwt09pbTrM9UskNE4eCayhgF4gg&s" alt="Asistente Virtual" /> */}
                </div>
            </div>
        </section>

        {/* --- NUEVA SECCIÓN DE CATEGORÍAS --- */}
        {appState.landingPage.categorias && appState.landingPage.categorias.length > 0 && (
            <section id="categorias" className={styles["categories-section"]}>
                <div className={styles["container"]}>
                    <h2 className={styles["section-title"]}>Explora Nuestras Categorías de Productos</h2>
                    <p className={styles["section-description"]}>Encuentra los productos que necesitas, organizados para tu comodidad.</p>
                    <div className={styles["categories-grid"]}>
                        {appState.landingPage.categorias.map((categoria) => (
                            <a href="#" key={categoria.id_categoria} className={styles["category-item"]}>
                                <img src={categoria.imagen} alt={categoria.nombre} className={styles["category-image"]} />
                                <div className={styles["category-overlay"]}>
                                    <h3 className={styles["category-title"]}>{categoria.nombre}</h3>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className={styles["text-center"]} style={{ marginTop: '50px' }}>
                        <Link to="/crm/products" className={styles["btn-primary"]}>
                            Comprar
                        </Link>
                    </div>                    
                </div>
            </section>
        )}

        <section id="servicios" className={styles["services-section"]}>
            <div className={styles["container"]}>
                <h2 className={styles["section-title"]}>Nuestros Servicios Destacados</h2>
                <p className={styles["section-description"]}>Impulsa tu productividad y enfócate en el crecimiento de tu negocio con nuestra amplia gama de servicios especializados.</p>

                <div className={styles["services-grid"]}>
                    <div className={styles["service-item"]}>
                        <div className={styles["service-icon"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles["feather feather-briefcase"]}><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                        </div>
                        <h3 className={styles["service-title"]}>Gestión Administrativa</h3>
                        <p className={styles["service-description"]}>Organización de agenda, gestión de correos, preparación de documentos y asistencia en la planificación de proyectos.</p>
                    </div>
                    <div className={styles["service-item"]}>
                        <div className={styles["service-icon"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles["feather feather-share-2"]}><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        </div>
                        <h3 className={styles["service-title"]}>Marketing Digital y Redes Sociales</h3>
                        <p className={styles["service-description"]}>Creación de contenido, programación de publicaciones, interacción con la comunidad y análisis de métricas.</p>
                    </div>
                    <div className={styles["service-item"]}>
                        <div className={styles["service-icon"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles["feather feather-headphones"]}><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                        </div>
                        <h3 className={styles["service-title"]}>Soporte y Atención al Cliente</h3>
                        <p className={styles["service-description"]}>Gestión de consultas, soporte por email o chat, y construcción de relaciones duraderas con tus clientes.</p>
                    </div>
                </div>
                <div className={styles["text-center"]}>
                    <a href="#contacto" className={styles["btn-primary"]}>¡Explora todos nuestros servicios!</a>
                </div>
            
            </div>
        </section>
        <section id="quien-soy" className={styles["about-section"]}>
            <div className={styles["container"]}>
                <div className={styles["about-text"]}>
                    <h2 className={styles["section-title"]}>Sobre Nosotros: Tu Aliado Estratégico</h2>
                    <p className={styles["section-description"]}>
                        En **Asistente Virtual**, creemos firmemente que tu tiempo es tu activo más valioso. Somos un equipo de profesionales dedicados a liberar tu agenda de tareas administrativas y operativas, permitiéndote concentrarte en lo que realmente impulsa el crecimiento de tu negocio.
                    </p>
                    <p className={styles["section-description"]}>
                        Con **años de experiencia** en diversas industrias, ofrecemos soluciones personalizadas que van desde la gestión de correo electrónico y agenda, hasta el soporte al cliente y la administración de redes sociales. Nos apasiona la organización, la eficiencia y el éxito de nuestros clientes.
                    </p>
                    <p className={styles["section-description"]}>
                        Nuestro compromiso es ser más que un servicio; queremos ser una **extensión de tu equipo**, un socio de confianza que entiende tus necesidades y se anticipa a ellas. **Tu éxito es nuestra prioridad.**
                    </p>
                    <a href="#contacto" className={styles["btn-primary"]}>¡Hablemos de tus necesidades!</a>
                </div>
                <div className={styles["about-image"]}>
                    {/* <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Sobre Nosotros" className={styles["about-image"]} /> */}
                </div>
            </div>
        </section>
        <section id="blog" className={styles["blog-section"]}>
            <div className={styles["container"]}>
                <h2 className={styles["section-title"]}>Últimas Publicaciones de Nuestro Blog</h2>
                <p className={styles["section-description"]}>
                    Mantente al día con nuestros consejos, tendencias y mejores prácticas para maximizar la productividad y el éxito de tu negocio.
                </p>

                <div className={styles["blog-grid"]}>
                    <article className={styles["blog-post"]}>
                        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Optimiza tu tiempo" className={styles["post-image"]} />
                        <div className={styles["post-content"]}>
                            <h3 className={styles["post-title"]}>5 Estrategias para Optimizar la Gestión de tu Tiempo</h3>
                            <p className={styles["post-excerpt"]}>Descubre cómo un asistente virtual puede transformar tu agenda y ayudarte a lograr más en menos tiempo.</p>
                            <a href="#" className={styles["read-more"]}>Leer más &rarr;</a>
                        </div>
                    </article>

                    <article className={styles["blog-post"]}>
                        <img src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Marketing digital" className={styles["post-image"]} />
                        <div className={styles["post-content"]}>
                            <h3 className={styles["post-title"]}>Claves del Marketing Digital para Emprendedores Ocupados</h3>
                            <p className={styles["post-excerpt"]}>Desde redes sociales hasta email marketing, aprende a delegar y potenciar tu presencia online.</p>
                            <a href="#" className={styles["read-more"]}>Leer más &rarr;</a>
                        </div>
                    </article>

                    <article className={styles["blog-post"]}>
                        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4cd085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Herramientas virtuales" className={styles["post-image"]} />
                        <div className={styles["post-content"]}>
                            <h3 className={styles["post-title"]}>Las Mejores Herramientas para un Asistente Virtual Eficiente</h3>
                            <p className={styles["post-excerpt"]}>Explora las plataformas y aplicaciones esenciales que utilizamos para ofrecerte un servicio de primera.</p>
                            <a href="#" className={styles["read-more"]}>Leer más &rarr;</a>
                        </div>
                    </article>
                </div>
                <div className={styles.textCenter}>
                    <a href="#" className={styles.btnPrimary}>Ver Todas las Publicaciones</a>
                </div>
            </div>
        </section>
        <section id="contacto" className={styles["contact-section"]}>
            <div className={styles["container"]}>
                <div className={styles["contact-info"]}>
                    <h2 className={styles["section-title"]}>Hablemos de tu Negocio</h2>
                    <p className={styles["section-description"]}>
                        ¿Listo para liberar tu tiempo y escalar tu negocio? Contáctanos hoy mismo para descubrir cómo nuestro asistente virtual personalizado puede ayudarte.
                    </p>
                    <div className={styles["contact-details"]}>
                        <p><strong className={styles["detail-label"]}>Email:</strong> <a href="mailto:info@tuasistentevirtual.com">info@tuasistentevirtual.com</a></p>
                        <p><strong className={styles["detail-label"]}>Teléfono:</strong> <a href="tel:+34123456789">+34 123 456 789</a></p>
                        <p><strong className={styles["detail-label"]}>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
                    </div>
                    <div className={styles["social-icons"]}>
                        <a href="#" aria-label="LinkedIn" title="LinkedIn" className={styles["social-icon"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.featherLinkedin}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                        <a href="#" aria-label="Twitter" title="Twitter" className={styles["social-icon"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.featherTwitter}><path d="M22.022 5.093a8.9 8.9 0 0 1-2.616.717 4.471 4.471 0 0 0 1.956-2.52c-.83.493-1.751.85-2.73.99A4.472 4.472 0 0 0 12.02 6.5c-2.483 0-4.492 2.01-4.492 4.492 0 .35.04.69.112 1.02-.373-.02-.746-.07-1.11-.144l-.234-.05a12.72 12.72 0 0 1-9.255-4.686 4.47 4.47 0 0 0 1.39 5.962 4.453 4.453 0 0 1-2.028-.56c.002.02.002.04.002.067 0 2.175 1.547 3.99 3.593 4.402a4.512 4.512 0 0 1-2.02.077c.567 1.777 2.215 3.076 4.168 3.11A8.99 8.99 0 0 1 0 19.34a12.63 12.63 0 0 0 6.84 2.004c8.207 0 12.71-6.793 12.71-12.71 0-.193-.004-.386-.013-.578A9.09 9.09 0 0 0 22.022 5.093z"/></svg></a>
                        <a href="#" aria-label="Instagram" title="Instagram" className={styles["social-icon"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.featherInstagram}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="https://wa.me/XXXXXXXXXXX" target="_blank" aria-label="Enviar mensaje por WhatsApp" className={styles["social-icon"]} title="WhatsApp">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552"><defs><linearGradient id="b" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#57d163"/><stop offset="1" stopColor="#23b33a"/></linearGradient><filter id="a" width="1.115" height="1.114" x="-.057" y="-.057" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="3.531"/></filter></defs><path fill="#b3b3b3" d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0" filter="url(#a)"/><path fill="#fff" d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"/><path fill="url(#linearGradient1780)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"/><path fill="url(#b)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"/><path fill="#fff" fillRule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"/></svg>
                        </a>                    
                    </div>
                </div>
                
                <div className={styles["contact-form-wrapper"]}>
                    <form action="#" method="POST" className={styles["contact-form"]}>
                        <div className={styles["form-group"]}>
                            <label htmlFor="name">Nombre Completo:</label>
                            <input type="text" id="name" name="name" required placeholder="Tu Nombre" />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="email">Correo Electrónico:</label>
                            <input type="email" id="email" name="email" required placeholder="tu@ejemplo.com" />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="subject">Asunto:</label>
                            <input type="text" id="subject" name="subject" required placeholder="Consulta sobre servicios" />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="message">Tu Mensaje:</label>
                            <textarea id="message" name="message" rows="5" required placeholder="Describe brevemente cómo podemos ayudarte..."></textarea>
                        </div>
                        <button type="submit" className={styles["btn-primary"]}>Enviar Mensaje</button>
                    </form>
                </div>
            </div>
        </section>

        <footer className={styles["site-footer"]}>

            <div className={styles["container"] + " " + styles["footer-content"]}>

                <div className={styles["footer-section"] + " " + styles["footer-brand"]}>
                    
                    <a href="index.html" className={styles["logo"] + " " + styles["footer-logo"]}>
                        <strong>Asistente</strong>Virtual
                    </a>
                        

                    <p className={styles["brand-description"]}>Tu aliado estratégico para la eficiencia y el crecimiento.</p>

                    <div className={styles["social-icons"] + " " + styles["footer-social"]}>
                        
                        <a href="#" aria-label="LinkedIn" className={styles["social-icon"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                        <a href="#" aria-label="Twitter" className={styles["social-icon"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-twitter"><path d="M22.022 5.093a8.9 8.9 0 0 1-2.616.717 4.471 4.471 0 0 0 1.956-2.52c-.83.493-1.751.85-2.73.99A4.472 4.472 0 0 0 12.02 6.5c-2.483 0-4.492 2.01-4.492 4.492 0 .35.04.69.112 1.02-.373-.02-.746-.07-1.11-.144l-.234-.05a12.72 12.72 0 0 1-9.255-4.686 4.47 4.47 0 0 0 1.39 5.962 4.453 4.453 0 0 1-2.028-.56c.002.02.002.04.002.067 0 2.175 1.547 3.99 3.593 4.402a4.512 4.512 0 0 1-2.02.077c.567 1.777 2.215 3.076 4.168 3.11A8.99 8.99 0 0 1 0 19.34a12.63 12.63 0 0 0 6.84 2.004c8.207 0 12.71-6.793 12.71-12.71 0-.193-.004-.386-.013-.578A9.09 9.09 0 0 0 22.022 5.093z"/></svg></a>
                        <a href="#" aria-label="Instagram" className={styles["social-icon"]}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                        <a href="https://wa.me/XXXXXXXXXXX" target="_blank" aria-label="Enviar mensaje por WhatsApp" className={styles["social-icon"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552"><defs><linearGradient id="b" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#57d163"/><stop offset="1" stopColor="#23b33a"/></linearGradient><filter id="a" width="1.115" height="1.114" x="-.057" y="-.057" colorInterpolationFilters="sRGB"><feGaussianBlur stdDeviation="3.531"/></filter></defs><path fill="#b3b3b3" d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0" filter="url(#a)"/><path fill="#fff" d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"/><path fill="url(#linearGradient1780)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"/><path fill="url(#b)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"/><path fill="#fff" fillRule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"/></svg>
                        </a>
                        
                    </div>                        
                </div>

                <div className={styles["footer-section"] + " " + styles["footer-links"]}>
                    <h3 className={styles["footer-heading"]}>Enlaces Rápidos</h3>
                    <ul>
                        <li><a href="#inicio">Inicio</a></li>
                        <li><a href="#servicios">Servicios</a></li>
                        <li><a href="#quien-soy">Quién soy</a></li>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#contacto">Contacto</a></li>
                    </ul>
                </div>

                <div className={styles["footer-section"] + " " + styles["footer-newsletter"]}>
                    <h3 className={styles["footer-heading"]}>Newsletter</h3>
                    <p>Suscríbete para recibir nuestros últimos consejos y ofertas.</p>
                    <form action="#" method="POST" className={styles["newsletter-form"]}>
                        <input type="email" placeholder="Tu correo electrónico" required className={styles["newsletter-input"]}></input>
                        <button type="submit" className={styles["btn-primary"]}>Suscribirse</button>
                    </form>
                </div>
            </div>

            

            <div className={styles["footer-bottom"]}>
                <div className={styles["container"] + " " + styles["footer-bottom-content"]}>
                    <p className={styles["copyright"]}>&copy; 2024 Asistente Virtual. Todos los derechos reservados.</p>
                    <p className={styles["powered-by"]}>Powered by <a href="https://hostregio.app" target="_blank">HostRegio.app</a></p>
                </div>
            </div>

        </footer>
        <button
            id="scrollToTopBtn"
            className={`${styles["scroll-to-top-btn"]} ${showBtn ? styles.show : ''}`}
            aria-label="Ir al inicio de la página"
            onClick={scrollToTop}
            ref={btnRef}
            type="button"
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
            </svg>
        </button>
    </>
  )
}

export default LandingPageOne