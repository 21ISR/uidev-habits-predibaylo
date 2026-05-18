const formEl = document.querySelector("form.form")
const inputEl = document.querySelector(".form__input")
const habitContainerEl = document.querySelector(".habit-list")

function handleSubmit(e) {
    e.preventDefault()
    habitContainerEl.innerHTML += inputEl.value
    
    inputEl.value = ""
}

formEl.addEventListener ('submit', handleSubmit)