/* ==================================================
   CHALI ELECTRICALS & ELECTRONICS
   MAIN JAVASCRIPT
================================================== */


/* ==================================================
   MOBILE NAVIGATION
================================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");


if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("mobile-open");

        const isOpen =
            navLinks.classList.contains("mobile-open");


        if (isOpen) {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';

            menuToggle.setAttribute(
                "aria-label",
                "Close navigation menu"
            );

        } else {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    });


    /* --------------------------------
       CLOSE MENU AFTER CLICKING A LINK
    --------------------------------- */

    const navItems =
        navLinks.querySelectorAll(
            "a:not(.dropdown > a)"
        );


    navItems.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove(
                "mobile-open"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

}


/* ==================================================
   MOBILE DROPDOWNS
================================================== */

const dropdowns =
    document.querySelectorAll(".dropdown");


dropdowns.forEach(function (dropdown) {

    const dropdownLink =
        dropdown.querySelector(":scope > a");


    if (!dropdownLink) return;


    dropdownLink.addEventListener(
        "click",
        function (event) {

            if (window.innerWidth <= 850) {

                event.preventDefault();

                dropdown.classList.toggle("open");

            }

        }
    );

});


/* ==================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
================================================== */

document.addEventListener("click", function (event) {

    if (!menuToggle || !navLinks) return;


    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedToggle =
        menuToggle.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedToggle &&
        navLinks.classList.contains("mobile-open")
    ) {

        navLinks.classList.remove(
            "mobile-open"
        );

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }

});


/* ==================================================
   RESET MOBILE NAVIGATION WHEN RETURNING TO DESKTOP
================================================== */

window.addEventListener("resize", function () {

    if (window.innerWidth > 850) {

        navLinks?.classList.remove(
            "mobile-open"
        );

        dropdowns.forEach(function (dropdown) {

            dropdown.classList.remove("open");

        });


        if (menuToggle) {

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        }

    }

});


/* ==================================================
   WEBSITE LOADED
================================================== */

console.log(
    "Chali Electricals & Electronics website loaded successfully."
);

/* ==================================================
   FEATURED PRODUCT FILTER
================================================== */

const filterButtons =
    document.querySelectorAll(".filter-btn");

const productCards =
    document.querySelectorAll(".featured-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const filter =
            button.getAttribute("data-filter");


        /* Active button */

        filterButtons.forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");


        /* Filter products */

        productCards.forEach(card => {

            const category =
                card.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});
/* ==================================================
   PREMIUM LOADER
================================================== */
window.addEventListener("load", function(){
    const loader=document.getElementById("siteLoader");
    if(loader){
        setTimeout(()=>loader.classList.add("hide"),250);
    }
});


/* ==================================================
   PREMIUM GALLERY LIGHTBOX
================================================== */

const galleryTriggers =
    document.querySelectorAll(".lightbox-trigger");

const imageLightbox =
    document.getElementById("imageLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const lightboxClose =
    document.querySelector(".lightbox-close");

const lightboxPrev =
    document.querySelector(".lightbox-prev");

const lightboxNext =
    document.querySelector(".lightbox-next");

let currentGalleryIndex = 0;

const galleryItems = Array.from(galleryTriggers);


function showGalleryImage(index){

    if(!galleryItems.length || !imageLightbox) return;

    currentGalleryIndex =
        (index + galleryItems.length) %
        galleryItems.length;

    const item =
        galleryItems[currentGalleryIndex];

    const image =
        item.querySelector("img");

    if(!image) return;

    lightboxImage.src =
        image.getAttribute("src");

    lightboxImage.alt =
        image.getAttribute("alt") || "";

    lightboxCaption.textContent =
        item.dataset.caption ||
        image.getAttribute("alt") ||
        "";

    imageLightbox.classList.add("open");

    imageLightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "lightbox-open"
    );
}


function closeGallery(){

    if(!imageLightbox) return;

    imageLightbox.classList.remove("open");

    imageLightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "lightbox-open"
    );

    setTimeout(() => {

        if(!imageLightbox.classList.contains("open")){

            lightboxImage.src = "";

        }

    }, 250);
}


galleryTriggers.forEach((item,index) => {

    item.addEventListener("click", function(event){

        event.preventDefault();

        showGalleryImage(index);

    });

});


lightboxClose?.addEventListener(
    "click",
    closeGallery
);


lightboxPrev?.addEventListener(
    "click",
    function(){
        showGalleryImage(currentGalleryIndex - 1);
    }
);


