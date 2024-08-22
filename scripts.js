document.addEventListener('DOMContentLoaded', () => {
  const teamRows = document.querySelectorAll('.team-row');
  let draggedRow = null;

  teamRows.forEach(row => {
    // Add dragstart and dragend events
    row.addEventListener('dragstart', function () {
      draggedRow = this;
      setTimeout(() => this.classList.add('dragging'), 0);
    });

    row.addEventListener('dragend', function () {
      setTimeout(() => this.classList.remove('dragging'), 0);
      draggedRow = null;
    });

    // Add dragover and drop events to handle reordering
    row.addEventListener('dragover', function (e) {
      e.preventDefault();  // Prevent default to allow drop
      this.classList.add('over');
    });

    row.addEventListener('dragleave', function () {
      this.classList.remove('over');
    });

    row.addEventListener('drop', function () {
      this.classList.remove('over');
      if (draggedRow !== this) {
        const tableBody = this.parentNode;

        // Swap the rows
        tableBody.insertBefore(draggedRow, this.nextSibling);
        updatePositions();  // Update the positions after the swap
      }
    });
  });

  // Function to update the position numbers after sorting
  function updatePositions() {
    document.querySelectorAll('.position').forEach((positionCell, index) => {
      positionCell.textContent = index + 1;
    });
  }
});

