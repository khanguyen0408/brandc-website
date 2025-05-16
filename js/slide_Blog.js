document.addEventListener('DOMContentLoaded', function () {
    const blogSlider = document.getElementById("blog_slider");

    // Hiển thị loading
    const loader = document.createElement("div");
    loader.classList.add("blog_loader");
    blogSlider.appendChild(loader);

    // Danh sách tiêu đề blog
    const blogTitlesV = [
        "TÌM HIỂU VỀ B2B MARKETING",
        "CÁC XU HƯỚNG MARKETING TRONG NĂM 2023 (PHẦN 2)",
        "NGHỀ KOLs VÀ NHỮNG GÓC KHUẤT CHƯA AI BIẾT",
        "CÁC BÍ QUYẾT ĐỂ XÂY DỰNG KỊCH BẢN SEEDING HOÀN HẢO",
        "5 BÍ KÍP LỰA CHỌN KOLS HIỆU QUẢ CHO CHIẾN DỊCH",
        "CÁC NHÃN NỔI TIẾNG KHI ĐƯỢC NHÂN HÓA SẼ RA SAO?",
        "NHỮNG XU HƯỚNG MARKETING KHÔNG THỂ BỎ QUA TRONG NĂM 2023",
        "MỘT QUY TRÌNH SEEDING THƯỜNG DIỄN RA NHƯ THẾ NÀO?",
        "PHIM BARBIE (LIVE ACTION) NỔI TIẾNG TOÀN CẦU DÙ CHƯA CÔNG CHIẾU NHỜ VÀO CHIẾN DỊCH NÀY",
        "CHIẾN DỊCH CÁ THÁNG TƯ NGƯỢC : KHI TRÒ ĐÙA TRỞ THÀNH SỰ THẬT!",
        "VÌ SAO NÊN CHỌN DỊCH VỤ TẠI BRANDC?",
        "NHỮNG NGUYÊN TẮC VÀNG KHI THỰC HIỆN CHIẾN DỊCH BOOKING KOLS",
        "DỊCH VỤ BOOKING KOLS/INFLUENCERS Ở BRANDC LÀ GÌ?",
        "LỢI ICH CỦA SEEDING TRONG CÁC CHIẾN DỊCH MARKETING",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025"
    ];

    const blogTitlesE = [
        "UNDERSTANDING B2B MARKETING",
        "MARKETING TRENDS IN 2023 (PART 2)",
        "THE HIDDEN SIDES OF THE KOL PROFESSION THAT FEW KNOW ABOUT",
        "SECRETS TO CREATING A PERFECT SEEDING SCRIPT",
        "5 TIPS FOR EFFECTIVELY CHOOSING KOLS FOR YOUR CAMPAIGN",
        "WHAT IF FAMOUS BRANDS WERE PERSONIFIED?",
        "MARKETING TRENDS YOU CAN'T MISS IN 2023",
        "WHAT DOES A TYPICAL SEEDING PROCESS LOOK LIKE?",
        "THE BARBIE (LIVE ACTION) FILM BECAME GLOBALLY FAMOUS EVEN BEFORE ITS RELEASE THANKS TO THIS CAMPAIGN",
        "THE APRIL FOOLS’ REVERSE CAMPAIGN: WHEN A JOKE BECAME REALITY!",
        "WHY SHOULD YOU CHOOSE BRANDC’S SERVICES?",
        "GOLDEN PRINCIPLES FOR RUNNING AN EFFECTIVE KOLS BOOKING CAMPAIGN",
        "WHAT IS THE KOLS/INFLUENCERS BOOKING SERVICE AT BRANDC?",
        "BENEFITS OF SEEDING IN MARKETING CAMPAIGNS",
        "HOW TIKTOK'S ALGORITHM RANKS CONTENT IN 2025"
    ];
    

    // Kiểm tra ngôn ngữ từ thẻ lang-flag
    const langFlag = document.querySelector('.lang-flag');
    const isEnglish = langFlag && langFlag.getAttribute('href').includes('index-en.html');

    // Chọn tiêu đề và liên kết phù hợp với ngôn ngữ
    const selectedTitles = isEnglish ? blogTitlesV : blogTitlesE;

    const blogPosts = selectedTitles.map((title, index) => ({
        imgPath: `blog/${index + 1}/img`,
        title: title,
        link: isEnglish ? `blog/${index + 1}/blog.html` : `blog/${index + 1}/blog-en.html`,
        index: index + 1
    }));
    

    // Xóa loading
    blogSlider.removeChild(loader);

    // Tạo slider
    createSlider(blogPosts);

    // Hàm tạo slider
    function createSlider(posts) {
        let blogCurrentIndex = 0;
        const blogImagesPerSlide = 2;
        const blogTotalSlides = Math.ceil(posts.length / blogImagesPerSlide);

        // Tạo các slide
        for (let i = 0; i < blogTotalSlides; i++) {
            const slide = document.createElement("div");
            slide.classList.add("blog_slide");

            for (let j = i * blogImagesPerSlide; j < (i + 1) * blogImagesPerSlide && j < posts.length; j++) {
                const post = posts[j];

                const container = document.createElement("div");
                container.classList.add("blog_image_container");

                const link = document.createElement("a");
                link.href = post.link;
                link.classList.add("blog_image_link");

                const img = document.createElement("img");
                img.src = post.imgPath + ".png";

                img.onerror = function () {
                    if (this.src.endsWith('.png')) {
                        this.src = this.src.replace('.png', '.jpg');
                    }
                    this.onerror = function () {
                        this.src = 'img/placeholder.jpg';
                    };
                };

                const title = document.createElement("div");
                title.classList.add("blog_image_title");
                title.textContent = post.title;

                link.appendChild(img);
                link.appendChild(title);
                container.appendChild(link);
                slide.appendChild(container);
            }

            blogSlider.appendChild(slide);
        }

        // Chỉ báo slide
        const indicatorsContainer = document.createElement("div");
        indicatorsContainer.classList.add("blog_indicators");

        for (let i = 0; i < blogTotalSlides; i++) {
            const indicator = document.createElement("div");
            indicator.classList.add("blog_indicator");
            if (i === 0) indicator.classList.add("active");

            indicator.addEventListener("click", function () {
                blogCurrentIndex = i;
                updateSlidePosition();
                updateIndicators();
            });

            indicatorsContainer.appendChild(indicator);
        }

        document.querySelector(".blog_slider-container").appendChild(indicatorsContainer);

        function updateSlidePosition() {
            blogSlider.style.transform = `translateX(-${blogCurrentIndex * 100}%)`;
        }

        function updateIndicators() {
            const indicators = document.querySelectorAll('.blog_indicator');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === blogCurrentIndex);
            });
        }

        window.moveBlogSlide = function (direction) {
            blogCurrentIndex += direction;
            if (blogCurrentIndex >= blogTotalSlides) blogCurrentIndex = 0;
            if (blogCurrentIndex < 0) blogCurrentIndex = blogTotalSlides - 1;
            updateSlidePosition();
            updateIndicators();
        };

        let autoSlideInterval = setInterval(() => moveBlogSlide(1), 4000);

        const sliderContainer = document.querySelector('.blog_slider-container');
        sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        sliderContainer.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => moveBlogSlide(1), 5000);
        });
    }
});
