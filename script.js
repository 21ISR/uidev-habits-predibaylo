const formEl = document.querySelector("form.form")
const inputEl = document.querySelector(".form__input")
const habitContainerEl = document.querySelector(".habit-list")
const DAYS = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс']

// let habits = []

function loadHabits() {
    const data = localStorage.getItem('habits')

    return data ? JSON.parse(data) : []
}

function saveHabits(habits) {
    localStorage.setItem('habits', JSON.stringify(habits))
}

function createDays (habit) {
    return DAYS.map((day, i) => `
        <div data-id=${habit.id} data-index = ${i} class = "day${habit.done.includes(i) ? " day--done" : ""}>
            <span class="day__label">${day}</span>
            <div class="day__circle"></div>
        </div>
        `,
    ).join('')



}


function renderHabit(habit) {
    return `
    <li class="habit">
          <div class="habit__header">
          <h2 class="habit__name">${habit.name}</h2>
          <button data-id=${habit.id} class="habit__delete">&cross;</button>
      </div>
      <div class="habit__days">${createDays(habit)}</div>
    </li>
`
}

function render() {
    const habits = loadHabits()

    const habitsEl = habits.map(habit => renderHabit(habit)).join('')
    habitContainerEl.innerHTML = habitsEl
}

function handleSubmit(e) {
    e.preventDefault()
    if (inputEl.value.trim() === '') return


    const newHabit = {

        name: inputEl.value.trim(),
        id: Date.now(),
        done:[0,1,2,3,4,5,6],

    }

    habitContainerEl.innerHTML += inputEl.value
    
    // habits.push(newHabit)
    const oldHabits = loadHabits()

    const newHabits = [...oldHabits, newHabit]

    saveHabits(newHabits)

    render()

    inputEl.value = ""
}

function handleHabit(e) {
    const delHabitBtn = e.target.closest('.habit__delete')

    if (delHabitBtn) {
        const habitId = delHabitBtn.dataset.id

        const oldHabits = loadHabits()
        
        const newHabits = oldHabits.filter(el => el.id != habitId)
        saveHabits(newHabits)
        render()
        console.log(index,id);
        
    }

    const dayHabitBtn = e.target.closest (".day")

    if (dayHabitBtn) {
        const id = dayHabitBtn.dataset.it
        const index = dayHabitBtn.dataset.index
        const habits = loadHabits()

        const newHabit = habits.map( el => {
            if(el.id !== (id)) return el

            const isDone = el.done.includes(index)

            const a = {...el,
                done: isDone
                    ? el.done.filter((day) => day !== index)
                    : [... el.done, index],
            }
        console.log(a)
        return a
        })
        

    }
}

habitContainerEl.addEventListener("click", handleHabit)
formEl.addEventListener ('submit', handleSubmit)

render()