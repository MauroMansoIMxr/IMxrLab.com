!function(e,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define("global",[],o):"object"==typeof exports?exports.global=o():e.global=o()}(this,(()=>(()=>{"use strict";var e={};function o(e,o){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,o){if(e){if("string"==typeof e)return t(e,o);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?t(e,o):void 0}}(e))||o&&e&&"number"==typeof e.length){n&&(e=n);var r=0,c=function(){};return{s:c,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,l=!0,i=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){i=!0,a=e},f:function(){try{l||null==n.return||n.return()}finally{if(i)throw a}}}}function t(e,o){(null==o||o>e.length)&&(o=e.length);for(var t=0,n=Array(o);t<o;t++)n[t]=e[t];return n}return(e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})})(e),document.addEventListener("DOMContentLoaded",(function(){try{var e=function(e){return 1-(1-e)*(1-e)},t=function(){ScrollTrigger.getAll().forEach((function(e){return e.kill()})),gsap.timeline({scrollTrigger:{trigger:".sticky_track",start:"top-=".concat(u.offsetTop," top"),end:"bottom-=".concat(u.endOffset," bottom"),scrub:!0,onUpdate:function(e){return o=e.progress,void console.log("Scroll progress:",o);var o}}}).to(".hero-wrapper",{width:u.heroWrapperEndWidth,height:u.heroWrapperEndHeight},0).to(".scrolldown_link",{opacity:0,duration:.3},0).to(".scrolldown_link",{y:u.scrolldownLinkY},0).to(".herotitle-b_wrapper",{y:u.herotitleBWrapperY},0).to(".herotitle-a",{y:u.herotitleAY},0).to(".herotitle-b",{y:0,duration:.3},.3)},n=function(e){var t=document.querySelectorAll("[explain-expand_wrapper]"),n=document.querySelector("[explain-cards]");"desktop"==e?(t.forEach((function(e){var o=e.querySelector("[explain-card]");o?(o.addEventListener("mouseover",(function(){e.classList.add("expand")})),o.addEventListener("mouseout",(function(){e.classList.remove("expand")}))):console.error("Card not found")})),n?n.onmousemove=function(e){var t,n=o(document.querySelectorAll("[explain-card]"));try{for(n.s();!(t=n.n()).done;){var r=t.value,c=r.getBoundingClientRect(),a=e.clientX-c.left,l=e.clientY-c.top;r.style.setProperty("--mouse-x","".concat(a,"px")),r.style.setProperty("--mouse-y","".concat(l,"px"))}}catch(e){n.e(e)}finally{n.f()}}:console.error("Element with ID 'explaincard' not found")):(t.forEach((function(e){var o=e.querySelector("[explain-card]");o?gsap.to(o,{scrollTrigger:{trigger:o,start:"top+=20px center",end:"bottom-=20px center",toggleClass:{targets:e,className:"expand"}}}):console.error("Card not found")})),n?document.onscroll=function(e){var t,n=o(document.querySelectorAll("[explain-card]"));try{for(n.s();!(t=n.n()).done;){var r=t.value,c=window.innerWidth/2,a=window.innerHeight/2,l=r.getBoundingClientRect(),i=c-l.left,s=a-l.top;r.style.setProperty("--mouse-x","".concat(i,"px")),r.style.setProperty("--mouse-y","".concat(s,"px"))}}catch(e){n.e(e)}finally{n.f()}}:console.error("Element with ID 'explaincard' not found"))},r=function(e){switch(e){case"desktop":u.heroWrapperEndWidth="1296px";break;case"tablet":u.heroWrapperEndWidth="100%",u.herotitleAY="-16rem";break;case"mobile-l":case"mobile-p":u.heroWrapperEndWidth="100%",u.herotitleAY="-13.5rem",u.endOffset=.1*window.innerHeight}},c=function(e){console.log("Close modal triggered"),e.preventDefault(),gsap.to("[Modal_Wrapper]",{rotationX:90,duration:.4,ease:"power1.out"}),gsap.to("[Modal_Container]",{opacity:0,duration:.5,ease:"power1.out",onComplete:function(){gsap.set("[Modal_Container]",{display:"none"})}})},a=function(o,t){console.log("Scroll Down triggered for section: ",t.getAttribute("wb-section")),o.preventDefault(),lenis.scrollTo(t,{duration:2,easing:e})},l=function(e,o){e.addEventListener("click",(function(e){e.preventDefault();var t=Array.from(d).find((function(e){return e.getAttribute("wb-section")===o}));console.log("targetSection:",t),t?a(e,t):console.error("Section with wb-section='".concat(o,"' not found"))}))},i=function(e){var o=document.querySelectorAll("[OpenModalLink='".concat(e,"']")),t=document.querySelector("[ModalCover='".concat(e,"']")),n=document.querySelector("[CloseModalLink='".concat(e,"']")),r=document.querySelector("[BackModalLink='".concat(e,"']"));console.log("".concat(e," Links:"),o),console.log("".concat(e," modalCover:"),t),console.log("".concat(e," closeLink:"),n),console.log("".concat(e," backLink:"),r),o.length>0?o.forEach((function(o,t){o.addEventListener("click",(function(o){return function(e,o,t){console.log("Open modal ".concat(o," triggered")),e.preventDefault();var n=e.currentTarget;console.log("Clicked element:",n),console.log("Clicked id:",t);var r=n.getAttribute("".concat(o.toLowerCase(),"link_name"));console.log("Clicked Item name:",r);var c=document.querySelector("[Modal_Wrapper='".concat(o,"']")).querySelectorAll("[".concat(o,"_CollectionItem]"));console.log("cmsFilterItems:",c),c.forEach((function(e){var o=e.getAttribute("itemname");console.log("Item",e,"Name:",o),e.style.display=o===r?"flex":"none"})),gsap.set("[Modal_Container='".concat(o,"']"),{opacity:0,display:"flex"}),gsap.set("[Modal_Wrapper='".concat(o,"']"),{rotationX:90,transformPerspective:2500,transformOrigin:"center center"}),gsap.to("[Modal_Container='".concat(o,"']"),{opacity:1,duration:.3,ease:"power1.out"}),gsap.to("[Modal_Wrapper='".concat(o,"']"),{duration:.5,rotationX:0,ease:"power1.out"})}(o,e,t)}))})):console.error("[OpenModalLink='".concat(e,"'] not found")),t?t.addEventListener("click",c):console.error("ModalCover='".concat(e,"' not found")),n?n.addEventListener("click",c):console.error("CloseModalLink='".concat(e,"' not found")),r?r.addEventListener("click",c):console.error("BackModal_Link='".concat(e,"' not found"))};console.log("Document is ready, 'script.js' from sandbox Loaded! UPDATE"),gsap.registerPlugin(ScrollTrigger),gsap.set("[Modal_Container]",{display:"none"});var s="",u={offsetTop:-.1*window.innerHeight,endOffset:.2*window.innerHeight,scrolldownLinkY:"-10rem",herotitleBWrapperY:"-10rem",herotitleAY:"-19rem",heroWrapperEndWidth:"1296px",heroWrapperEndHeight:"calc(100vh - 10rem)"};[{media:"(min-width: 992px)",breakpoint:"desktop"},{media:"(max-width: 991px) and (min-width: 768px)",breakpoint:"tablet"},{media:"(max-width: 767px) and (min-width: 480px)",breakpoint:"mobile-l"},{media:"(max-width: 479px) and (min-width: 240px)",breakpoint:"mobile-p"}].forEach((function(e){var o=e.media,c=e.breakpoint,a=window.matchMedia(o);a.addEventListener("change",(function(e){e.matches&&s!==c&&(s=c,function(e){console.log("Breakpoint changed to:",e)}(c),r(c),t(),n(c))})),a.matches&&s!==c&&(s=c,function(e){console.log("Current breakpoint:",e)}(c),r(c),t(),n(c))}));var d=document.querySelectorAll("[wb-section]"),p=document.querySelector("[wb-section='Navbar']"),f=document.querySelector("[wb-section='Partner']"),g=document.querySelector("[wb-section='Hero']"),m=document.querySelector("[wb-section='Expertise_Title']"),y=document.querySelector("[wb-section='Estrutura']"),b=document.querySelector("[wb-section='Solucoes']");console.log("wb-sections:",d),console.log("wb-section='Navbar'",p),console.log("wb-section='Partner':",f),console.log("wb-section='Hero':",g),console.log("wb-section='Expertise_Title'",m),console.log("wb-section='Estrutura:",y),console.log("wb-section='Solucoes':",b);var v=document.querySelector("[wb-background='nav_BG']");console.log("navBG:",v),v&&g?(gsap.set(v,{opacity:0}),ScrollTrigger.create({trigger:g,start:"bottom bottom",end:"bottom top",scrub:!0,onUpdate:function(e){var o=e.progress;gsap.to(v,{duration:1,opacity:o})},onLeave:function(){}})):console.error("wb-section=Hero or wb-background='nav_BG' not found");var h=document.querySelectorAll("[wb-nav-link]"),w=document.querySelectorAll("[wb-textfx-menu]");w.length>0?w.forEach((function(e){var o=e.getAttribute("wb-textfx-menu");l(e,o)})):console.error("wb-textfx-menu: not found"),h.length>0?h.forEach((function(e){var o=e.getAttribute("wb-nav-link");l(e,o)})):console.error("wb-nav-link: not found");var k=document.querySelectorAll("[FooterLink]");k.length>0?k.forEach((function(e){var o=e.getAttribute("FooterLink");l(e,o)})):console.error("wb-textfx-menu: not found");var x="https://wa.me/message/ED5PWGKO3JGEB1",S=document.querySelectorAll("[contatoLink]");console.log("contatoLink:",S),S?S.forEach((function(e){e.addEventListener("click",(function(e){x&&(e.preventDefault(),window.open(x,"_blank"))}))})):console.error("[contatoLink] not found");var L=document.querySelector("[ScrollDownLink]");console.log("scrollDownLink:",L),L?L.addEventListener("click",(function(e){return a(e,f)})):console.error("[ScrollDownLink] not found");var E=document.querySelector("[Footer_Link='Logo']");console.log("Footer_Link='Logo':",L),E&&g?E.addEventListener("click",(function(e){return a(e,g)})):console.error("[FooterLogo] not found"),i("Expertise"),i("Solucoes"),i("Structure");var A=document.querySelector("[cards]");A?A.onmousemove=function(e){var t,n=o(document.querySelectorAll("[card]"));try{for(n.s();!(t=n.n()).done;){var r=t.value,c=r.getBoundingClientRect(),a=e.clientX-c.left,l=e.clientY-c.top;r.style.setProperty("--mouse-x","".concat(a,"px")),r.style.setProperty("--mouse-y","".concat(l,"px"))}}catch(e){n.e(e)}finally{n.f()}}:console.error("Element with ID 'card' not found")}catch(e){console.error("An error occurred:",e)}})),e})()));