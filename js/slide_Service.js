
let serviceSlideIndex = 0;
let serviceSlideTimer;

// chuyển slide
function moveServiceSlide(n) {
    clearInterval(serviceSlideTimer); // Dừng timer khi người dùng tương tác
    showServiceSlides(serviceSlideIndex += n);
    startServiceSlideTimer(); // Khởi động lại timer
}

// thiết lập slide hiện tại
function setCurrentServiceSlide(n) {
    clearInterval(serviceSlideTimer); // Dừng timer khi người dùng tương tác
    showServiceSlides(serviceSlideIndex = n);
    startServiceSlideTimer(); // Khởi động lại timer
}

// hiển thị slides
function showServiceSlides(n) {
    const slides = document.getElementById("serviceSlides");
    const dots = document.getElementsByClassName("service-dot");
    
    // Xử lý khi vượt quá số lượng slide
    if (n >= dots.length) {serviceSlideIndex = 0}
    if (n < 0) {serviceSlideIndex = dots.length-1}
    
    // Di chuyển slides
    slides.style.transform = `translateX(-${serviceSlideIndex * 50}%)`;
    
    // Cập nhật trạng thái active của dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[serviceSlideIndex].className += " active";
}

function startServiceSlideTimer() {
    clearInterval(serviceSlideTimer);
    serviceSlideTimer = setInterval(() => {
        serviceSlideIndex++;
        showServiceSlides(serviceSlideIndex);
    }, 3000);
}

// Khởi tạo slider
document.addEventListener("DOMContentLoaded", function() {
    showServiceSlides(serviceSlideIndex);
    startServiceSlideTimer();
    
    const sliderContainer = document.querySelector('.service-slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(serviceSlideTimer);
        });
        sliderContainer.addEventListener('mouseleave', () => {
            startServiceSlideTimer();
        });
    }
});