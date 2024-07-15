import gsap from 'gsap';

export function initModals() {
  gsap.set("[Modal_Container]", { display: "none" });

  function openModal(event, modalType, id) {
    console.log(`Open modal ${modalType} triggered`);
    event.preventDefault();

    const clickedElement = event.currentTarget;
    console.log("Clicked element:", clickedElement);
    console.log("Clicked id:", id);

    let clickedName = clickedElement.getAttribute(`${modalType.toLowerCase()}link_name`);
    console.log("Clicked Item name:", clickedName);

    const cmsFilter = document.querySelector(`[Modal_Wrapper='${modalType}']`);
    const cmsFilterItems = cmsFilter.querySelectorAll(`[${modalType}_CollectionItem]`);
    console.log("cmsFilterItems:", cmsFilterItems);

    cmsFilterItems.forEach((item) => {
      const name = item.getAttribute("itemname");
      console.log("Item", item, "Name:", name);
      item.style.display = name === clickedName ? "flex" : "none";
    });

    gsap.set(`[Modal_Container='${modalType}']`, { opacity: 0, display: "flex" });
    gsap.set(`[Modal_Wrapper='${modalType}']`, {
      rotationX: 90,
      transformPerspective: 2500,
      transformOrigin: "center center",
    });

    gsap.to(`[Modal_Container='${modalType}']`, { opacity: 1, duration: 0.3, ease: "power1.out" });
    gsap.to(`[Modal_Wrapper='${modalType}']`, { duration: 0.5, rotationX: 0, ease: "power1.out" });
  }

  function closeModal(event) {
    console.log("Close modal triggered");
    event.preventDefault();

    gsap.to("[Modal_Wrapper]", { rotationX: 90, duration: 0.4, ease: "power1.out" });
    gsap.to("[Modal_Container]", {
      opacity: 0,
      duration: 0.5,
      ease: "power1.out",
      onComplete: () => gsap.set("[Modal_Container]", { display: "none" }),
    });
  }

  function addEventListeners(modalType) {
    const modalLinks = document.querySelectorAll(`[OpenModalLink='${modalType}']`);
    const modalCover = document.querySelector(`[ModalCover='${modalType}']`);
    const closeLink = document.querySelector(`[CloseModalLink='${modalType}']`);
    const backLink = document.querySelector(`[BackModalLink='${modalType}']`);

    console.log(`${modalType} Links:`, modalLinks);
    console.log(`${modalType} modalCover:`, modalCover);
    console.log(`${modalType} closeLink:`, closeLink);
    console.log(`${modalType} backLink:`, backLink);

    if (modalLinks.length > 0) {
      modalLinks.forEach((link, index) => {
        link.addEventListener("click", (event) => openModal(event, modalType, index));
      });
    } else {
      console.error(`[OpenModalLink='${modalType}'] not found`);
    }

    if (modalCover) {
      modalCover.addEventListener("click", closeModal);
    } else {
      console.error(`ModalCover='${modalType}' not found`);
    }

    if (closeLink) {
      closeLink.addEventListener("click", closeModal);
    } else {
      console.error(`CloseModalLink='${modalType}' not found`);
    }

    if (backLink) {
      backLink.addEventListener("click", closeModal);
    } else {
      console.error(`BackModalLink='${modalType}' not found`);
    }
  }

  addEventListeners("Expertise");
  addEventListeners("Solucoes");
  addEventListeners("Structure");
}
