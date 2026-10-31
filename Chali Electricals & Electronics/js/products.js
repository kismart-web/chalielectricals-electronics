document.addEventListener("DOMContentLoaded", () => {

    const tabs = document.querySelectorAll(".product-tab");

    const categories =
        document.querySelectorAll(".product-category");

    const search =
        document.getElementById("productSearch");

    const count =
        document.getElementById("productCount");


    let currentCategory = "electrical";


    /* ==============================
       CATEGORY SWITCHING
    ============================== */

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            currentCategory =
                tab.dataset.category;


            tabs.forEach(item => {

                item.classList.remove("active");

            });


            tab.classList.add("active");


            categories.forEach(category => {

                category.classList.remove("active");

            });


            const selected =
                document.getElementById(
                    currentCategory + "Products"
                );


            if (selected) {

                selected.classList.add("active");

            }


            search.value = "";

            updateCount();

        });

    });


    /* ==============================
       SEARCH
    ============================== */

    search.addEventListener("input", () => {

        const term =
            search.value
                .toLowerCase()
                .trim();


        const activeCategory =
            document.querySelector(
                ".product-category.active"
            );


        if (!activeCategory) return;


        const cards =
            activeCategory.querySelectorAll(
                ".product-card"
            );


        let visible = 0;


        cards.forEach(card => {

            const name =
                card.dataset.name
                    .toLowerCase();


            const text =
                card.innerText
                    .toLowerCase();


            const match =
                name.includes(term) ||
                text.includes(term);


            card.style.display =
                match ? "" : "none";


            if (match) {

                visible++;

            }

        });


        count.textContent =
            `${visible} Products`;

    });


    /* ==============================
       COUNT
    ============================== */

    function updateCount() {

        const activeCategory =
            document.querySelector(
                ".product-category.active"
            );


        if (!activeCategory) return;


        const cards =
            activeCategory.querySelectorAll(
                ".product-card"
            );


        count.textContent =
            `${cards.length} Products`;

    }


    updateCount();

});