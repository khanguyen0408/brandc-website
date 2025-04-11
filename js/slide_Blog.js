document.addEventListener('DOMContentLoaded', function() {
    const blogSlider = document.getElementById("blog_slider");
    
    // Hiển thị loading
    const loader = document.createElement("div");
    loader.classList.add("blog_loader");
    blogSlider.appendChild(loader);
    
    // Mảng chứa thông tin blog
    const blogPosts = [];
    let loadedCount = 0;
    const totalImages = 14;
    
    // Tải dữ liệu từ tất cả các file text.txt
    for (let i = 1; i <= totalImages; i++) {
        fetchTextFile(i);
    }
    
    // Hàm đọc file text.txt
    function fetchTextFile(index) {
        const textFilePath = `img/blog/${index}/text.txt`;
        var fileReader = new FileReader();
        
        fetch(textFilePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Không thể tải file text.txt');
                }
                return response.text();
            })
            .then(text => {
                // Xử lý nội dung file text.txt
                const lines = text.trim().split('\n');
                let title = lines[0] || `Bài viết Marketing ${index}`;
                let link = lines[1] || 'https://brandc.vn/';
                
                // Loại bỏ khoảng trắng thừa và kiểm tra URL
                link = link.trim();
                if (!link.startsWith('http')) {
                    link = 'https://brandc.vn/';
                }
                
                // Thêm thông tin vào mảng blog posts
                blogPosts.push({
                    imgPath: `img/blog/${index}/img`,
                    title: title,
                    link: link,
                    index: index
                });
            })
            .catch(error => {
                console.error(`Lỗi khi tải file text.txt cho ảnh ${index}:`, error);
                
                // Sử dụng dữ liệu mặc định khi không tải được file
                blogPosts.push({
                    imgPath: `img/blog/${index}/img`,
                    title: `Bài viết Marketing ${index}`,
                    link: 'https://brandc.vn/',
                    index: index
                });
            })
            .finally(() => {
                loadedCount++;
                
                // Khi đã tải tất cả các file text.txt, tạo slider
                if (loadedCount === totalImages) {
                    // Xóa loading
                    blogSlider.removeChild(loader);
                    
                    // Sắp xếp các bài viết theo index
                    blogPosts.sort((a, b) => a.index - b.index);
                    
                    // Tạo slider
                    createSlider(blogPosts);
                }
            });
    }
    
    // Hàm tạo slider sau khi đã tải tất cả dữ liệu
    function createSlider(posts) {
        let blogCurrentIndex = 0;
        const blogImagesPerSlide = 2; // 4 hình trong 1 slide
        const blogTotalSlides = Math.ceil(posts.length / blogImagesPerSlide);
        
        // Tạo các slide
        for (let i = 0; i < blogTotalSlides; i++) {
            const slide = document.createElement("div");
            slide.classList.add("blog_slide");
            
            for (let j = i * blogImagesPerSlide; j < (i + 1) * blogImagesPerSlide && j < posts.length; j++) {
                const post = posts[j];
                
                // Tạo container cho mỗi hình ảnh và tiêu đề
                const container = document.createElement("div");
                container.classList.add("blog_image_container");
                
                // Tạo liên kết bao bọc hình ảnh và tiêu đề
                const link = document.createElement("a");
                link.href = post.link;
                link.classList.add("blog_image_link");
                link.target = "_blank"; // Mở trong tab mới
                
                // Tạo hình ảnh
                const img = document.createElement("img");
                img.src = post.imgPath + ".png";
                
                img.onerror = function() {
                    // Nếu PNG không tải được, thử JPG
                    if (this.src.endsWith('.png')) {
                        this.src = this.src.replace('.png', '.jpg');
                    }
                    // Nếu JPG vẫn không tải được, hiển thị placeholder
                    this.onerror = function() {
                        this.src = 'img/placeholder.jpg';
                    };
                };
                
                // Tạo phần tử chứa tiêu đề
                const title = document.createElement("div");
                title.classList.add("blog_image_title");
                title.textContent = post.title;
                
                // Thêm hình ảnh và tiêu đề vào liên kết
                link.appendChild(img);
                link.appendChild(title);
                
                // Thêm liên kết vào container
                container.appendChild(link);
                
                // Thêm container vào slide
                slide.appendChild(container);
            }
            
            // Thêm slide vào slider
            blogSlider.appendChild(slide);
        }
        
        // Tạo chỉ báo slide
        const indicatorsContainer = document.createElement("div");
        indicatorsContainer.classList.add("blog_indicators");
        
        for (let i = 0; i < blogTotalSlides; i++) {
            const indicator = document.createElement("div");
            indicator.classList.add("blog_indicator");
            if (i === 0) indicator.classList.add("active");
            
            indicator.addEventListener("click", function() {
                blogCurrentIndex = i;
                updateSlidePosition();
                updateIndicators();
            });
            
            indicatorsContainer.appendChild(indicator);
        }
        
        // Thêm chỉ báo vào container slider
        document.querySelector(".blog_slider-container").appendChild(indicatorsContainer);
        
        // Hàm cập nhật vị trí slide
        function updateSlidePosition() {
            blogSlider.style.transform = `translateX(-${blogCurrentIndex * 100}%)`;
        }
        
        // Hàm cập nhật trạng thái chỉ báo
        function updateIndicators() {
            const indicators = document.querySelectorAll('.blog_indicator');
            indicators.forEach((indicator, index) => {
                if (index === blogCurrentIndex) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }
        
        // Thiết lập hàm chuyển slide
        window.moveBlogSlide = function(direction) {
            blogCurrentIndex += direction;
            if (blogCurrentIndex >= blogTotalSlides) blogCurrentIndex = 0;
            if (blogCurrentIndex < 0) blogCurrentIndex = blogTotalSlides - 1;
            
            updateSlidePosition();
            updateIndicators();
        };
        
        // Tự động chuyển slide sau mỗi 4 giây
        let autoSlideInterval = setInterval(() => moveBlogSlide(1), 4000);
        
        // Dừng tự động chuyển slide khi người dùng tương tác
        const sliderContainer = document.querySelector('.blog_slider-container');
        sliderContainer.addEventListener('mouseenter', function() {
            clearInterval(autoSlideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', function() {
            autoSlideInterval = setInterval(() => moveBlogSlide(1), 5000);
        });
    }
});