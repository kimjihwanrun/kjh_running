
// 이미지 클릭 시 모달 표시
const images = document.querySelectorAll('.clickable-img');
images.forEach(img => {
    img.addEventListener('click', function () {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImg");
        modal.style.display = "block";
        modalImg.src = this.src; // 클릭한 이미지 src를 modal에 삽입
    });
});

// 모달 닫기
document.getElementById("closeModal").addEventListener('click', function () {
    document.getElementById("imageModal").style.display = "none";
});

// Footer가 페이지 맨 아래로 스크롤 시에 보이도록 설정
window.addEventListener("scroll", function () {
    const footer = document.querySelector(".footer");
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        footer.classList.add("visible");
    } else {
        footer.classList.remove("visible");
    }
});
// 더보기 텍스트 클릭 시 사진을 더 보여주는 기능
document.querySelector(".load-more-link").addEventListener("click", function (e) {
    e.preventDefault();  // 링크 클릭 시 페이지 이동 방지
    const hiddenItems = document.querySelectorAll(".gallery-item.more");
    hiddenItems.forEach(item => item.classList.remove("hidden"));
    this.style.display = "none";  // '더보기' 텍스트 숨기기
});
// 스크롤 애니메이션
document.addEventListener("DOMContentLoaded", () => {
    const scrollElements = document.querySelectorAll(".scroll-fade");

    const elementInView = (el, offset = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
    };

    const displayScrollElement = (element) => {
        element.classList.add("visible");
    };

    const hideScrollElement = (element) => {
        element.classList.remove("visible");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 150)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", () => {
        handleScrollAnimation();
    });

    // 초기 상태 업데이트
    handleScrollAnimation();
});
