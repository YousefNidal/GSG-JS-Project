







const currentTime = document.querySelector("#currentTime");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#setAlarmButton");
const alarmList = document.getElementById('alarmList');

let alarmTime, isAlarmSet;
const ringtone = new Audio("./files/alarm.mp3");

// Populate the hour, minute, and AM/PM select boxes
for (let i = 12; i > 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Function to update the clock display
function updateClock() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";
    
    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? 12 : h;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    
    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
    
    if (alarmTime === `${h}:${m} ${ampm}` && isAlarmSet) {
        ringtone.play();
        ringtone.loop = true;
    }
}

// Update the clock every second
setInterval(updateClock, 1000);

// Function to set or clear the alarm
function setAlarm() {
    if (isAlarmSet) {
        alarmTime = "";
        ringtone.pause();
        setAlarmBtn.innerText = "Set Alarm";
    } else {
        let time = `${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
        if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
            return alert("Please, select a valid time to set the alarm!");
        }
        alarmTime = time;
        ringtone.loop = false;
        setAlarmBtn.innerText = "Clear Alarm";

        // Add the alarm to the list
        const listItem = document.createElement('li');
        listItem.textContent = alarmTime;
        alarmList.appendChild(listItem);
    }
    isAlarmSet = !isAlarmSet;
}

// Add click event listener to the "Set Alarm" button
setAlarmBtn.addEventListener('click', setAlarm);








