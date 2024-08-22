document.addEventListener('DOMContentLoaded', () => {
  const teamRows = document.querySelectorAll('.team-row');
  let draggedRow = null;
  let initialY = 0;
  let touchStartY = 0;
  let touchCurrentY = 0;
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
    e.preventDefault();
    this.classList.add('over');
  };

  const handleDragLeave = function () {
    this.classList.remove('over');
  };

  const handleDrop = function () {
    this.classList.remove('over');
    if (draggedRow && draggedRow !== this) {
      const tableBody = this.parentNode;
      const rows = Array.from(tableBody.children);
      const dropIndex = rows.indexOf(this);
      tableBody.insertBefore(draggedRow, rows[dropIndex]);
      updatePositions();
    }
  };

  const handleTouchStart = function (e) {
    e.preventDefault();
    touchTarget = e.target.closest('.team-row');
    if (touchTarget) {
      draggedRow = touchTarget;
      touchStartY = e.touches[0].clientY;
      setTimeout(() => touchTarget.classList.add('touch-dragging'), 0);
    }
  };

  const handleTouchMove = function (e) {
    e.preventDefault();
    if (draggedRow) {
      touchCurrentY = e.touches[0].clientY;
      const touchOffsetY = touchCurrentY - touchStartY;
      draggedRow.style.transform = `translateY(${touchOffsetY}px)`;

      // Determine the new position for dropping
      const rows = Array.from(draggedRow.parentNode.children);
      let newDropIndex = rows.length - 1;

      rows.forEach((row, index) => {
        if (row !== draggedRow) {
          const rect = row.getBoundingClientRect();
          if (touchCurrentY > rect.top + rect.height / 2) {
            newDropIndex = index + 1;
          }
        }
      });

      // Move the row temporarily to its new position
      const placeholder = document.createElement('tr');
      placeholder.style.height = `${draggedRow.offsetHeight}px`;
      draggedRow.parentNode.insertBefore(placeholder, rows[newDropIndex] || null);
      draggedRow.style.transform = '';
    }
  };

  const handleTouchEnd = function (e) {
    e.preventDefault();
    if (draggedRow) {
      draggedRow.style.transform = ''; // Reset transformation
      const rows = Array.from(draggedRow.parentNode.children);
      const placeholder = rows.find(row => row.style.height);

      if (placeholder) {
        placeholder.remove();
      }

      // Update the positions
      updatePositions();
      draggedRow.classList.remove('touch-dragging');
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
