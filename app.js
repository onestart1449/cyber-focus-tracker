// Habit Tracker Logic
const habitForm = document.getElementById('habit-form');
const habitInput = document.getElementById('habit-input');
const habitList = document.getElementById('habit-list');

let habits = JSON.parse(localStorage.getItem('habits')) || [];

function saveAndRenderHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
    renderHabits();
}

function renderHabits() {
    habitList.innerHTML = '';
    habits.forEach((habit, index) => {
        const li = document.createElement('li');
        li.className = habit.completed ? 'completed' : '';
        li.innerHTML = `
            <span>> ${habit.text}</span>
            <div>
                <button class="btn" onclick="toggleHabit(${index})">TOGGLE</button>
                <button class="btn secondary" onclick="deleteHabit(${index})">X</button>
            </div>
        `;
        habitList.appendChild(li);
    });
}

habitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (habitInput.value.trim() === '') return;
    habits.push({ text: habitInput.value, completed: false });
    habitInput.value = '';
    saveAndRenderHabits();
});

window.toggleHabit = function(index) {
    habits[index].completed = !habits[index].completed;
    saveAndRenderHabits();
};

window.deleteHabit = function(index) {
    habits.splice(index, 1);
    saveAndRenderHabits();
};

renderHabits();

// Focus Timer Logic
let timeLeft = 25 * 60;
let timerId = null;
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (timerId === null) {
        startBtn.textContent = 'PAUSE';
        timerId = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timerId);
                alert('Focus session complete!');
                timerId = null;
                startBtn.textContent = 'START';
            }
        }, 1000);
    } else {
        clearInterval(timerId);
        timerId = null;
        startBtn.textContent = 'START';
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateTimerDisplay();
    startBtn.textContent = 'START';
});
