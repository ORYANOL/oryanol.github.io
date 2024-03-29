const toggleSwitch = document.getElementById('toggle-switch');
const lengthInput = document.getElementById('length-input');
const generateBtn = document.getElementById('generate-btn');
const generatedPassword = document.getElementById('generated-password');
const body = document.body;
const icon = document.getElementById('icon');
const icon2 = document.getElementById('icon2');

let isRandomCharacters = true;

toggleSwitch.addEventListener('change', function() {
  isRandomCharacters = !isRandomCharacters;
});

generateBtn.addEventListener('click', function() {
  const length = lengthInput.value;
  let password = '';

  if (isRandomCharacters) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  } else {
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi', 'lemon', 'mango', 'nectarine', 'orange', 'peach', 'quince', 'raspberry', 'strawberry', 'tangerine', 'watermelon', 'zucchini'];
    for (let i = 0; i < length; i++) {
      password += words[Math.floor(Math.random() * words.length)];
      if (i !== length - 1) {
        password += '-';
      }
    }
  }

  generatedPassword.textContent = password;
});

// Function to trigger haptic feedback
function vibrate() {
    if (navigator.vibrate) {
        navigator.vibrate(50); // Vibrate for 50 milliseconds
    }
    else if (window.navigator.vibrate) {
        window.navigator.vibrate(50); // Vibrate for 60 milliseconds (iOS)
    }
}

// Function to toggle the dark theme
function toggleDarkMode() {
    body.classList.toggle('dark-theme');
    if (body.classList.contains('dark-theme')) {
        icon2.src = 'img/dti/sun.png';
        localStorage.setItem('theme', 'dark');
    } else {
        icon2.src = 'img/dti/moon.png';
        localStorage.setItem('theme', 'light');
    }
}

// Check the user's system preference
function checkSystemPreference() {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDarkMode) {
        body.classList.add('dark-theme');
        icon2.src = 'img/dti/sun.png';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        icon2.src = 'img/dti/moon.png';
        localStorage.setItem('theme', 'light');
    }
}

// Set the initial theme based on localStorage or system preference
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'dark') {
    body.classList.add('dark-theme');
    icon2.src = 'img/dti/sun.png';
} else if (storedTheme === 'light') {
    body.classList.remove('dark-theme');
    icon2.src = 'img/dti/moon.png';
} else {
    checkSystemPreference();
}

// Add event listeners for toggling the dark mode
icon.addEventListener('click', () => {
    vibrate(); // Trigger haptic feedback
    toggleDarkMode();
});
icon2.addEventListener('click', toggleDarkMode);