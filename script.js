// Add click event to each day in the calendar to mark it as a leave day
document.addEventListener('DOMContentLoaded', function() {
    const MAX_SELECTIONS = 25;
    let selectedCount = 0;

    document.querySelectorAll('td').forEach(day => {
        day.addEventListener('click', function() {
            if (this.classList.contains('leave-selected')) {
                // If the cell is already selected, unselect it and decrement the count
                this.classList.remove('leave-selected');
                selectedCount--;
            } else if (selectedCount < MAX_SELECTIONS) {
                // If the cell is not selected and the limit is not reached, select it and increment the count
                this.classList.add('leave-selected');
                selectedCount++;
            } else {
                // Optionally, provide feedback if the limit is reached
                alert('You can only select up to 25 days.');
            }
        });
    });
});