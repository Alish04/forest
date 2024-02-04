jQuery(".block_width").draggable({
    cursor: "move",
    axis: "x",
    stop: function() {
        if(jQuery(this).position().left > 1 || jQuery(this).position().left < -800)
            jQuery(this).css("left", "10px");
    }
});