// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {
    // Retrieve HTML elements by their IDs and assign them to variables
    const currentTimeDisplay = document.getElementById("current-time");
    const alarmInput = document.getElementById("alarm-time");
    const setAlarmButton = document.getElementById("set-alarm");
    const alarmsContainer = document.getElementById("alarms-container");
    const alarmSound = document.getElementById("alarm-sound");

    // Initialize an empty array to store the alarm times
    let alarms = [];

    // Function to update the displayed time every second
    function updateTime() {
        // Create a new Date object containing the current date and time
        const now = new Date();
        // Extract hours, minutes, and seconds from the Date object and format to 2 digits
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        // Determine if it's AM or PM
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        // Format the time display as a string in "HH:MM:SS AM/PM" format
        const timeDisplay = `${hours}:${minutes}:${seconds} ${ampm}`;
        // Update the text content of the currentTimeDisplay element
        currentTimeDisplay.textContent = timeDisplay;

        // Check each alarm in the alarms array to see if it matches the current time
        alarms.forEach((alarm, index) => {
            if (`${hours}:${minutes}:${seconds}` === alarm.time) {
                triggerAlarm();
                removeAlarm(index);
            }
        });
    }

    // Function to play the alarm sound and show an alert message
    function triggerAlarm() {
        alarmSound.play();
        alert("Wake up! Alarm is ringing!");
    }

    // Event listener for the Set Alarm button click
    setAlarmButton.addEventListener("click", function() {
        // Get the value from the alarm time input field
        const alarmValue = alarmInput.value;
        // Check if a value was entered
        if (alarmValue) {
            // Create a new Date object for the current date and time
            const now = new Date();
            // Split the alarmValue by ":" to separate hours and minutes
            const [hours, minutes] = alarmValue.split(":");
            // Create a new Date object for the alarm set to today with the specified time
            const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

            // Check if the alarm time is in the future
            if (alarmDate > now) {
                // Create a new alarm object with the specified time
                const newAlarm = {
                    time: `${hours}:${minutes}:00`,
                };
                // Add the new alarm to the alarms array
                alarms.push(newAlarm);
                // Update the alarm display
                renderAlarms();
                // Notify the user that the alarm has been set
                alert(`Alarm set for ${newAlarm.time}`);
            } else {
                // Alert the user if the entered time is not in the future
                alert("Please set a future alarm time.");
            }
        } else {
            // Alert the user if no time was entered
            alert("Please enter a valid alarm time.");
        }
    });

    // Function to remove an alarm from the alarms array based on its index
    function removeAlarm(index) {
        alarms.splice(index, 1);
        renderAlarms();
    }

    // Function to update the DOM to display all current alarms
    function renderAlarms() {
        // Clear the alarms display container
        alarmsContainer.innerHTML = '';
        // Iterate over each alarm in the alarms array
        alarms.forEach((alarm, index) => {
            // Create a new div element for each alarm
            const alarmItem = document.createElement('div');
            alarmItem.classList.add('alarm-item');
            // Set the inner HTML of the div to show the alarm time and a delete button
            alarmItem.innerHTML = `
                <span>${alarm.time}</span>
                <button class="btn btn-danger btn-sm">Delete</button>
            `;
            // Append the new div to the alarmsContainer
            alarmsContainer.appendChild(alarmItem);

            // Add an event listener to the delete button to remove the alarm when clicked
            const deleteButton = alarmItem.querySelector('button');
            deleteButton.addEventListener('click', function() {
                removeAlarm(index);
            });
        });
    }

    // Set an interval to call updateTime every 1000 milliseconds (1 second)
    setInterval(updateTime, 1000);
});
