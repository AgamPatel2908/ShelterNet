document.addEventListener("DOMContentLoaded", function() {
    const hero = document.querySelector(".hero");
    hero.style.opacity = 0;
    hero.style.transform = "translateY(100px)";
  
    const slideIn = function() {
      let opacity = 0;
      let translateY = 100;
      const timer = setInterval(function() {
        if (opacity >= 1) {
          clearInterval(timer);
        }
        hero.style.opacity = opacity;
        hero.style.transform = `translateY(-${translateY}px)`;
        opacity += 0.05;
        translateY -= 5;
      }, 30);
    };
  
    slideIn();
  });