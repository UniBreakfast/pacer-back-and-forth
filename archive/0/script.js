//? project://index.html

const main = document.querySelector('main');
const mainMenu = document.getElementById('main-menu');
const [addEndeavorBtn, addActivityBtn] = mainMenu.children;
const addEndeavorScr = document.getElementById('add-endeavor-screen');
const addActivityScr = document.getElementById('add-activity-screen');

main.onclick = handleBackButtons;
addEndeavorBtn.onclick = showAddEndeavorForm;
addActivityBtn.onclick = showAddActivityForm;

prepAddEndeavorForm();
prepAddActivityForm();

function handleBackButtons(e) {
  const btn = e.target.closest('button.back');
  
  if (!btn) return;

  goBack();
}

function goBack() {
  if (mainMenu.hidden) {
    showMainMenu();
  }
}

function showAddEndeavorForm() {
  hideMainMenu();

  addEndeavorScr.hidden = false;
}

function showAddActivityForm() {
  hideMainMenu();

  addActivityScr.hidden = false;
}

function hideMainMenu() {
  mainMenu.hidden = true;
}

function prepAddEndeavorForm() {
  const form = addEndeavorScr.querySelector('form');
  const [addBtn, cancelBtn] = form.querySelectorAll('button');

  // form.onsubmit = addEndeavor;
  cancelBtn.onclick = showMainMenu;
}

function prepAddActivityForm() {
  const form = addActivityScr.querySelector('form');
  const [addBtn, cancelBtn] = form.querySelectorAll('button');

  // form.onsubmit = addActivity;
  cancelBtn.onclick = showMainMenu;
}

function showMainMenu() {
  addEndeavorScr.hidden = true;
  addActivityScr.hidden = true;
  mainMenu.hidden = false;
}
