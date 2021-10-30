var talkers = [];
var talkerId = 0;

function createTalker(talkerName) {
    if (talkerName.trim() === "") return false;

    var talker = talkers[++talkerId] = {
        id: talkerId,
        name: talkerName,
        talkTime: 0,
        isTalking: false,
        timer: null,
        toggleButton: null,
        timeDisplay: null
    };

    talker.timeDisplay = document.createElement("span");
    talker.toggleButton = document.createElement("button");
    talker.toggleButton.onclick = function () {toggleTalking(talker.id)};

    var listEntry = document.createElement("li");
    listEntry.appendChild(document.createTextNode(talkerName));
    listEntry.appendChild(talker.timeDisplay);
    listEntry.appendChild(talker.toggleButton);
    document.getElementById("talkerList").appendChild(listEntry);

    toggleTalking(talker.id);
}

function toggleTalking(id) {
    talkers[id].isTalking === true ? stopTalking(id) : startTalking(id);
}

function startTalking(id) {
    stopTalkingTalkers();

    talkers[id].isTalking = true;
    talkers[id].toggleButton.className = "isTalking";

    talkers[id].timer = setInterval(function () {
        var date = new Date(0);
        date.setSeconds(++talkers[id].talkTime);

        talkers[id].timeDisplay.textContent
            = " " + date.toISOString().substr(11, 8); // https://stackoverflow.com/a/25279399
    }, 1000);
}

function stopTalking(id) {
    talkers[id].isTalking = false;
    talkers[id].toggleButton.className = "isNotTalking";

    clearInterval(talkers[id].timer);
}

function stopTalkingTalkers() {
    for (var id in talkers) {
        if (talkers[id].isTalking) {
            stopTalking(id);
        }
    }
}


