document.addEventListener('DOMContentLoaded', () => {
  const rows = document.querySelectorAll('.team-row');

  let draggedRow = null;

  const handleDragStart = (e) => {
    draggedRow = e.target;
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    draggedRow = null;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.target.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.target.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    if (e.target.classList.contains('team-row') && draggedRow !== e.target) {
      const tableBody = e.target.parentElement;
      tableBody.insertBefore(draggedRow, e.target.nextSibling);
    }
  };

  rows.forEach(row => {
    row.addEventListener('dragstart', handleDragStart);
    row.addEventListener('dragend', handleDragEnd);
    row.addEventListener('dragover', handleDragOver);
    row.addEventListener('dragleave', handleDragLeave);
    row.addEventListener('drop', handleDrop);
  });

  // Touch event handlers for mobile
  const handleTouchStart = (e) => {
    draggedRow = e.target;
    e.target.classList.add('dragging');
  };

  const handleTouchEnd = (e) => {
    e.target.classList.remove('dragging');
    draggedRow = null;
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    // You may need to adjust this to support dragging behavior
    // for touch devices. For simplicity, this example does not
    // include full touch handling logic for drag-and-drop.
  };

  rows.forEach(row => {
    row.addEventListener('touchstart', handleTouchStart);
    row.addEventListener('touchend', handleTouchEnd);
    row.addEventListener('touchmove', handleTouchMove);
  });
});
