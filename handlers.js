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

function handleAddQuest(e) {
  e.preventDefault();


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
