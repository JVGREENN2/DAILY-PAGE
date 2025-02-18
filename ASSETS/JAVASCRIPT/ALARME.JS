document.addEventListener("DOMContentLoaded", () => {
    // Selecionando elementos
    const currentTime = document.querySelector(".H1"),
          content = document.querySelector(".content"),
          alarmSelects = document.querySelectorAll("#TAB6 select"),
          setAlarmBtn = document.querySelector("#SET-ALARM");

    let alarmTime, isAlarmSet = false,
        ringtone = new Audio("ASSETS/FILES/ringtone.mp3"); // Caminho corrigido

    // Preenchendo os selects do Alarme
    if (alarmSelects.length > 0) {
        for (let i = 12; i > 0; i--) {
            let formatted = i < 10 ? `0${i}` : i;
            let option = `<option value="${formatted}">${formatted}</option>`;
            alarmSelects[0].innerHTML += option; // Hora
        }

        for (let i = 59; i >= 0; i--) {
            let formatted = i < 10 ? `0${i}` : i;
            let option = `<option value="${formatted}">${formatted}</option>`;
            alarmSelects[1].innerHTML += option; // Minuto
        }

        for (let i = 2; i > 0; i--) {
            let ampm = i == 1 ? "AM" : "PM";
            let option = `<option value="${ampm}">${ampm}</option>`;
            alarmSelects[2].innerHTML += option; // AM/PM
        }
    }

    // Atualizando o relógio
    setInterval(() => {
        let date = new Date(),
            h = date.getHours(),
            m = date.getMinutes(),
            s = date.getSeconds(),
            ampm = "AM";

        if (h >= 12) {
            h -= 12;
            ampm = "PM";
        }

        h = h == 0 ? 12 : h;
        h = h < 10 ? `0${h}` : h;
        m = m < 10 ? `0${m}` : m;
        s = s < 10 ? `0${s}` : s;

        if (currentTime) {
            currentTime.innerText = `${h}:${m}:${s} ${ampm}`;
        }

        if (alarmTime && alarmTime === `${h}:${m} ${ampm}`) {
            ringtone.play();
            ringtone.loop = true;
        }
    }, 1000);

    function setAlarm() {
        if (isAlarmSet) {
            alarmTime = "";
            ringtone.pause();
            content.classList.remove("disable");
            setAlarmBtn.innerText = "Set Alarm";
            isAlarmSet = false;
            return;
        }

        let time = `${alarmSelects[0].value}:${alarmSelects[1].value} ${alarmSelects[2].value}`;
        if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
            return alert("Por favor, selecione um horário válido!");
        }

        alarmTime = time;
        isAlarmSet = true;
        content.classList.add("disable");
        setAlarmBtn.innerText = "Clear Alarm";
    }

    if (setAlarmBtn) {
        setAlarmBtn.addEventListener("click", setAlarm);
    }
});