lightboxNext?.addEventListener(
    "click",
    function(){
        showGalleryImage(currentGalleryIndex + 1);
    }
);


imageLightbox?.addEventListener(
    "click",
    function(event){

        if(event.target === imageLightbox){

            closeGallery();

        }

    }
);


document.addEventListener(
    "keydown",
    function(event){

        if(!imageLightbox?.classList.contains("open")) return;

        if(event.key === "Escape"){

            closeGallery();

        }

        if(event.key === "ArrowLeft"){

            showGalleryImage(
                currentGalleryIndex - 1
            );

        }

        if(event.key === "ArrowRight"){

            showGalleryImage(
                currentGalleryIndex + 1
            );

        }

    }
);


/* ==================================================
   FINAL DEPLOYMENT POLISH
   - active navigation state and underline
   - animated back-to-top control
   - accessible hero typing effect
   - subtle scroll reveal
================================================== */
document.addEventListener("DOMContentLoaded", () => {
    const normalizePath = (value) => {
        try {
            const url = new URL(value, window.location.href);
            let path = decodeURIComponent(url.pathname).replace(/\\+/g, "/");
            path = path.replace(/\/$/, "");
            if (!path || path.endsWith("/index.html")) path = path.replace(/index\.html$/, "");
            return path.toLowerCase();
        } catch (_) { return ""; }
    };

    const currentPath = normalizePath(window.location.href);
    document.querySelectorAll(".nav-links a[href]").forEach((link) => {
        const raw = link.getAttribute("href");
        if (!raw || raw.startsWith("#") || /^https?:/i.test(raw)) return;
        const linkPath = normalizePath(raw);
        const samePage = linkPath === currentPath || (currentPath.endsWith("/") && linkPath === currentPath + "index.html");
        const isProductSubpage = /\/(electrical|electronics)\.html$/.test(currentPath) && /\/products\.html$/.test(linkPath);
        if (samePage || isProductSubpage) {
            link.classList.add("active");
            if (samePage) link.setAttribute("aria-current", "page");
        }
    });

    // Make the back-to-top control appear only after the visitor scrolls.
    const backToTop = document.querySelector(".back-to-top");
    const updateBackToTop = () => {
        if (backToTop) backToTop.classList.toggle("is-visible", window.scrollY > 320);
    };
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    if (backToTop) {
        backToTop.addEventListener("click", (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        });
    }

    // Continuously type and erase the homepage hero heading.
    // This animation intentionally runs even if the device prefers reduced motion,
    // because the typing effect is a specifically requested homepage feature.
    const typingLines = Array.from(document.querySelectorAll(".hero-typing-heading [data-typing]"));
    if (typingLines.length) {
        const phrases = typingLines.map((line) => line.dataset.typing || "");
        let lineIndex = 0;
        let charIndex = 0;
        let deleting = false;
        typingLines.forEach((line) => { line.textContent = ""; });

        const tickTyping = () => {
            const line = typingLines[lineIndex];
            const phrase = phrases[lineIndex];
            if (!line || !phrase) return;

            if (!deleting) {
                charIndex++;
                line.textContent = phrase.slice(0, charIndex);
                if (charIndex >= phrase.length) {
                    if (lineIndex < typingLines.length - 1) {
                        lineIndex++;
                        charIndex = 0;
                        window.setTimeout(tickTyping, 220);
                    } else {
                        deleting = true;
                        window.setTimeout(tickTyping, 1300);
                    }
                    return;
                }
                window.setTimeout(tickTyping, 75);
            } else {
                if (charIndex > 0) {
                    charIndex--;
                    line.textContent = phrase.slice(0, charIndex);
                    window.setTimeout(tickTyping, 38);
                } else if (lineIndex > 0) {
                    lineIndex--;
                    charIndex = phrases[lineIndex].length;
                    window.setTimeout(tickTyping, 90);
                } else {
                    deleting = false;
                    charIndex = 0;
                    window.setTimeout(tickTyping, 400);
                }
            }
        };

        window.setTimeout(tickTyping, 450);
    }

    // Gentle reveal on content blocks; content remains visible if observer is unsupported.
    const revealTargets = document.querySelectorAll(".product-card, .service-card, .feature-card, .gallery-item, .about-card, .contact-item");
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); obs.unobserve(entry.target); }
            });
        }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
        revealTargets.forEach((target, index) => {
            target.classList.add("js-reveal");
            target.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
            observer.observe(target);
        });
    }
});
