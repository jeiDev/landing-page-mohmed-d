function header() {
    setTimeout(() => {
        const selectHeader = document.getElementById('header');
        if (selectHeader) {
            document.addEventListener('scroll', () => {
                window.scrollY > 100 ? selectHeader.classList.add('sticked') : selectHeader.classList.remove('sticked');
            });
        }

        /**
      * Mobile nav toggle
      */
        const mobileNavShow = document.querySelector('.mobile-nav-show');
        const mobileNavHide = document.querySelector('.mobile-nav-hide');

        const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

        navDropdowns.forEach(el => {
            el.addEventListener('click', function(event) {
            if (document.querySelector('.mobile-nav-active')) {
                event.preventDefault();
                this.classList.toggle('active');
                this.nextElementSibling.classList.toggle('dropdown-active');

                let dropDownIndicator = this.querySelector('.dropdown-indicator');
                dropDownIndicator.classList.toggle('bi-chevron-up');
                dropDownIndicator.classList.toggle('bi-chevron-down');
            }
            })
        });

        document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
            el.addEventListener('click', function (event) {
                event.preventDefault();
                mobileNavToogle();
            })
        });

        function mobileNavToogle() {
            document.querySelector('body').classList.toggle('mobile-nav-active');
            mobileNavShow.classList.toggle('d-none');
            mobileNavHide.classList.toggle('d-none');
        }

    }, 100)
}