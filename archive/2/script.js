let confidence = 0;
const endeavors = [];
const activities = [];
const data = { endeavors, activities };

const [main] = document.getElementsByTagName('main');

const screensKits = {
  'menu': {
    prep(scr) {
      const form = scr.querySelector('form');

      form.onsubmit = handleStart;
    },

    update(scr) {
      const started = confidence > 0;
      const output = scr.querySelector('output');
      const select = scr.querySelector('select');
      const startBtn = scr.querySelector('button');
      const [endeavorsBtn, addEndeavorBtn, activitiesBtn, addActivityBtn]
        = scr.querySelectorAll('.buttons>*');
      const hasEndeavors = endeavors.length > 0;
      const hasActivities = activities.length > 0;

      output.value = confidence;

      select.hidden = started;
      startBtn.hidden = started;
      output.hidden = !started;

      endeavorsBtn.hidden = !hasEndeavors;
      addEndeavorBtn.hidden = hasEndeavors;
      activitiesBtn.hidden = !hasActivities;
      addActivityBtn.hidden = hasActivities;
    },
  },

  'endeavors': {
    prep(scr) {
      this.template = scr.querySelector('template');
      this.template.remove();
    },

    update(scr) {
      const tbody = scr.querySelector('tbody');
      const html = endeavors.map(fill(this.template)).join('');

      tbody.innerHTML = html;
    },
  },

  'add-endeavor': {
    prep(scr) {
      const form = scr.querySelector('form');
      const addBtn = form.querySelector('button');

      addBtn.onclick = trimFields;
      form.onsubmit = handleAddEndeavor;
    },

    update(scr) {
      const form = scr.querySelector('form');

      form.reset();
    },
  },

  'endeavor': {
    prep(scr) {
      const removeBtn = scr.querySelector('button[value="remove"]');
      const form = scr.querySelector('form');

      this.template = scr.querySelector('template');
      this.template.remove();

      removeBtn.onclick = handleRemoveEndeavor;
      form.onsubmit = handleUpdateEndeavor;
    },

    update(scr, endeavor) {
      const form = scr.querySelector('form');
      const html = fill(this.template)(endeavor);

      form.innerHTML = html;
    },
  },

  'activities': {
    prep(scr) {
      this.template = scr.querySelector('template');
      this.template.remove();
    },

    update(scr) {
      const tbody = scr.querySelector('tbody');
      const html = activities.map(fill(this.template)).join('');

      tbody.innerHTML = html;
    },
  },

  'add-activity': {
    prep(scr) {
      const form = scr.querySelector('form');
      const addBtn = form.querySelector('button');

      addBtn.onclick = trimFields;
      form.onsubmit = handleAddActivity;
    },

    update(scr) {
      const form = scr.querySelector('form');

      form.reset();
    },
  },

  'activity': {
    prep(scr) {
      const removeBtn = scr.querySelector('button[value="remove"]');
      const form = scr.querySelector('form');

      this.template = scr.querySelector('template');
      this.template.remove();

      removeBtn.onclick = handleRemoveActivity;
      form.onsubmit = handleUpdateActivity;
    },

    update(scr, activity) {
      const form = scr.querySelector('form');
      const html = fill(this.template)(activity);

      form.innerHTML = html;
    },
  },
};

main.onclick = handleGoTo;

goTo('menu');
// goTo('add-activity');

function goTo(scr, options) {
  goTo.history ||= [];
  goTo.lastOptions;

  const scrName = scr.id || scr;
  const nextScr = scr.id ? scr
    : document.getElementById(scrName);

  if (nextScr) {
    const curScr = main.querySelector('.screen:not([hidden])');
    const screenKit = screensKits[scrName];

    if (curScr) {
      curScr.hidden = true;

      if (this != goBack) {
        const index = goTo.history.findIndex(([screen]) => screen === curScr);

        if (index >= 0) goTo.history.splice(index);

        const setup = [curScr, goTo.lastOptions].filter(Boolean);

        goTo.history.push(setup);

      } else if (nextScr == curScr) {
        return goBack();
      }
    }

    goTo.lastOptions = options;

    if (screenKit.prep) {
      screenKit.prep(nextScr);

      delete screenKit.prep;
    }

    const args = [];

    if (options) {
      if (options.items && options.id) {
        const item = options.items.find(({ id }) => id === options.id);

        args.push(item);
      }
    }

    screenKit.update?.(nextScr, ...args);

    nextScr.hidden = false;
  }
}

