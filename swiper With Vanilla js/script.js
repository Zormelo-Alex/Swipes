// sellectors
const carrousel  = document.querySelector(".carrousel");
const firstImg  = document.querySelectorAll("img")[0];
const arrows  = document.querySelectorAll(".thing");

let isDragStart = false, isDragging = false, prevPageX, prevScroolLeft, positionDiff;




arrows.forEach(icon =>{
    let firstImgWidth = firstImg.clientWidth + 14;
//getting image width and adding 14 margin value
    icon.addEventListener("click", ()=>{
        if(icon.classList == "left thing"){
            carrousel.scrollLeft -= firstImgWidth;
        }else{
            carrousel.scrollLeft += firstImgWidth; 
        }
        showHiddenIcon();
    })
})

//functions
const dragStart = (e) =>{
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScroolLeft = carrousel.scrollLeft;
}

const dragStop = (e) =>{
    isDragStart = false;
    carrousel.classList.remove("scroll");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

const dragging = (e) =>{
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carrousel.classList.add("scroll");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carrousel.scrollLeft = prevScroolLeft - positionDiff;
    showHiddenIcon();
}

const showHiddenIcon = () =>{
    let scrollWidth = carrousel.scrollWidth - carrousel.clientWidth;
    arrows[0].style.display = carrousel.scrollLeft == 0 ? "none" : "block";
    arrows[1].style.display = carrousel.scrollLeft == scrollWidth ? "none" : "block";
}

//not really neccessary
const autoSlide = () =>{
    if(carrousel.scrollLeft == (carrousel.scrollWidth - carrousel.clientWidth)) return;

    positionDiff = Math.abs(positionDiff);
    let firstImgWidth = firstImg.clientWidth + 14;
    let valDifference = firstImg - positionDiff;
    
    if(carrousel.scrollLeft > prevScroolLeft){
        return carrousel.scrollLeft -= positionDiff > firstImg / 3 ? valDifference : -positionDiff;
    }
    carrousel.scrollLeft += positionDiff > firstImg / 3 ? valDifference : -positionDiff;
}

//event listeners
carrousel.addEventListener("mousedown", dragStart);
carrousel.addEventListener("touchstart", dragStart);

carrousel.addEventListener("mousemove", dragging);
carrousel.addEventListener("touchmove", dragging);

carrousel.addEventListener("mouseup", dragStop);
carrousel.addEventListener("mouseleave", dragStop);
carrousel.addEventListener("touchend", dragStop);