import gsap from 'gsap';

export function initScroll() {
  function easeOutQuad(x) {
    return 1 - (1 - x) * (1 - x);
  }

  function scrollTo(event, section) {
    console.log("Scroll Down triggered for section: ", section.getAttribute("wb-section"));
    event.preventDefault();
    lenis.scrollTo(section, { duration: 2, easing: easeOutQuad });
  }

  const scrollDownLink = document.querySelector("[ScrollDownLink]");
  console.log("scrollDownLink:", scrollDownLink);

  if (scrollDownLink) {
    const SectionPartner = document.querySelector("[wb-section='Partner']");
    scrollDownLink.addEventListener("click", (event) => scrollTo(event, SectionPartner));
  } else {
    console.error("[ScrollDownLink] not found");
  }

  const FooterLogo = document.querySelector("[Footer_Link='Logo']");
  console.log("Footer_Link='Logo':", FooterLogo);

  if (FooterLogo) {
    const HeroSection = document.querySelector("[wb-section='Hero']");
    FooterLogo.addEventListener("click", (event) => scrollTo(event, HeroSection));
  } else {
    console.error("[FooterLogo] not found");
  }
}
