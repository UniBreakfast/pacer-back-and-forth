main.onclick = handleGoTo;

main.addEventListener('submit', handleSubmit, true);

function handleGoTo(e) {
  const selector = 'button[value]:not([type="submit"])';

  if (!e.target.matches(selector)) return;

  const btn = e.target;
  const { value } = btn;

  if (value == 'back') return goBack();

  const scr = screens[value];

  if (!scr) return;

  const { id, key } = btn.dataset;

  if (!id || !key) return goTo(scr);

  const getData = () => {
    const items = data[key];

    return items.find((item) => item.id == id);
  }

  goTo(scr, getData);
}

function handleSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const fields = form.querySelectorAll('input, textarea');

  fields.forEach(f => f.value = f.value.trim());
}

function handleAddEndeavor(e) {
  e.preventDefault();

  const form = e.target;
  const endeavor = Object.fromEntries(new FormData(form));

  addEndeavor(endeavor);

  // skip putting into history first time
  goTo.call(endeavors.length == 1 && goBack, screens["endeavors"]);
}

function handleUpdateEndeavor(e) {
  e.preventDefault();

  const form = e.target;
  const endeavor = Object.fromEntries(new FormData(form));
  
  updateEndeavor(endeavor);

  goTo(screens["endeavors"]);
}

function handleRemoveEndeavor(e) {
  if (!e.target.matches('[value="remove"]')) return;
  
  const btn = e.target;
  const scr = btn.closest('.screen');
  const id = scr.querySelector('[name="id"]').value;

  removeEndeavor(id);

  goTo.call(goBack, screens["endeavors"]);
}

function handleAddActivity(e) {
  e.preventDefault();

  const form = e.target;
  const activity = Object.fromEntries(new FormData(form));

  addActivity(activity);

  // skip putting into history first time
  goTo.call(activities.length == 1 && goBack, screens["activities"]);
}

function handleUpdateActivity(e) {
  e.preventDefault();

  const form = e.target;
  const activity = Object.fromEntries(new FormData(form));

  updateActivity(activity);

  goTo(screens["activities"]);
}

function handleRemoveActivity(e) {
  if (!e.target.matches('[value="remove"]')) return;
  
  const btn = e.target;
  const scr = btn.closest('.screen');
  const id = scr.querySelector('[name="id"]').value;

  removeActivity(id);

  goTo.call(goBack, screens["activities"]);
}

function handleNewQuestSelect(e) {
  const select = e.target;
  const form = select.closest('form');
  const {activity, duration, cost, start, end} = form;
  const id = activity.value;
  const act = activities.find(act => act.id == id);

  duration.disabled = false;
  start.disabled = select == activity;

  switch (select) {
    case activity: {
      const length = confidence / act.difficulty;
      const options = Array.from({length}).map((_, i) => new Option(i + 1));
      const value = duration.value;

      duration.replaceChildren(duration.firstElementChild, ...options);
      duration.value = value;
      duration.value ||= '';
    }
    case duration: {
      const today = new Date();
      const tomorrow = new Date(Date.now() + 86400000);
      const options = [
        new Option(dateToLabel(today), today),
        new Option(dateToLabel(tomorrow), tomorrow),
      ];
      const value = start.value;
      
      cost.value = duration.value && act.difficulty * duration.value;

      start.replaceChildren(start.firstElementChild, ...options);
      start.value = value;
      start.value ||= '';
    }
    case start: {
      const startDate = new Date(start.value);
      const endDate = new Date(+startDate + 86400000 * (duration.value - 1));

      end.value = start.value && dateToLabel(endDate);
    }
  }
}

function handleAddQuest(e) {
  e.preventDefault();

  const form = e.target;

  form.cost.disabled = false;
  form.end.disabled = false;
  
  const quest = Object.fromEntries(new FormData(form));

  form.cost.disabled = true;
  form.end.disabled = true;

  addQuest(quest);

  goTo.call(quests.length == 1 && goBack, screens["quests"]);
}

function handleEstimateConfidence(e) {
  e.preventDefault();

  const form = e.target;
  const value = form.confidence.value;
  
  setConfidence(value);

  screenKits['main-menu'].update(screens['main-menu']);
}

function handleUpdateConfidence(e) {
  e.preventDefault();


}
