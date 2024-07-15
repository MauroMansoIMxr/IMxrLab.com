import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function easeOutQuad(x) {
  return 1 - (1 - x) * (1 - x);
}

export function initAnimations() {
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
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    gsap.timeline({
      scrollTrigger: {
        trigger: ".sticky_track",
        start: `top-=${variables.offsetTop} top`,
        end: `bottom-=${variables.endOffset} bottom`,
        scrub: true,
        onUpdate: (self) => console.log("Scroll progress:", self.progress),
      },
    })
      .to(".hero-wrapper", { width: variables.heroWrapperEndWidth, height: variables.heroWrapperEndHeight }, 0)
      .to(".scrolldown_link", { opacity: 0, duration: 0.3 }, 0)
      .to(".scrolldown_link", { y: variables.scrolldownLinkY }, 0)
      .to(".herotitle-b_wrapper", { y: variables.herotitleBWrapperY }, 0)
      .to(".herotitle-a", { y: variables.herotitleAY }, 0)
      .to(".herotitle-b", { y: 0, duration: 0.3 }, 0.3);
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
      { media: "(min-width: 1296px)", breakpoint: "desktop" },
      { media: "(max-width: 1295px) and (min-width: 768px)", breakpoint: "tablet" },
      { media: "(max-width: 767px) and (min-width: 480px)", breakpoint: "mobile-l" },
      { media: "(max-width: 479px) and (min-width: 240px)", breakpoint: "mobile-p" },
    ];

    let currentBreakpoint = "";

    mediaQueryList.forEach(({ media, breakpoint }) => {
      const mql = window.matchMedia(media);
      mql.addEventListener("change", (e) => {
        if (e.matches) {
          if (currentBreakpoint !== breakpoint) {
            currentBreakpoint = breakpoint;
            console.log("Breakpoint changed to:", breakpoint);
            updateVariables(breakpoint);
            createAnimations();
          }
        }
      });
      if (mql.matches && currentBreakpoint !== breakpoint) {
        currentBreakpoint = breakpoint;
        console.log("Current breakpoint:", breakpoint);
        updateVariables(breakpoint);
        createAnimations();
      }
    });
  }

  setupResponsiveAnimations();
}
