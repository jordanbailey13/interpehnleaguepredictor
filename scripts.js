let selectedItem = null;

function handleClick(event) {
  if (window.innerWidth <= 768) { // Check if the device is mobile
    const target = event.target.closest('.team-row'); // Ensure we're targeting the correct row

    if (!target || !target.classList.contains('team-row')) return;

    if (selectedItem) {
      // Move the previously selected item to the new position
      const selectedIndex = Array.from(target.parentNode.children).indexOf(selectedItem);
      const targetIndex = Array.from(target.parentNode.children).indexOf(target);

      // Swap positions
      if (selectedIndex !== targetIndex) {
        target.parentNode.insertBefore(selectedItem, target);
        target.parentNode.insertBefore(target, selectedItem.nextSibling);
      }

      selectedItem.classList.remove('selected'); // Remove highlight from the previously selected item
      selectedItem = null;
    } else {
      // Select the item
      selectedItem = target;
      selectedItem.classList.add('selected'); // Add a class to highlight the selected item
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

  if (target && draggedElement && target !== draggedElement) {
    // Move the dragged item to the new position
    const draggedIndex = Array.from(target.parentNode.children).indexOf(draggedElement);
    const targetIndex = Array.from(target.parentNode.children).indexOf(target);

    if (draggedIndex !== targetIndex) {
      target.parentNode.insertBefore(draggedElement, target);
      target.parentNode.insertBefore(target, draggedElement.nextSibling);
    }
  }
}

function handleDragOver(event) {
  event.preventDefault();
}

document.querySelectorAll('.team-row').forEach(item => {
  item.addEventListener('click', handleClick);
  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragover', handleDragOver);
  item.addEventListener('drop', handleDrop);
});
