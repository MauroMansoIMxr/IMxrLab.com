import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initNav() {
  gsap.registerPlugin(ScrollTrigger);

  const sections = document.querySelectorAll("[wb-section]");
  const navBG = document.querySelector("[wb-background='nav_BG']");
  const HeroSection = document.querySelector("[wb-section='Hero']");

  function revealNavBG() {
    gsap.set(navBG, { opacity: 0 });

    ScrollTrigger.create({
      trigger: HeroSection,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(navBG, { duration: 1, opacity: progress });
      },
      onLeave: () => {},
    });
  }

  if (navBG && HeroSection) {
    revealNavBG();
  } else {
    console.error("wb-section=Hero or wb-background='nav_BG' not found");
  }
}
