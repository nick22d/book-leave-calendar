// Add click event to each day in the calendar to mark it as a leave day
document.addEventListener('DOMContentLoaded', function() {
    const MAX_SELECTIONS = 25;
    const TODAY = new Date();
    let selectedCount = 0;

    document.querySelectorAll('td').forEach(day => {
        day.addEventListener('click', function() {
            const dayValue = this.innerText;

            // Check if the cell is empty or doesn't contain a valid date
            if (!dayValue || dayValue === "") {
                alert("You cannot select an empty box.");
                return;
            }
            
            // Get the current month and year from the table or DOM (assuming each month has a unique class or data attribute)
            const monthElement = this.closest('.month');
            const monthYearText = monthElement.querySelector('h2').textContent; // e.g., "January 2024"
            const [monthName, year] = monthYearText.split(' ');

            // Map month name to month number
            const monthIndex = new Date(Date.parse(`${monthName} 1, 2024`)).getMonth();

            // Create a Date object from the selected cell's date
            const selectedDate = new Date(year, monthIndex, dayValue);

             // Condition: Ensure selected date is not before today
            if (selectedDate < TODAY) {
                alert("You cannot select a date before today's date.");
                return;
            }

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