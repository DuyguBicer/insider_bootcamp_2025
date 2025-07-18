
$(document).ready(function () {

    function showError(selector, message) {
        $(selector).html(`<p style="color: red;">Hata oluştu: ${message}</p>`);
    }

    function createCard(user) {
        return $(`
            <a class="card" data-fancybox="gallery" href="${user.picture.large}" data-caption="${user.name.first} ${user.name.last}, ${user.location.country}">
                <h3>${user.name.first} ${user.name.last}</h3>
                <p>${user.location.city}, ${user.location.country}</p>
                <p>${user.email}</p>
                <p>${user.phone}</p>
                <img src="${user.picture.medium}" alt="Profil Resmi">
            </a>
        `);
    }

    function profileCards() {
        $(".users").click(function () {

            $.ajax({
                url: 'https://randomuser.me/api/?results=30',
                method: 'GET',
                dataType: 'json'
            })
            .done(function (res) {
                $(".kullaniciKartlari").empty();
                
                if ($(".slider").hasClass('slick-initialized')) {
                    $(".slider").slick('unslick');
                }
                $(".slider").empty();

                res.results.forEach((user, index) => { 
                    const card = createCard(user);
                    card.css({
                        display: "none",
                        opacity: 0,
                        marginLeft: "-50px"
                    });
                    $(".kullaniciKartlari").append(card);
                    card.slideDown(500);
                    card.animate({
                        opacity: 1,
                        marginLeft: "0px"
                    }, 800);

                   
                    const sliderCard = $(`
                        <div class="slider-item" data-index="${index}">
                            <img src="${user.picture.thumbnail}" alt="${user.name.first}" style="border-radius:50%; margin-bottom:10px; cursor:pointer;">
                            <p style="text-align:center;">${user.name.first}</p>
                        </div>
                    `);
                    $(".slider").append(sliderCard);
                });

            
                $(".slider").slick({
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    dots: true,
                    arrows: true,
                    responsive: [
                        {
                            breakpoint: 600,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });

                
                $(".slider-item img").on("click", function() {
                    const index = $(this).closest('.slider-item').data('index');
                   
                    Fancybox.show($(".kullaniciKartlari .card").get(), {
                        startIndex: index
                    });
                });

            })
            .fail(function (xhr, status, error) {
                showError('.kullaniciKartlari', error);
            });
        });
    }

    profileCards();

    
    $(".kullaniciKartlari").on("mouseenter", ".card", function () {
        $(this).fadeTo(200, 0.8).addClass("hovered");
    });
    $(".kullaniciKartlari").on("mouseleave", ".card", function () {
        $(this).fadeTo(200, 1).removeClass("hovered");
    });

    
    $(".users").click(function () {
        $(this).addClass("shake bounce");
        setTimeout(() => $(this).removeClass("shake bounce"), 600);
    });

   
    $(".users").click(function () {
        $(".baslik").addClass("goster").fadeIn();
        $(".buttonWrapper").addClass("altKonum");
    });

});