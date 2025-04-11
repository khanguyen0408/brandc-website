
const images = [];
        
// Thêm hình ảnh PNG
for (let i = 1; i <= 50; i++) {
    images.push(`img/client_img/${i}.png`);
}
// Thêm hình ảnh JPG
for (let i = 1; i <= 50; i++) {
    images.push(`img/client_img/${i}.jpg`);
}

const slider = document.getElementById("slider");
let currentIndex = 0;
const imagesPerSlide = 15;
const totalSlides = Math.ceil(images.length / imagesPerSlide);

// Tạo các slide
for (let i = 0; i < totalSlides; i++) {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    
    for (let j = i * imagesPerSlide; j < (i + 1) * imagesPerSlide && j < images.length; j++) {
        const img = document.createElement("img");
        img.src = images[j];
        img.onerror = function() {
            // hình ảnh không tải được => thử thay đổi phần mở rộng
            if (this.src.endsWith('.png')) {
                this.src = this.src.replace('.png', '.jpg');
            } else if (this.src.endsWith('.jpg')) {
                this.src = this.src.replace('.jpg', '.png');
            }
            // không tải được => ẩn hình ảnh
            this.onerror = function() {
                this.style.display = 'none';
            };
        };
        slide.appendChild(img);
    }
    slider.appendChild(slide);
}

function moveSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= totalSlides) currentIndex = 0;
    if (currentIndex < 0) currentIndex = totalSlides - 1;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(() => moveSlide(1), 6000);