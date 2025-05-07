document.addEventListener('DOMContentLoaded', function () {
    const blogSlider = document.getElementById("blog_slider");

    // Hiển thị loading
    const loader = document.createElement("div");
    loader.classList.add("blog_loader");
    blogSlider.appendChild(loader);

    // Danh sách tiêu đề blog
    const blogTitles = [
        "TÌM HIỂU VỀ B2B MARKETING",
        "CÁC XU HƯỚNG MARKETING TRONG NĂM 2023 (PHẦN 2)",
        "NGHỀ KOLs VÀ NHỮNG GÓC KHUẤT CHƯA AI BIẾT",
        "CÁC BÍ QUYẾT ĐỂ XÂY DỰNG KỊCH BẢN SEEDING HOÀN HẢO",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025",
        "CÁCH THUẬT TOÁN TIKTOK XẾP HẠNG NỘI DUNG 2025"
    ];

    // Tạo danh sách blogPosts
    const blogPosts = blogTitles.map((title, index) => ({
        imgPath: `blog/${index + 1}/img`,
        title: title,
        link: `blog/${index + 1}/blog.html`,
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
                link.target = "_blank";

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
