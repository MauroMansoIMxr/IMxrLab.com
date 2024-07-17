import '../style.css'; 

// Ensure document is ready
document.addEventListener("DOMContentLoaded", () => {
    try {
      //#region Log State
      const shouldLog = false;
      
      function logMessage(...args){
        if (shouldLog  == true){
          console.log(...args);
        }
      }

      function logErrorMessage(...args){
        if (shouldLog  == true){
          console.error(...args);
        }
      }
      //#endregion

      logMessage("Document is ready, 'global.js' Loaded!");

      // Register GSAP Scroll Trigger
      gsap.registerPlugin(ScrollTrigger);
  
      //#region Initialize Modal Close
      gsap.set("[Modal_Container]", { display: "none" });
      //#endregion

      function easeOutQuad(x) {
        return 1 - (1 - x) * (1 - x);
      }
  
        //#region Hero Scroll Animation
        // Debugging function
        function logProgress(progress) {
          logMessage("Scroll progress msm:", progress);
        }
    
        function logBreakpoint(breakpoint) {
          logMessage("Current breakpoint:", breakpoint);
        }
    
        function logBreakpointChange(breakpoint) {
            logMessage("Breakpoint changed to:", breakpoint);
        }
  
        let currentBreakpoint = "";
    
        const variables = {
            offsetTop: -0.1 * window.innerHeight,
            endOffset: window.innerHeight * 0.2,
            scrolldownLinkY: "-10rem",
            herotitleBWrapperY: "-10rem",
            herotitleAY: "-19rem",
            heroWrapperEndWidth: "1296px",
            heroWrapperEndHeight: "calc(100vh - 10rem)",
        };
  
        function createAnimations() {
            // Clear any previous ScrollTriggers
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    
            gsap
            .timeline({
                scrollTrigger: {
                trigger: ".sticky_track",
                start: `top-=${variables.offsetTop} top`,
                end: `bottom-=${variables.endOffset} bottom`,
                scrub: true,
                onUpdate: (self) => logProgress(self.progress),
                },
            })
            .to(
                ".hero-wrapper",
                {
                width: variables.heroWrapperEndWidth,
                height: variables.heroWrapperEndHeight,
                },
                0,
            )
            .to(".scrolldown_link", { opacity: 0, duration: 0.3 }, 0)
            .to(".scrolldown_link", { y: variables.scrolldownLinkY }, 0)
            .to(".herotitle-b_wrapper", { y: variables.herotitleBWrapperY }, 0)
            .to(".herotitle-a", { y: variables.herotitleAY }, 0)
            .to(".herotitle-b", { y: 0, duration: 0.3 }, 0.3);
        }

        //Child Hover Listenner for animation in css
        function explainCardAnimations(breakpoint){
            const explainWrappers = document.querySelectorAll('[explain-expand_wrapper]');
            const explaincards = document.querySelector("[explain-cards]");

            if (breakpoint == "desktop"){
                explainWrappers.forEach(explainWrapper => {
                    const card = explainWrapper.querySelector('[explain-card]');
        
                    if (!card) {
                      logErrorMessage('Card not found');
                    return;
                    }
        
                    card.addEventListener('mouseover', () => {
                    explainWrapper.classList.add('expand');
                    });
        
                    card.addEventListener('mouseout', () => {
                    explainWrapper.classList.remove('expand');
                    });
                });

                if (explaincards) {
                    explaincards.onmousemove = (e) => {
                        for (const explaincard of document.querySelectorAll("[explain-card]")) {
                            const rect = explaincard.getBoundingClientRect(),
                            x = e.clientX - rect.left,
                            y = e.clientY - rect.top;
        
                            explaincard.style.setProperty("--mouse-x", `${x}px`);
                            explaincard.style.setProperty("--mouse-y", `${y}px`);
                        }
                    };
                }else {
                  logErrorMessage("Element with ID 'explaincard' not found");
                }
            }else{
                explainWrappers.forEach(explainWrapper => {
                    const card = explainWrapper.querySelector('[explain-card]');
        
                    if (!card) {
                      logErrorMessage('Card not found');
                    return;
                    }
        
                    gsap.to(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top+=20px center",
                        end: "bottom-=20px center",
                        toggleClass: { targets: explainWrapper, className: "expand" },
                    }
                    });
                });

                if (explaincards) {
                    document.onscroll = function(e) {
                        for (const explaincard of document.querySelectorAll("[explain-card]")) {
                            const centerX = window.innerWidth / 2;
                            const centerY = window.innerHeight / 2;
                            const rect = explaincard.getBoundingClientRect();
                            const x = centerX - rect.left;
                            const y = centerY - rect.top;
                    
                            explaincard.style.setProperty("--mouse-x", `${x}px`);
                            explaincard.style.setProperty("--mouse-y", `${y}px`);
                        }
                    }; 
                } else {
                  logErrorMessage("Element with ID 'explaincard' not found");
                }
            }
        }

        

        function updateVariables(breakpoint) {
            switch (breakpoint) {
            case "desktop":
                variables.heroWrapperEndWidth = "1296px";
                break;
            case "tablet":
                variables.heroWrapperEndWidth = "100%";
                variables.herotitleAY = "-16rem";
                break;
            case "mobile-l":
                variables.heroWrapperEndWidth = "100%";
                variables.herotitleAY = "-13.5rem";
                variables.endOffset = window.innerHeight * 0.1;
                break;
            case "mobile-p":
                variables.heroWrapperEndWidth = "100%";
                variables.herotitleAY = "-13.5rem";
                variables.endOffset = window.innerHeight * 0.1;
                break;
            }
        }
  
        function setupResponsiveAnimations() {
            const mediaQueryList = [
            { media: "(min-width: 992px)", breakpoint: "desktop" },
            {
                media: "(max-width: 991px) and (min-width: 768px)",
                breakpoint: "tablet",
            },
            {
                media: "(max-width: 767px) and (min-width: 480px)",
                breakpoint: "mobile-l",
            },
            {
                media: "(max-width: 479px) and (min-width: 240px)",
                breakpoint: "mobile-p",
            },
        ];
    
        mediaQueryList.forEach(({ media, breakpoint }) => {
            const mql = window.matchMedia(media);
            mql.addEventListener("change", (e) => {
                if (e.matches) {
                    if (currentBreakpoint !== breakpoint) {
                        currentBreakpoint = breakpoint;
                        logBreakpointChange(breakpoint);
                        updateVariables(breakpoint);
                        createAnimations();
                        explainCardAnimations(breakpoint);
                    }
                }
            });
            if (mql.matches && currentBreakpoint !== breakpoint) {
                currentBreakpoint = breakpoint;
                logBreakpoint(breakpoint);
                updateVariables(breakpoint);
                createAnimations();
                explainCardAnimations(breakpoint);
            }
        });
      }
  
      setupResponsiveAnimations();
      //#endregion
  
      function openModal(event, modalType, id) {
        logMessage(`Open modal ${modalType} triggered`);
        event.preventDefault(); // Prevent default action if it is a link
  
        // Log the clicked element
        const clickedElement = event.currentTarget;
        logMessage("Clicked element:", clickedElement);
        logMessage("Clicked id:", id);
  
        let clickedName = clickedElement.getAttribute(
          `${modalType.toLowerCase()}link_name`,
        );
        logMessage("Clicked Item name:", clickedName);
  
        const cmsFilter = document.querySelector(
          `[Modal_Wrapper='${modalType}']`,
        );
        const cmsFilterItems = cmsFilter.querySelectorAll(
          `[${modalType}_CollectionItem]`,
        );
        logMessage("cmsFilterItems:", cmsFilterItems);
  
        cmsFilterItems.forEach((item) => {
          const name = item.getAttribute("itemname");
          logMessage("Item", item, "Name:", name);
  
          if (name === clickedName) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        });
  
        gsap.set(`[Modal_Container='${modalType}']`, {
          opacity: 0,
          display: "flex",
        });
        gsap.set(`[Modal_Wrapper='${modalType}']`, {
          //top: "100vh",
          rotationX: 90,
          transformPerspective: 2500,
          transformOrigin: "center center",
        });
  
        gsap.to(`[Modal_Container='${modalType}']`, {
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
        });
        gsap.to(`[Modal_Wrapper='${modalType}']`, {
          //top: "0vh",
          duration: 0.5,
          rotationX: 0,
          ease: "power1.out",
        });
      }
  
      function closeModal(event) {
        logMessage("Close modal triggered");
        event.preventDefault(); // Prevent default action if it is a link
  
        gsap.to("[Modal_Wrapper]", {
          //top: "100vh",
          rotationX: 90,
          duration: 0.4,
          ease: "power1.out",
        });
  
        gsap.to("[Modal_Container]", {
          opacity: 0,
          duration: 0.5,
          ease: "power1.out",
          onComplete: function () {
            gsap.set("[Modal_Container]", {
              display: "none",
            });
          },
        });
      }
  
      function scrollTo(event, section) {
        logMessage(
          "Scroll Down triggered for section: ",
          section.getAttribute("wb-section"),
        );
        event.preventDefault(); // Prevent default action if it is a link
        lenis.scrollTo(section, {
          duration: 2, // Duration in seconds
          easing: easeOutQuad, // Use the ease out quad easing function
        });
      }
  
      // Function to reaveal Navbar BG outside Hero Section
      function revealNavBG(event) {
        //Initial State
        gsap.set(navBG, { opacity: 0 });
  
        // Scroll trigger
        ScrollTrigger.create({
          trigger: HeroSection,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true, // Synchronize the animation with the scroll position
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.to(navBG, { duration: 1, opacity: progress });
          },
          onLeave: () => {},
        });
      }
  
      // Function to scroll to Nav Link correspondent Section
      function navLinkTo(Link, linkName) {
        Link.addEventListener("click", (event) => {
          event.preventDefault();
  
          // Find the matching section
          const targetSection = Array.from(sections).find(
            (section) => section.getAttribute("wb-section") === linkName,
          );
          logMessage("targetSection:", targetSection);
  
          if (targetSection) {
            // Scroll to the matching section
            scrollTo(event, targetSection);
          } else {
            logErrorMessage(`Section with wb-section='${linkName}' not found`);
          }
        });
      }
  
      //#region Sections Declaring
      const sections = document.querySelectorAll("[wb-section]");
      const NavBarSection = document.querySelector("[wb-section='Navbar']");
      const SectionPartner = document.querySelector("[wb-section='Partner']");
      const HeroSection = document.querySelector("[wb-section='Hero']");
      const ExpertiseSection = document.querySelector(
        "[wb-section='Expertise_Title']",
      );
      const EstruturaSection = document.querySelector("[wb-section='Estrutura']");
      const SolucoesSection = document.querySelector("[wb-section='Solucoes']");
  
      logMessage("wb-sections:", sections);
      logMessage("wb-section='Navbar'", NavBarSection);
      logMessage("wb-section='Partner':", SectionPartner);
      logMessage("wb-section='Hero':", HeroSection);
      logMessage("wb-section='Expertise_Title'", ExpertiseSection);
      logMessage("wb-section='Estrutura:", EstruturaSection);
      logMessage("wb-section='Solucoes':", SolucoesSection);
  
      // Nav BG Declaring
      const navBG = document.querySelector("[wb-background='nav_BG']");
      logMessage("navBG:", navBG);
  
      if (navBG && HeroSection) {
        revealNavBG();
      } else {
        logErrorMessage("wb-section=Hero or wb-background='nav_BG' not found");
      }
      //#endregion
  
      //#region Nav Links Event listener
  
      const NavLinks = document.querySelectorAll("[wb-nav-link]");
      const MenuLinks = document.querySelectorAll("[wb-textfx-menu]");
  
      if (MenuLinks.length > 0) {
        MenuLinks.forEach((Link) => {
          const linkName = Link.getAttribute("wb-textfx-menu");
          navLinkTo(Link, linkName);
        });
      } else {
        logErrorMessage("wb-textfx-menu: not found");
      }
  
      if (NavLinks.length > 0) {
        NavLinks.forEach((Link) => {
          const linkName = Link.getAttribute("wb-nav-link");
          navLinkTo(Link, linkName);
        });
      } else {
        logErrorMessage("wb-nav-link: not found");
      }
  
      const FooterLinks = document.querySelectorAll("[FooterLink]");
  
      if (FooterLinks.length > 0) {
        FooterLinks.forEach((Link) => {
          const linkName = Link.getAttribute("FooterLink");
          navLinkTo(Link, linkName);
        });
      } else {
        logErrorMessage("wb-textfx-menu: not found");
      }
      //#endregion
  
      //#region Contato Links Event listeners
      const contatoUrl = "https://wa.me/message/ED5PWGKO3JGEB1";
  
      const contatoLink = document.querySelectorAll("[contatoLink]");
      logErrorMessage("contatoLink:", contatoLink);
  
      if (contatoLink) {
        contatoLink.forEach((Link) => {
          Link.addEventListener("click", (event) => {
            if (contatoUrl) {
              event.preventDefault();
              window.open(contatoUrl, "_blank"); // Opens the URL in a new tab
            }
          });
        });
      } else {
        logErrorMessage("[contatoLink] not found");
      }
      //#endregion
  
      //#region Scroll Down Hero link Event listener
      const scrollDownLink = document.querySelector("[ScrollDownLink]");
      logErrorMessage("scrollDownLink:", scrollDownLink);
  
      if (scrollDownLink) {
        scrollDownLink.addEventListener("click", (event) =>
          scrollTo(event, SectionPartner),
        );
      } else {
        logErrorMessage("[ScrollDownLink] not found");
      }
      //#endregion
  
      //#region Scroll Up Footer Logo Event listener
      const FooterLogo = document.querySelector("[Footer_Link='Logo']");
      logMessage("Footer_Link='Logo':", scrollDownLink);
  
      if (FooterLogo && HeroSection) {
        FooterLogo.addEventListener("click", (event) =>
          scrollTo(event, HeroSection),
        );
      } else {
        logErrorMessage("[FooterLogo] not found");
      }
      //#endregion
  
      //#region Modal Event listeners
      function addEventListeners(modalType) {
        const modalLinks = document.querySelectorAll(
          `[OpenModalLink='${modalType}']`,
        );
        const modalCover = document.querySelector(`[ModalCover='${modalType}']`);
        const closeLink = document.querySelector(
          `[CloseModalLink='${modalType}']`,
        );
        const backLink = document.querySelector(`[BackModalLink='${modalType}']`);
  
        logMessage(`${modalType} Links:`, modalLinks);
        logMessage(`${modalType} modalCover:`, modalCover);
        logMessage(`${modalType} closeLink:`, closeLink);
        logMessage(`${modalType} backLink:`, backLink);
  
        if (modalLinks.length > 0) {
          modalLinks.forEach((link, index) => {
            link.addEventListener("click", (event) =>
              openModal(event, modalType, index),
            );
          });
        } else {
          logErrorMessage(`[OpenModalLink='${modalType}'] not found`);
        }
  
        if (modalCover) {
          modalCover.addEventListener("click", closeModal);
        } else {
          logErrorMessage(`ModalCover='${modalType}' not found`);
        }
  
        if (closeLink) {
          closeLink.addEventListener("click", closeModal);
        } else {
          logErrorMessage(`CloseModalLink='${modalType}' not found`);
        }
  
        if (backLink) {
          backLink.addEventListener("click", closeModal);
        } else {
          logErrorMessage(`BackModal_Link='${modalType}' not found`);
        }
      }
  
      addEventListeners("Expertise");
      addEventListeners("Solucoes");
      addEventListeners("Structure");
      //#endregion
  
      //#region Card listeners
      const cards = document.querySelector("[cards]");
  
      if (cards) {
        cards.onmousemove = (e) => {
          for (const card of document.querySelectorAll("[card]")) {
            const rect = card.getBoundingClientRect(),
              x = e.clientX - rect.left,
              y = e.clientY - rect.top;
  
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
          }
        };
      } else {
        logErrorMessage("Element with ID 'card' not found");
      }
      //#endregion
  

    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
  