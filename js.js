let step = 0;
const btn = document.getElementById('btn');
const btns = document.querySelectorAll('.btns');
const btnsArray = Array.from(btns);
const btnStep = document.getElementById('btnStep');
const select__container = document.querySelector('.main__select');
const sumInfo = document.querySelector('.summary__info');
const dotContainer = document.querySelector('.main__dots');
const main = document.querySelector('.main');
const info = {
    user: "default",
    email: "default@example.com",
    topics: [],
};

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if(step == 2){
        btn.remove();
    }
    if(step == 0){
        const username = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        if(!username || !email || !email.includes("@")){
            return;
        }
        info.user = username;
        info.email = email;
    }
    if(step == 1){
        if(info.topics.length == 0){
            return;
        }

        const wMail = document.querySelector('#wEmail');
        const wUser = document.querySelector('#wUser');
        const {user, email} = info;
        wMail.textContent = email;
        wUser.textContent = user;
        info.topics.forEach(item => {
            sumInfo.innerHTML += `<li>${item}</li>`
        })

        btn.textContent = "Confirm"
    }
    changeSteps(step);
})
select__container.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('active__li')){
        e.target.classList.remove('active__li');
        const topic = e.target.textContent;
        info.topics.pop(topic);
        return;
    }
    if(e.target.classList.contains('li')){
        e.target.classList.add('active__li')
        const topic = e.target.textContent;
        info.topics.push(topic);
    }
})
const changeSteps = function(steps) {

    const currentMap = document.getElementById(`map-${steps}`);
    if(steps == 2){
        currentMap.classList.add('hidden');
        dotContainer.remove();
        main.style.width = 'auto';
        main.style.height = 'auto';
        const nextStep = document.getElementById(`map-${steps + 1}`);
        nextStep.classList.remove('hidden');
        return
    }
    currentMap.classList.add('hidden');
    btnsArray[steps].classList.remove('hidden');
    btnsArray[steps].classList.remove('active');
    btnsArray[steps].firstElementChild.classList.remove('main__dot-viewed');
    steps++;
    step++;
    const nextMap = document.getElementById(`map-${step}`);
    btnsArray[steps].firstElementChild.classList.add('main__dot-viewed');
    btnsArray[steps].classList.add('active');
    nextMap.classList.remove('hidden');
    btnStep.textContent = `Step ${steps + 1} of 3`
}