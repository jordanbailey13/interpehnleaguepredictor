let selectedItem = null;
let touchStart = null;
const touchDelay = 300; // Time in milliseconds to distinguish between tap and double-tap

function handleTouchStart(event) {
  if (window.innerWidth <= 768) { // Check if the device is mobile
    event.preventDefault(); // Prevent default touch action

    const target = event.target.closest('.team'); // Ensure we're targeting the correct team cell
    if (!target || !target.classList.contains('team')) return;

    const row = target.closest('.team-row'); // Get the whole row

    if (selectedItem) {
      // Move the previously selected item to the new position
      if (touchStart && (Date.now() - touchStart < touchDelay)) {
        // Handle double-tap (move item)
        const rows = Array.from(document.querySelectorAll('.team-row'));
        const selectedIndex = rows.indexOf(selectedItem.parentElement);
        const targetIndex = rows.indexOf(row);

        // Swap team names but keep position numbers fixed
        if (selectedIndex !== targetIndex) {
          const tableBody = row.parentNode;
          tableBody.insertBefore(selectedItem.parentElement, row);
          tableBody.insertBefore(row, selectedItem.parentElement.nextSibling);
        }

        selectedItem.classList.remove('selected'); // Remove highlight from the previously selected item
        selectedItem = null;
        touchStart = null; // Reset touchStart after moving
      } else {
        // Handle single-tap (select item)
        selectedItem.classList.remove('selected'); // Remove highlight from the previously selected item
        selectedItem = target;
        selectedItem.classList.add('selected'); // Add a class to highlight the selected item
        touchStart = Date.now(); // Record touch start time
      }
    } else {
      // Handle single-tap (select item)
      selectedItem = target;
      selectedItem.classList.add('selected'); // Add a class to highlight the selected item
      touchStart = Date.now(); // Record touch start time
    }
  }
}

function handleDragStart(event) {
  if (window.innerWidth > 768) {
    event.dataTransfer.setData('text/plain', event.target.id);
  }
}

function handleDrop(event) {
  event.preventDefault();
  const draggedElementId = event.dataTransfer.getData('text/plain');
  const draggedElement = document.getElementById(draggedElementId);
  const target = event.target.closest('.team-row');

  if (target && draggedElement && target !== draggedElement.parentElement) {
    // Move the dragged item to the new position
    const rows = Array.from(document.querySelectorAll('.team-row'));
    const draggedIndex = rows.indexOf(draggedElement.parentElement);
    const targetIndex = rows.indexOf(target);

    if (draggedIndex !== targetIndex) {
      const tableBody = target.parentNode;
      tableBody.insertBefore(draggedElement.parentElement, target);
      tableBody.insertBefore(target, draggedElement.parentElement.nextSibling);
    }
  }
}

function handleDragOver(event) {
  event.preventDefault();
}

document.querySelectorAll('.team').forEach(item => {
  item.addEventListener('touchstart', handleTouchStart);
  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('drop', handleDrop);
});
