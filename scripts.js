document.addEventListener('DOMContentLoaded', () => {
  const teamRows = document.querySelectorAll('.team-row');
  let draggedRow = null;
  let initialY = 0;
  let draggedRowOriginalIndex = null;

  const handleDragStart = function (e) {
    e.dataTransfer.setData('text/plain', null); // For Firefox compatibility
    draggedRow = this;
    draggedRowOriginalIndex = Array.from(draggedRow.parentNode.children).indexOf(draggedRow);
    setTimeout(() => draggedRow.classList.add('dragging'), 0);
  };

  const handleDragEnd = function () {
    setTimeout(() => draggedRow.classList.remove('dragging'), 0);
    draggedRow = null;
  };

  const handleDragOver = function (e) {
    e.preventDefault(); // Prevent default to allow drop
    this.classList.add('over');
  };

  const handleDragLeave = function () {
    this.classList.remove('over');
  };

  const handleDrop = function () {
    this.classList.remove('over');
    if (draggedRow && draggedRow !== this) {
      const tableBody = this.parentNode;
      const dropIndex = Array.from(tableBody.children).indexOf(this);
      const rows = Array.from(tableBody.children);
      if (dropIndex !== draggedRowOriginalIndex) {
        tableBody.insertBefore(draggedRow, tableBody.children[dropIndex]);
        updatePositions(); // Update the positions after the swap
      }
    }
  };

  const handleTouchStart = function (e) {
    e.preventDefault();
    touchTarget = e.target.closest('.team-row');
    if (touchTarget) {
      draggedRow = touchTarget;
      initialY = e.touches[0].clientY;
      setTimeout(() => touchTarget.classList.add('touch-dragging'), 0);
    }
  };

  const handleTouchMove = function (e) {
    e.preventDefault();
    if (draggedRow) {
      const currentY = e.touches[0].clientY;
      const touchOffsetY = currentY - initialY;
      draggedRow.style.transform = `translateY(${touchOffsetY}px)`;
      // Potentially handle dropping position here
    }
  };

  const handleTouchEnd = function (e) {
    e.preventDefault();
    if (draggedRow) {
      draggedRow.style.transform = ''; // Reset transformation
      touchTarget.classList.remove('touch-dragging');
      // Add logic to finalize the drop position
      draggedRow = null;
      touchTarget = null;
    }
  };

  teamRows.forEach(row => {
    row.addEventListener('dragstart', handleDragStart);
    row.addEventListener('dragend', handleDragEnd);
    row.addEventListener('dragover', handleDragOver);
    row.addEventListener('dragleave', handleDragLeave);
    row.addEventListener('drop', handleDrop);

    row.addEventListener('touchstart', handleTouchStart);
    row.addEventListener('touchmove', handleTouchMove);
    row.addEventListener('touchend', handleTouchEnd);
  });

  function updatePositions() {
    document.querySelectorAll('.position').forEach((positionCell, index) => {
      positionCell.textContent = index + 1;
    });
  }
});
