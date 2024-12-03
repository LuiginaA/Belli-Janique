// let navlist = document.querySelector('.navlist');

// let menu = document.querySelector('menu-icon');
// let navlist = document.querySelector('.navlist');

// menu.onclick = () => {
//     menu.classList.toggle('bx-x');
//     navlist.classList.toggle('open');
// }

//  JS Link


// Clinico Link 

    <script type='text/javascript'>
        window.addEventListener('message', function handleIFrameMessage(e) {
            var clinikoBookings = document.getElementById('cliniko-49363333');
            if (typeof e.data !== 'string') return;
            if (e.data.search('cliniko-bookings-resize') > -1) {
                var height = Number(e.data.split(':')[1]);
                clinikoBookings.style.height = height + 'px';
            }
            e.data.search('cliniko-bookings-page') > -1 && clinikoBookings.scrollIntoView();
        });
    </script>