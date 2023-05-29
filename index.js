$(document).ready(() => {
  let breakStr = 5;
  let sessionStr = 25;
  let tmp = '';
  let isPlay = false;
  let dispVal;
  let dispValMin = 0;
  let dispValSec = 0;
  let setIntID = 0;
  let isBreak = false;

  $('#break-length').text(breakStr);
  $('#session-length').text(sessionStr);

  tmp = sessionStr + ':' + '00';
  $('#time-left').text(tmp);

  $('#break-increment').click(() => {
    if (!isPlay) {
      if (breakStr < 60) {
        breakStr++;
        $('#break-length').text(breakStr);
      }
    }
  });

  $('#break-decrement').click(() => {
    if (!isPlay) {
      if (breakStr > 1) {
        breakStr--;
        $('#break-length').text(breakStr);
      }
    }
  });

  const sessionDisplay = () => {
    if (sessionStr < 10) {
      tmp = '0' + sessionStr + ':' + '00';
    } else {
      tmp = sessionStr + ':' + '00';
    }

    $('#time-left').text(tmp);
  }

  $('#session-increment').click(() => {
    if (!isPlay) {
      if (sessionStr < 60) {
        sessionStr++;
        $('#session-length').text(sessionStr);
      }

      sessionDisplay();
    }
  });

  $('#session-decrement').click(() => {
    if (!isPlay) {
      if (sessionStr > 1) {
        sessionStr--;
        $('#session-length').text(sessionStr);
      }

      sessionDisplay();
    }
  });

  const updateDisplay = () => {
    let min = '';
    let sec = '';

    dispValMin < 10 ? min = '0' + dispValMin : min = dispValMin;
    dispValSec < 10 ? sec = '0' + dispValSec : sec = dispValSec;

    $('#time-left').text(min + ':' + sec);
  }

  const updateTimer = () => {
    if (!isBreak) {
      // counting down session
      if (dispValMin >= 1 && dispValSec == 0) {
        dispValSec = 59;
        dispValMin--;

        updateDisplay();
      } else if (dispValMin >= 0 && dispValSec > 0) {
        dispValSec--;

        updateDisplay();
      } else if (dispValMin == 0 && dispValSec == 0) {
        isBreak = true;
        dispValMin = breakStr;
        dispValSec = 0;
        $('#timer-label').text('Break');
        document.getElementById('beep').play();
        document.getElementById('beep').muted = false;
        updateDisplay();
      }
    } else {
      // counting down break
      if (dispValMin >= 1 && dispValSec == 0) {
        dispValSec = 59;
        dispValMin--;

        updateDisplay();
      } else if (dispValMin >= 0 && dispValSec > 0) {
        dispValSec--;

        updateDisplay();
      } else if (dispValMin == 0 && dispValSec == 0) {
        isBreak = false;
        dispValMin = sessionStr;
        dispValSec = 0;
        $('#timer-label').text('Session');
        document.getElementById('beep').play();
        document.getElementById('beep').muted = false;
        updateDisplay();
      }
    }
  }

  $('#start_stop').click(() => {
    dispVal = $('#time-left').text().split(':');
    dispValMin = parseInt(dispVal[0]);
    dispValSec = parseInt(dispVal[1]);

    if (!isPlay) {
      isPlay = true;
      setIntID = setInterval(updateTimer, 1000);
    } else {
      isPlay = false;
      clearInterval(setIntID);
    }
  });

  $('#reset').click(() => {
    breakStr = 5;
    sessionStr = 25;
    $('#break-length').text(breakStr);
    $('#session-length').text(sessionStr);
    tmp = sessionStr + ':' + '00';
    $('#time-left').text(tmp);
    $('#timer-label').text('Session');
    clearInterval(setIntID);
    isPlay = false;
    isBreak = false;
    let clip = document.getElementById('beep');
    clip.pause();
    clip.currentTime = 0;
  });
});