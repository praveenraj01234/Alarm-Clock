document.addEventListener("DOMContentLoaded", function() {
    const currentTimeDisplay = document.getElementById("current-time");
    const alarmInput = document.getElementById("alarm-time");
    const setAlarmButton = document.getElementById("set-alarm");
    const alarmsContainer = document.getElementById("alarms-container");
    const alarmSound = document.getElementById("alarm-sound");

    let alarms = [];

    // Update current time every second
    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

        const timeDisplay = `${hours}:${minutes}:${seconds} ${ampm}`;
        currentTimeDisplay.textContent = timeDisplay;

        // Check for active alarms
        alarms.forEach((alarm, index) => {
            if (`${hours}:${minutes}:${seconds}` === alarm.time) {
                triggerAlarm();
                removeAlarm(index);
            }
        });
    }

    function triggerAlarm() {
        alarmSound.play();
        alert("Wake up! Alarm is ringing!");
    }

    // Add new alarm
    setAlarmButton.addEventListener("click", function() {
        const alarmValue = alarmInput.value;
        if (alarmValue) {
            const now = new Date();
            const [hours, minutes] = alarmValue.split(":");
            const alarmDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

            if (alarmDate > now) {
                const newAlarm = {
                    time: `${hours}:${minutes}:00`,
                };
                alarms.push(newAlarm);
                renderAlarms();
                alert(`Alarm set for ${newAlarm.time}`);
            } else {
                alert("Please set a future alarm time.");
            }
        } else {
            alert("Please enter a valid alarm time.");
        }
    });

    // Remove alarm
    function removeAlarm(index) {
        alarms.splice(index, 1);
        renderAlarms();
    }

    // Render alarms in the list
    function renderAlarms() {
        alarmsContainer.innerHTML = '';
        alarms.forEach((alarm, index) => {
            const alarmItem = document.createElement('div');
            alarmItem.classList.add('alarm-item');
            alarmItem.innerHTML = `
                <span>${alarm.time}</span>
                <button class="btn btn-danger btn-sm">Delete</button>
            `;
            alarmsContainer.appendChild(alarmItem);

            const deleteButton = alarmItem.querySelector('button');
            deleteButton.addEventListener('click', function() {
                removeAlarm(index);
            });
        });
    }

    // Update current time every second
    setInterval(updateTime, 1000);
});
