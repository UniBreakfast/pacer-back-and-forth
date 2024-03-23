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
      const cancelBtn = form.querySelector('[type="button"]');

      form.onsubmit = handleAddEndeavor;
      cancelBtn.onclick = goTo;
    },

    update() {
      const form = document.getElementById('add-endeavor-form');

      form.reset();
    },
  },

  'endeavors': {
    prep() {
      const scr = document.getElementById('endeavors-scr');
      const addBtn = scr.querySelector('.add');
      const tbody = scr.querySelector('tbody');
      const template = tbody.querySelector('template');

      addBtn.onclick = goTo;
      tbody.onclick = handleDetails('endeavor');
      template.remove();

      this.template = template;
    },

    update() {
      const tbody = document.querySelector('#endeavors-scr tbody');
      const rows = endeavors.map(({ id, title, type }) => {
        const row = this.template.content.firstElementChild.cloneNode(true);
        const [typeCell, titleCell] = row.cells;

        row.dataset.id = id;
        typeCell.textContent = type;
        titleCell.textContent = title;

        return row;
      });

      tbody.replaceChildren(...rows);
    },
  },

  'endeavor': {
    prep () {
      const form = document.getElementById('endeavor-form');
      
      form.onsubmit = handleUpdateEndeavor;
    },

    update(id) {
      const form = document.getElementById('endeavor-form');
      const endeavor = endeavors.find(end => end.id == id);
      const { title, description, type } = endeavor;

      form.id.setAttribute('value', id);
      form.title.setAttribute('value', title);
      form.description.textContent = description;
      form.querySelector(`[value="${type}"]`).setAttribute('selected', '');
    },
  },

  'add-activity': {
    prep() {
      const form = document.getElementById('add-activity-form');
      const cancelBtn = form.querySelector('[type="button"]');

      form.onsubmit = handleAddActivity;
      cancelBtn.onclick = goTo;
    },

    update() {
      const form = document.getElementById('add-activity-form');

      form.reset();
    },
  },

  'activities': {
    prep() {
      const scr = document.getElementById('activities-scr');
      const addBtn = scr.querySelector('.add');
      const tbody = scr.querySelector('tbody');
      const template = tbody.querySelector('template');

      addBtn.onclick = goTo;
      tbody.onclick = handleDetails('activity');
      template.remove();

      this.template = template;
    },

    update() {
      const tbody = document.querySelector('#activities-scr tbody');
      const rows = activities.map(({ id, title, amount, unit }) => {
        const row = this.template.content.firstElementChild.cloneNode(true);
        const [titleCell, amountCell] = row.cells;

        row.dataset.id = id;
        titleCell.textContent = title;
        amountCell.textContent = `${amount} ${unit}`;

        return row;
      });

      tbody.replaceChildren(...rows);
    },
  },

  'activity': {
    prep () {
      const form = document.getElementById('activity-form');
      
      form.onsubmit = handleUpdateActivity;
    },

    update(id) {
      const form = document.getElementById('activity-form');
      const activity = activities.find(act => act.id == id);
      const { title, amount, unit } = activity;

      form.id.setAttribute('value', id);
      form.title.setAttribute('value', title);
      form.amount.setAttribute('value', amount);
      form.querySelector(`[value="${unit}"]`).setAttribute('selected', '');
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

  addEndeavor(endeavor);

  goTo('endeavors');
}

function handleAddActivity(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const activity = Object.fromEntries(formData);

  addActivity(activity);

  goTo('activities');
}

function handleDetails(scrName) {
  return function (e) {
    const row = e.target.closest('tr');
    const id = row.dataset.id;

    goTo(scrName, id);
  }
}

function handleUpdateEndeavor(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const endeavor = Object.fromEntries(formData);

  updateEndeavor(endeavor);

  goTo('endeavors');
}

function handleUpdateActivity(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const activity = Object.fromEntries(formData);

  updateActivity(activity);

  goTo('activities');
}

function addEndeavor(endeavor) {
  const { title, description, type } = endeavor;
  const id = genId();
  const newEndeavor = { id, title, description, type };

  endeavors.unshift(newEndeavor);
}

function updateEndeavor(endeavor) {
  const { id } = endeavor;
  const i = endeavors.findIndex(end => end.id == id);

  endeavors.splice(i, 1);
  endeavors.unshift(endeavor);
}

function addActivity(activity) {
  const { title, amount, unit } = activity;
  const id = genId();
  const newActivity = { id, title, amount, unit };

  activities.unshift(newActivity);
}

function updateActivity(activity) {
  const { id } = activity;
  const i = activities.findIndex(act => act.id == id);

  activities.splice(i, 1);
  activities.unshift(activity);
}

function genId() {
  genId.next ||= 1;

  return genId.next++;
}

function goTo(scrNameOrEvent, ...args) {
  goTo.history ||= [];
  const [main] = document.getElementsByTagName('main');
  const scrName = scrNameOrEvent.target?.value || scrNameOrEvent;
  const scr = document.getElementById(scrName) || document.getElementById(scrName + '-scr');

  if (scr) {
    const curScr = main.querySelector('.screen:not([hidden])');
    const prep = screens[scrName]?.prep;
    const update = screens[scrName]?.update;

    if (curScr) {
      curScr.hidden = true;
      if (this != goBack) {
        const i = goTo.history.indexOf(curScr);

        if (i != -1) goTo.history.length = i + 1;
        else goTo.history.push(curScr);
      }
    }

    scr.hidden = false;

    if (prep) {
      prep.call(screens[scrName]);
      delete screens[scrName].prep;
    }

    update?.call(screens[scrName], ...args);
  }
}

function goBack() {
  const lastScr = goTo.history.pop();

  if (lastScr) goTo.call(goBack, lastScr.id);
}
