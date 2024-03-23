let confidence = 0;
const endeavors = [];
const activities = [];

const [main] = document.getElementsByTagName('main');

const screensKits = {
  'menu': {
    prep(scr) {
      const form = scr.querySelector('form');
      const select = scr.querySelector('select');
      const startBtn = scr.querySelector('button');

      select.onchange = () => startBtn.disabled = false;
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
    prep() { },

    update() { },
  },

  'add-endeavor': {
    prep() { },

    update() { },
  },

  'endeavor': {
    prep() { },

    update() { },
  },

  'activities': {
    prep() { },

    update() { },
  },

  'add-activity': {
    prep() { },

    update() { },
  },

  'activity': {
    prep() { },

    update() { },
  },
};

main.onclick = handleGoTo;

goTo('menu');

function goTo(scr) {
  goTo.history ||= [];
  const scrName = scr.id || scr;
  const nextScr = scr.id ? scr
    : document.getElementById(scrName);

  if (nextScr) {
    const curScr = main.querySelector('.screen:not([hidden])');
    const screenKit = screensKits[scrName];

    if (curScr) {
      curScr.hidden = true;

      if (this != goBack) goTo.history.push(curScr);
    }

    if (screenKit.prep) {
      screenKit.prep(nextScr);

      delete screenKit.prep;
    }

    screenKit.update?.(nextScr);

    nextScr.hidden = false;
  }
}

function goBack() {
  const prevScr = goTo.history.pop();

  if (prevScr) goTo.call(goBack, prevScr);
}

function handleGoTo(e) {
  if (e.target.tagName !== 'BUTTON') return;

  const btn = e.target;
  const scrName = btn.value;

  if (scrName === 'back') return goBack();

  if (scrName) goTo(scrName);
}

function handleStart(e) {
  e.preventDefault();

  const form = e.target;
  const scr = form.closest('.screen');
  const select = form.querySelector('select');

  confidence = Number(select.value);

  screensKits.menu.update(scr);
}
