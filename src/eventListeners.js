export function initEventListeners() {
    const MenuLinks = document.querySelectorAll("[wb-textfx-menu]");
    const NavLinks = document.querySelectorAll("[wb-nav-link]");
    const FooterLinks = document.querySelectorAll("[FooterLink]");
  
    function navLinkTo(Link, linkName) {
      Link.addEventListener("click", (event) => {
        event.preventDefault();
        const targetSection = Array.from(sections).find(
          (section) => section.getAttribute("wb-section") === linkName,
        );
        console.log("targetSection:", targetSection);
  
        if (targetSection) {
          scrollTo(event, targetSection);
        } else {
          console.error(`Section with wb-section='${linkName}' not found`);
        }
      });
    }
  
    if (MenuLinks.length > 0) {
      MenuLinks.forEach((Link) => {
        const linkName = Link.getAttribute("wb-textfx-menu");
        navLinkTo(Link, linkName);
      });
    } else {
      console.error("wb-textfx-menu: not found");
    }
  
    if (NavLinks.length > 0) {
      NavLinks.forEach((Link) => {
        const linkName = Link.getAttribute("wb-nav-link");
        navLinkTo(Link, linkName);
      });
    } else {
      console.error("wb-nav-link: not found");
    }
  
    if (FooterLinks.length > 0) {
      FooterLinks.forEach((Link) => {
        const linkName = Link.getAttribute("FooterLink");
        navLinkTo(Link, linkName);
      });
    } else {
      console.error("FooterLink: not found");
    }
  
    const contatoUrl = "https://wa.me/message/ED5PWGKO3JGEB1";
    const contatoLink = document.querySelectorAll("[contatoLink]");
    console.log("contatoLink:", contatoLink);
  
    if (contatoLink) {
      contatoLink.forEach((Link) => {
        Link.addEventListener("click", (event) => {
          if (contatoUrl) {
            event.preventDefault();
            window.open(contatoUrl, "_blank");
          }
        });
      });
    } else {
      console.error("[contatoLink] not found");
    }
  
    const wrappers = document.querySelectorAll(".ExplainExpand_Wrapper");
    wrappers.forEach((wrapper) => {
      const card = wrapper.querySelector(".explain-card");
  
      card.addEventListener("mouseenter", () => {
        wrapper.classList.add("expand");
      });
  
      card.addEventListener("mouseleave", () => {
        wrapper.classList.remove("expand");
      });
    });
  
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
      console.error("Element with ID 'card' not found");
    }
  
    const explaincards = document.querySelector("[explain-cards]");
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
    } else {
      console.error("Element with ID 'explaincard' not found");
    }
  }
  