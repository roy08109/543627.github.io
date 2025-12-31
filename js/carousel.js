document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});

function initCarousel() {
    const track = document.querySelector('.venue-track');
    if (!track) return;

    const container = document.querySelector('.venue-carousel');
    const originalItems = Array.from(track.children);
    const itemWidthPercent = 100 / 3; // 3 items visible
    const totalOriginal = originalItems.length;
    
    // Create dots
    const dotsContainer = document.querySelector('.carousel-dots');
    // Calculate how many pages/dots. 
    // If we slide 1 by 1, we have 'totalOriginal' dots? Or pages of 3?
    // "无限循环选择" usually implies selecting individual items or sliding through them.
    // The user said "points to identify below" (下边加点点进行标识).
    // Usually dots correspond to the active item or page.
    // Let's assume 1 dot per item since we slide 1 by 1.
    // Wait, if 11 items, 11 dots is too many.
    // Maybe pages? 11 items, 3 per view. 
    // User said "Max display 3".
    // If I slide 1 by 1, the "active" item is usually the centered one or the first one.
    // Let's use 1 dot per item but maybe style them small, or just implement it and see.
    // Actually, if it's infinite loop of venues, dots usually represent the current "start" venue.
    
    originalItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // Clone items for infinite loop (3 before, 3 after)
    const clonesBefore = originalItems.slice(-3).map(item => item.cloneNode(true));
    const clonesAfter = originalItems.slice(0, 3).map(item => item.cloneNode(true));

    clonesBefore.forEach(clone => {
        clone.classList.add('clone');
        track.insertBefore(clone, track.firstChild);
    });

    clonesAfter.forEach(clone => {
        clone.classList.add('clone');
        track.appendChild(clone);
    });

    const allItems = Array.from(track.children);
    
    // Calculate start index to center the middle item
    const middleItemIndex = Math.floor(totalOriginal / 2);
    // We want the middle item to be the center of the 3 visible items
    // So we start one item before the middle item
    let startRealItem = middleItemIndex - 1;
    if (startRealItem < 0) startRealItem = 0;
    
    let currentIndex = 3 + startRealItem; // Start at the calculated item (after 3 clones)
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let startTime = 0;

    // Initial position
    updatePosition(false);

    // Event Listeners
    track.addEventListener('touchstart', touchStart);
    track.addEventListener('touchend', touchEnd);
    track.addEventListener('touchmove', touchMove);
    
    track.addEventListener('mousedown', touchStart);
    track.addEventListener('mouseup', touchEnd);
    track.addEventListener('mouseleave', () => {
        if(isDragging) touchEnd();
    });
    track.addEventListener('mousemove', touchMove);

    // Prevent context menu on long press
    track.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    function touchStart(event) {
        isDragging = true;
        startTime = new Date().getTime();
        startPos = getPositionX(event);
        animationID = requestAnimationFrame(animation);
        track.style.cursor = 'grabbing';
    }

    // Initialize arrows
    const prevBtn = document.querySelector('.prev-arrow');
    const nextBtn = document.querySelector('.next-arrow');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex -= 1;
            setPositionByIndex();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex += 1;
            setPositionByIndex();
        });
    }

    // Prevent click on drag
    // Use capture phase to intercept clicks on children (buttons)
    track.addEventListener('click', function(e) {
        // If moved significantly, prevent default click action
        // We need to know if it was a drag or click.
        // We can check if isDragging was true recently or check moved distance.
        // Since isDragging is false in touchEnd/click, we need a flag.
    }, true);
    
    // Better way: in touchEnd check distance. If dragged, set a flag 'wasDragging'.
    // Then in click handler check that flag.
    
    let wasDragging = false;
    
    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const moveDiff = currentPosition - startPos;
            currentTranslate = prevTranslate + moveDiff;
            
            // If moved more than small threshold, it's a drag
            if (Math.abs(moveDiff) > 5) {
                wasDragging = true;
            }
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        track.style.cursor = 'grab';

        const movedBy = currentTranslate - prevTranslate;
        
        // Threshold to change slide
        if (movedBy < -50) {
            currentIndex += 1;
        } else if (movedBy > 50) {
            currentIndex -= 1;
        }

        setPositionByIndex();
        
        // Reset wasDragging after a short delay to allow click handler to check it
        setTimeout(() => {
            wasDragging = false;
        }, 100);
    }
    
    // Capture click on track
    track.addEventListener('click', (e) => {
        if (wasDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true); // Capture phase!

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        // Calculate the width of one item
        const containerWidth = container.offsetWidth;
        const itemWidth = containerWidth / 3; // 3 items visible
        
        currentTranslate = currentIndex * -itemWidth;
        prevTranslate = currentTranslate;
        
        track.style.transition = 'transform 0.3s ease-out';
        track.style.transform = `translateX(${currentTranslate}px)`;
        
        updateDots();
        selectMiddleItem();

        // Handle infinite loop transition end
        setTimeout(() => {
            checkIndex();
        }, 300);
    }
    
    function checkIndex() {
        track.style.transition = 'none';
        const totalReal = originalItems.length;
        
        if (currentIndex >= totalReal + 3) {
            currentIndex = 3;
            const containerWidth = container.offsetWidth;
            const itemWidth = containerWidth / 3;
            currentTranslate = currentIndex * -itemWidth;
            prevTranslate = currentTranslate;
            track.style.transform = `translateX(${currentTranslate}px)`;
        } else if (currentIndex < 3) {
            currentIndex = totalReal + 3 - 1; // Last real item
            if (currentIndex < 3) currentIndex = 3; // Safety
             // Actually:
             // index 0,1,2 are clones of 9,10,11 (if 11 items)
             // index 3 is item 1.
             // If we go to index 2 (clone of 11), we should jump to index 11+3-1 = 13 (item 11).
             // Wait, total 11 items.
             // Indices: 
             // 0,1,2 (Clones: 9,10,11)
             // 3..13 (Real: 1..11)
             // 14,15,16 (Clones: 1,2,3)
             
             // If currentIndex == 2 (clone 11), jump to 13 (real 11).
             // If currentIndex == 14 (clone 1), jump to 3 (real 1).
             
             currentIndex = totalReal + currentIndex; 
        }

        if (currentIndex >= totalReal + 3) {
             currentIndex = currentIndex - totalReal;
        } else if (currentIndex < 3) {
             currentIndex = currentIndex + totalReal;
        }
        
        // Re-calculate translate after jump
        const containerWidth = container.offsetWidth;
        const itemWidth = containerWidth / 3;
        currentTranslate = currentIndex * -itemWidth;
        prevTranslate = currentTranslate;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function updatePosition(animate = true) {
        const containerWidth = container.offsetWidth;
        const itemWidth = containerWidth / 3;
        currentTranslate = currentIndex * -itemWidth;
        prevTranslate = currentTranslate;
        if(animate) track.style.transition = 'transform 0.3s ease-out';
        else track.style.transition = 'none';
        track.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function goToSlide(index) {
        // Adjust currentIndex so that the selected item is in the middle
        // Middle item is at index + 3 (Real index + clones)
        // currentIndex (Left item) = Middle item - 1
        currentIndex = (index + 3) - 1; 
        setPositionByIndex();
    }

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        // Map currentIndex to dot index
        // We want the dot to represent the MIDDLE item
        // Middle item index = currentIndex + 1
        // realIndex = (currentIndex + 1) - 3 clones
        
        let realIndex = (currentIndex + 1) - 3;
        const totalReal = originalItems.length;
        
        if (realIndex < 0) realIndex = totalReal + realIndex;
        if (realIndex >= totalReal) realIndex = realIndex - totalReal;
        
        if(dots[realIndex]) dots[realIndex].classList.add('active');
    }

    // Expose update function for resize
    window.addEventListener('resize', () => {
        updatePosition(false);
    });

    // Initial selection
    selectMiddleItem();

    function selectMiddleItem() {
        const middleIndex = currentIndex + 1;
        if (allItems[middleIndex]) {
            const btn = allItems[middleIndex];
            const onclickAttr = btn.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/updatePriceTable\('([^']+)'\)/);
                if (match && match[1]) {
                    if (typeof window.updatePriceTable === 'function') {
                        window.updatePriceTable(match[1]);
                    }
                }
            }
        }
    }
}
