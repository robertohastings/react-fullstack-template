import { useState, useEffect, useRef } from "react";

// Hook para el menú móvil (hamburguesa)
export function useMobileMenu() {
  const [menuActive, setMenuActive] = useState(false);
  const menuToggleRef = useRef(null);
  const mainNavRef = useRef(null);

  useEffect(() => {
    if (menuToggleRef.current && mainNavRef.current) {
      menuToggleRef.current.setAttribute("aria-expanded", menuActive);
    }
  }, [menuActive]);

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  return {
    menuActive,
    toggleMenu,
    menuToggleRef,
    mainNavRef,
  };
}

// Hook para el botón scroll to top
export function useScrollToTopBtn() {
  const [showBtn, setShowBtn] = useState(false);
  const btnRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Muestra el botón si el scroll es mayor a 400px
      if (window.scrollY > 400) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };

    // Agrega el listener cuando el componente se monta
    window.addEventListener('scroll', handleScroll);

    // Limpia el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Desplazamiento suave
    });
  };

  return {
    showBtn,
    scrollToTop,
    btnRef,
  };
}
