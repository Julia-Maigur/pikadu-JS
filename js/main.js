// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию 
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню 
  menu.classList.toggle('visible');
})

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');


const listUsers = [
  {
    id: '01',
    email: 'maks@mail.com',
    password: '12345',
    displayName: 'MaksJS'
  },
  {
    id: '02',
    email: 'kate@mail.com',
    password: '123456',
    displayName: 'KateKillMaks'
  }
];

// объединяем несколько функций в один объект
const setUsers = {
    user: null,
    logIn(email, password, handler) {
        const user = this.getUser(email);
        if (user && user.password === password) {
            this.authorizedUser(user);
            handler();
        } else {
            alert('Пользователь с такими данными не найден')
        }
    },
    logOut() {
      console.log('выход');
    },
    signUp(email, password, handler) {

        if (!email.trim() || !password.trim()) {
            alert('Введите данные')
            return;
        }

      if (!this.getUser(email)) {
          const user = {email, password, displayName: email};
          listUsers.push(user);
          this.authorizedUser(user)
          handler();
      } else {
          alert('Пользователь с таким email уже зарегистрирован')
      }
    },
    getUser(email) {
        return listUsers.find(item => item.email === email)
    },
    authorizedUser(user) {
      this.user = user;
    }
}

const toggleAuthDom = () => {
    const user = setUsers.user;

    //Here, we get a user without @mail.ru
    let userName = null;

    if (user) {
        let arr = user.email.split('@');
        if (arr && arr[0]) {
            userName = arr[0];
        }
        /*
        Способ №2
        result = user.email.match(/([^@]+)@(.+)\/);
        userName = result[1];
         */
        /*
        Способ №3
        var pos = userName.indexOf('@');
        if (pos > -1) {
            userName = userName.substr(0, pos);
            console.log('username=' + userName)
        }
        */
    }

    console.log('user: ', user);

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        //userNameElem.textContent = user.displayName;
        userNameElem.textContent = userName;
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
    }
}


loginForm.addEventListener('submit', (event) => {
    // метод, отменяющий стандартное браузерное поведение
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
});

loginSignup.addEventListener('click', (event) => {
    event.preventDefault();
    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;
    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
});

toggleAuthDom();