function goBack() {
  let [prevScr, options] = goTo.history.pop() || [];

  if (prevScr) {
    try {
      goTo.call(goBack, prevScr, options);
    } catch (err) {
      console.warn(err);
      goBack();
    }
  }
}

function genId() {
  genId.next ||= 1;
  return String(genId.next++);
}

function trimFields(e) {
  const form = e.target.closest('form');
  const fields = form.querySelectorAll('input, textarea');

  for (const field of fields) {
    field.value = field.value.trim();
  }
}

function fill(template) {
  return function (data) {
    let html = template.innerHTML
    const re = /( value="(\w+)") selected="\{(\w+)\}"/g;

    html = html.replace(re, (_, attr, value, key) => {
      return attr + (value == data[key] ? ' selected' : '');
    });

    html = html.replace(
      /{(\w+)}/g,
      (placeholder, key) => data[key] ?? placeholder
    );

    return html;
  }
}

function addEndeavor(endeavor) {
  const { title, description, type } = endeavor;
  const id = genId();
  const newEndeavor = { id, title, description, type };

  endeavors.unshift(newEndeavor);
}

function addActivity(activity) {
  const { title, amount, unit, difficulty } = activity;
  const id = genId();
  const newActivity = { id, title, amount, unit, difficulty };

  activities.unshift(newActivity);
}

function updateEndeavor(endeavor) {
  const index = endeavors.findIndex(({ id }) => id == endeavor.id);

  endeavors.splice(index, 1);
  endeavors.unshift(endeavor);
}

function updateActivity(activity) {
  const index = activities.findIndex(({ id }) => id == activity.id);

  activities.splice(index, 1);
  activities.unshift(activity);
}

function handleGoTo(e) {
  if (e.target.tagName !== 'BUTTON') return;

  const btn = e.target;
  const scrName = btn.value;

  if (!scrName) return;

  if (scrName === 'back') return goBack();

  if (btn.dataset.key && btn.dataset.id) {
    const items = data[btn.dataset.key];
    const id = btn.dataset.id;

    goTo(scrName, { items, id });
  } else {
    goTo(scrName);
  }
}

function handleStart(e) {
  e.preventDefault();

  const form = e.target;
  const scr = form.closest('.screen');
  const select = form.querySelector('select');

  confidence = Number(select.value);

  screensKits.menu.update(scr);
}

function handleAddEndeavor(e) {
  e.preventDefault();

  const form = e.target;
  const endeavor = Object.fromEntries(new FormData(form));

  addEndeavor(endeavor);

  goTo.call(goBack, 'endeavors');
}

function handleAddActivity(e) {
  e.preventDefault();

  const form = e.target;
  const activity = Object.fromEntries(new FormData(form));

  addActivity(activity);

  goTo.call(goBack, 'activities');
}

function handleRemoveEndeavor(e) {
  const scr = e.target.closest('.screen');
  const form = scr.querySelector('form');
  const id = form.id.value;
  const index = endeavors.findIndex(en => en.id == id);

  endeavors.splice(index, 1);

  goTo.call(goBack, 'endeavors');
}

function handleRemoveActivity(e) {
  const scr = e.target.closest('.screen');
  const form = scr.querySelector('form');
  const id = form.id.value;
  const index = activities.findIndex(a => a.id == id);

  activities.splice(index, 1);

  goTo.call(goBack, 'activities');
}

function handleUpdateEndeavor(e) {
  e.preventDefault();

  const form = e.target;
  const endeavor = Object.fromEntries(new FormData(form));

  updateEndeavor(endeavor);

  goTo('endeavors');
}

function handleUpdateActivity(e) {
  e.preventDefault();

  const form = e.target;
  const activity = Object.fromEntries(new FormData(form));

  updateActivity(activity);

  goTo('activities');
}
