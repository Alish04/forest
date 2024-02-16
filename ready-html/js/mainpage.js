document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('wheel', function(e) {
            e.preventDefault(); // Prevent vertical scrolling
            container.scrollLeft += e.deltaY + e.deltaX; // Adjust horizontal scrolling based on wheel delta
        });
    }
});