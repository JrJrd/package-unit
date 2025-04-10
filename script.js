const roomTemp = document.getElementById('room-temp');
const tempInput = document.getElementById('temp-display');
const unitMode = document.getElementById('unit-mode');
const increaseBtn = document.getElementById('increase-temp');
const decreaseBtn = document.getElementById('decrease-temp');
const unitOperation = document.querySelector('.unit-operation');
const operationLog = document.getElementById('operation-log');

const heatingSteps = [
    "Inducer fan starts (prepares for combustion).",
    "Inducer safety switch verifies proper airflow.",
    "Gas valve opens to allow gas flow to the burner.",
    "Spark ignition ignites the gas at the burner.",
    "Flame at burner sensor confirms the ignition.",
    "Limit control picks up heat, indicating the system is heating properly.",
    "Blower fan turns on to circulate heated air."
];

const coolingSteps = [
    "Condenser fan starts.",
    "Compressor turns on to begin cooling.",
    "Blower fan turns on to circulate cool air.",
    "Pressure switches pass, confirming proper pressure.",
    "Evaporator coil cools the air.",
    "Cool air circulates to lower room temperature."
];

let currentStep = 0;

function updateUnitMode() {
    const currentRoomTemp = parseInt(roomTemp.textContent);
    const userTemp = parseInt(tempInput.value);

    if (currentRoomTemp < userTemp) {
        unitMode.textContent = "Heating";
        unitMode.style.color = "red";
        startHeatingProcess();
        operationLog.textContent = "";
    } else if (currentRoomTemp > userTemp) {
        unitMode.textContent = "Cooling";
        unitMode.style.color = "blue";
        startCoolingProcess();
    } else {
        unitMode.textContent = "On";
        unitMode.style.color = "#00ff00";
        operationLog.textContent = "";
    }
}

function startHeatingProcess() {
    currentStep = 0;
    operationLog.textContent += "Heating process starting...\n";
    setTimeout(displayNextStep, 2000);
}

function startCoolingProcess() {
    currentStep = 0;
    operationLog.textContent += "Cooling process starting...\n";
    setTimeout(displayNextStepCooling, 2000);
}

function displayNextStep() {
    if (currentStep < heatingSteps.length) {
        operationLog.textContent += heatingSteps[currentStep] + "\n";
        unitOperation.scrollTop = unitOperation.scrollHeight;
        currentStep++;
        setTimeout(displayNextStep, 3000);
    } else {
        operationLog.textContent += "Heating process completed.\n";
        unitOperation.scrollTop = unitOperation.scrollHeight;
    }
}

function displayNextStepCooling() {
    if (currentStep < coolingSteps.length) {
        operationLog.textContent += coolingSteps[currentStep] + "\n";
        unitOperation.scrollTop = unitOperation.scrollHeight;
        currentStep++;
        setTimeout(displayNextStepCooling, 3000);
    } else {
        operationLog.textContent += "Cooling process completed.\n";
        unitOperation.scrollTop = unitOperation.scrollHeight;
    }
}

increaseBtn.addEventListener('click', () => {
    let currentRoomTemp = parseInt(roomTemp.textContent);
    currentRoomTemp += 5;
    roomTemp.textContent = currentRoomTemp;
    updateUnitMode();
});

decreaseBtn.addEventListener('click', () => {
    let currentRoomTemp = parseInt(roomTemp.textContent);
    currentRoomTemp -= 5;
    roomTemp.textContent = currentRoomTemp;
    updateUnitMode();
});

tempInput.addEventListener('input', updateUnitMode);
