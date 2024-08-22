document.addEventListener('DOMContentLoaded', () => {
  const teamRows = document.querySelectorAll('.team-row');
  let draggedRow = null;
  let touchStartY = 0;
  let touchCurrentY = 0;
  let touchTarget = null;

  // Handle Drag Start
  const handleDragStart = function () {
    draggedRow = this;
    setTimeout(() => this.classList.add('dragging'), 0);
  };

  // Handle Drag End
  const handleDragEnd = function () {
    setTimeout(() => this.classList.remove('dragging'), 0);
    draggedRow = null;
  };

  // Handle Drag Over
  const handleDragOver = function (e) {
    e.preventDefault();  // Allow drop
    this.classList.add('over');
  };

  // Handle Drag Leave
  const handleDragLeave = function () {
    this.classList.remove('over');
  };

  // Handle Drop
  const handleDrop = function () {
    this.classList.remove('over');
    if (draggedRow && draggedRow !== this) {
      const tableBody = this.parentNode;
      const rows = Array.from(tableBody.children);
      const dropIndex = rows.indexOf(this);
      tableBody.insertBefore(draggedRow, rows[dropIndex]);
      updatePositions();  // Update the positions after swap
    }
  };

  // Handle Touch Start
  const handleTouchStart = function (e) {
    e.preventDefault();
    touchTarget = e.target.closest('.team-row');
    if (touchTarget) {
      draggedRow = touchTarget;
      touchStartY = e.touches[0].clientY;
      setTimeout(() => touchTarget.classList.add('touch-dragging'), 0);
    }
  };

  // Handle Touch Move
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

      // Insert placeholder row
      const placeholder = document.createElement('tr');
      placeholder.classList.add('placeholder');
      draggedRow.parentNode.insertBefore(placeholder, rows[newDropIndex] || null);
    }
  };

  // Handle Touch End
  const handleTouchEnd = function (e) {
    e.preventDefault();
    if (draggedRow) {
      draggedRow.style.transform = '';  // Reset transformation
      const rows = Array.from(draggedRow.parentNode.children);
      const placeholder = rows.find(row => row.classList.contains('placeholder'));

      if (placeholder) {
        placeholder.remove();
        const newIndex = rows.indexOf(draggedRow);
        const oldIndex = Array.from(draggedRow.parentNode.children).indexOf(draggedRow);
        if (oldIndex !== newIndex) {
          draggedRow.parentNode.insertBefore(draggedRow, rows[newIndex + (newIndex > oldIndex ? 1 : 0)]);
        }
      }

      updatePositions();  // Update positions after drop
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
