function mouseMove(
    e,
    mouseState,
    dragItem,
    offsetPos,
    elem,
    setElementReference
) {
    if (mouseState) {
        if (dragItem.current) {
            document.body.style.userSelect = 'none';
            dragItem.current.style.position = 'absolute';
            dragItem.current.style.left = `${e.clientX - offsetPos.x}px`;
            dragItem.current.style.top = `${
                e.clientY - offsetPos.y - elem.scrollY
            }px`;
            dragItem.current.style.width = `${elem.w}px`;
            dragItem.current.style.height = `${elem.h}px`;
            dragItem.current.style.opacity = `0.8`;

            let isOverDropableElement = false;
            for (let dropbox of document.getElementsByClassName('dropBox')) {
                let inXboundaries =
                    e.clientX > dropbox.offsetLeft &&
                    e.clientX < dropbox.offsetLeft + dropbox.offsetWidth;

                const rscalendar = document.getElementById(
                    'RS-Calendar-Section'
                );

                // The calendar scrolls independently, so its scroll offset must
                // be included when comparing a drop box with viewport coordinates.
                let inYboundaries =
                    e.clientY >
                        dropbox.offsetTop -
                            window.scrollY -
                            rscalendar.scrollTop &&
                    e.clientY <
                        dropbox.offsetTop +
                            dropbox.offsetHeight -
                            window.scrollY -
                            rscalendar.scrollTop;
                if (inXboundaries && inYboundaries) {
                    isOverDropableElement = true;
                    setTargetStyle(dropbox);
                    setElementReference(dropbox);
                } else {
                    resetTargetStyle(dropbox);
                }
            }
            if (!isOverDropableElement) {
                setElementReference(null);
            }
        }
    }
}
function mouseUp(
    e,
    dragItem,
    setMouseState,
    targetElementName,
    parentElementName
) {
    if (dragItem.current) {
        document.body.style.userSelect = '';
        if (
            targetElementName === '' ||
            targetElementName === parentElementName
        ) {
            resetDragItemStyles(dragItem);
        }
    }
    setMouseState(false);
}
function resetDragItemStyles(dragItem) {
    if (dragItem.current) {
        dragItem.current.style.position = '';
        dragItem.current.style.left = '';
        dragItem.current.style.top = '';
        dragItem.current.style.width = '';
        dragItem.current.style.height = '';
        dragItem.current.style.opacity = '';
    }
}
function mouseLeave(e, setMouseState) {
    setMouseState(false);
}
function setTargetStyle(target) {
    target.style.border = '1px solid #083464';
    target.style.boxShadow = '0 0 4px #083464';
    target.style.backgroundColor = '#08346440';
}
function resetTargetStyle(target) {
    target.style.border = '';
    target.style.boxShadow = '';
    target.style.backgroundColor = '';
}
function resetAllStyles() {
    for (let dropbox of document.getElementsByClassName('dropBox')) {
        resetTargetStyle(dropbox);
    }
}

export {
    mouseMove,
    mouseUp,
    mouseLeave,
    setTargetStyle,
    resetAllStyles,
    resetTargetStyle,
    resetDragItemStyles,
};
