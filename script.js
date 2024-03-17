const scrVisitHistory = [];
const endeavors = [];
const activities = [];

const screens = {
  'main-menu': {
    prep() {
      const buttonsContainer = document.querySelector('#main-menu .buttons');

      buttonsContainer.onclick = goTo;
    },

    update() {
      const [addEndeavorBtn, endeavorsBtn, addActivityBtn, activitiesBtn] = document.querySelectorAll('#main-menu button');
      const noEndeavors = !endeavors.length;
      const noActivities = !activities.length;
      
      addEndeavorBtn.hidden = !noEndeavors;
      endeavorsBtn.hidden = noEndeavors;
      addActivityBtn.hidden = !noActivities;
      activitiesBtn.hidden = noActivities;
    },
  },

  'add-endeavor': {
    prep() {
      const form = document.getElementById('add-endeavor-form');

      form.onsubmit = handleAddEndeavor;
    },

    update() {
      const form = document.getElementById('add-endeavor-form');

      form.reset();
    },
  },

  'endeavors': {
    prep() {
      const screen = document.getElementById('endeavors-scr');
      const addBtn = screen.querySelector('.add');
      const tbody = screen.querySelector('tbody');
      
      addBtn.onclick = goTo;
      tbody.onclick = handleDetails;
    },
    
    update() {
      
    },
  },
};

goTo('main-menu');

onclick = handleBackButtons;

function handleBackButtons(e) {
  if (e.target.matches('.back')) goBack();
}

function handleAddEndeavor(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const endeavor = Object.fromEntries(formData);

  endeavors.push(endeavor);

  goTo('endeavors');
}

function goTo(scrNameOrEvent) {
  const [main] = document.getElementsByTagName('main');
  const scrName = scrNameOrEvent.target?.value || scrNameOrEvent;
  const scr = document.getElementById(scrName) || document.getElementById(scrName + '-scr');

  if (scr) {
    const curScr = main.querySelector('.screen:not([hidden])');
    const prep = screens[scrName]?.prep;
    const update = screens[scrName]?.update;

    if (curScr) {
      curScr.hidden = true;
      scrVisitHistory.push(curScr);
    }

    scr.hidden = false;

    if (prep) {
      prep();
      delete screens[scrName].prep;
    }

    update?.();
  }
}

function goBack() {
  const lastScr = scrVisitHistory.pop();

  if (lastScr) goTo(lastScr.id);
}
