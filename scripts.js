document.addEventListener('DOMContentLoaded', () => {
  const teamRows = document.querySelectorAll('.team-row');
  let draggedRow = null;
  let touchTarget = null;

  const handleDragStart = function () {
    draggedRow = this;
    setTimeout(() => this.classList.add('dragging'), 0);
  };

  const handleDragEnd = function () {
    setTimeout(() => this.classList.remove('dragging'), 0);
    draggedRow = null;
  };

  const handleDragOver = function (e) {
    e.preventDefault();  // Prevent default to allow drop
    this.classList.add('over');
  };

  const handleDragLeave = function () {
    this.classList.remove('over');
  };

  const handleDrop = function () {
    this.classList.remove('over');
    if (draggedRow !== this) {
      const tableBody = this.parentNode;

      // Swap the rows
      tableBody.insertBefore(draggedRow, this.nextSibling);
      updatePositions();  // Update the positions after the swap
    }
  };

  const handleTouchStart = function (e) {
    touchTarget = e.target;
    draggedRow = touchTarget;
    setTimeout(() => touchTarget.classList.add('dragging'), 0);
  };

  const handleTouchEnd = function (e) {
    e.preventDefault();
    if (touchTarget) {
      touchTarget.classList.remove('dragging');
      touchTarget = null;
    }
  };

  const handleTouchMove = function (e) {
    e.preventDefault();
    // Here you can implement logic to simulate dragging if needed
    // For simplicity, this example does not include full touch handling
  };

  teamRows.forEach(row => {
    // Add dragstart and dragend events for mouse
    row.addEventListener('dragstart', handleDragStart);
    row.addEventListener('dragend', handleDragEnd);

    // Add dragover, dragleave, and drop events for mouse
    row.addEventListener('dragover', handleDragOver);
    row.addEventListener('dragleave', handleDragLeave);
    row.addEventListener('drop', handleDrop);

    // Add touchstart, touchend, and touchmove events for touch devices
    row.addEventListener('touchstart', handleTouchStart);
    row.addEventListener('touchend', handleTouchEnd);
    row.addEventListener('touchmove', handleTouchMove);
  });

  // Function to update the position numbers after sorting
  function updatePositions() {
    document.querySelectorAll('.position').forEach((positionCell, index) => {
      positionCell.textContent = index + 1;
    });
  }
});
