const formEl = document.querySelector("form.form")
const inputEl = document.querySelector(".form__input")
const habitContainerEl = document.querySelector(".habit-list")

// let habits = []

function loadHabits() {
    const data = localStorage.getItem('habits')

    return data ? JSON.parse(data) : []
}

function saveHabits(habits) {
    localStorage.setItem('habits', JSON.stringify(habits))
}

function renderHabit(habit) {
    return `
    <li class="habit">
          <div class="habit__header">
          <h2 class="habit__name">${habit.name}</h2>
          <button class="habit__delete">&cross;</button>
      </div>
      <div class="habit__days"></div>
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
        id: Date.now()

    }

    habitContainerEl.innerHTML += inputEl.value
    
    // habits.push(newHabit)
    const oldHabits = loadHabits()

    const newHabits = [...oldHabits, newHabit]

    saveHabits(newHabits)

    render()

    inputEl.value = ""
}

formEl.addEventListener ('submit', handleSubmit)

render()