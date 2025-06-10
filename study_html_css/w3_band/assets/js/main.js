const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/* Begin handle menu */
const header = $('#header');
const mobileMenu = $('#mobile-menu');
const menuItems = $$("#nav li a[href*='#']");
const headerHeight = header.clientHeight;

mobileMenu.onclick = function () {
    const isClosed = header.clientHeight === headerHeight;

    if (isClosed) {
        header.style.height = 'auto';
    } else {
        header.style.height = null;
    }
};

for (const menuItem of menuItems) {
    menuItem.onclick = function (e) {
        const isParentsMenu =
            this.nextElementSibling?.classList.contains('subnav');
        if (isParentsMenu) {
            e.preventDefault();
        } else {
            header.style.height = null;
        }
    };
}

/* End handle menu */

/* Begin handle modal */
const modal = $('.js-modal');
const buyBtns = $$('.js-buy-ticket');
const modalClose = $('.js-modal-close');
const modalContainer = $('.js-modal-container');

function showBuyTicket() {
    modal.classList.add('open');
}

function hideBuyTicket() {
    modal.classList.remove('open');
}

for (const buyBtn of buyBtns) {
    buyBtn.addEventListener('click', showBuyTicket);
}

modalClose.addEventListener('click', hideBuyTicket);

modal.addEventListener('click', hideBuyTicket);
modalContainer.addEventListener('click', function (e) {
    e.stopPropagation();
});

/* End handle modal */
