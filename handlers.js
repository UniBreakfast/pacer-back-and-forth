main.onclick = handleGoTo;
main.onsubmit = handleSubmit;

function handleGoTo(e) {
  const selector = 'button[value]:not([type="submit"])';

  if (!e.target.matches(selector)) return;

  const btn = e.target;
  const {value} = btn;

  if (value == 'back') return goBack();

  const scr = screens[value];

  if (!scr) return;

  const { id, key } = btn.dataset;

  if (!id || !key) return goTo(scr);

  const getData = () => {
    const items = data[key];

    return items.find((item) => item.id === id);
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

  goTo(screens["endeavors"]);
}

function handleUpdateEndeavor(e) {
  e.preventDefault();


}

function handleAddActivity(e) {
  e.preventDefault();


}

function handleUpdateActivity(e) {
  e.preventDefault();


}

function handleAddQuest(e) {
  e.preventDefault();


}

function handleUpdateConfidence(e) {
  e.preventDefault();


}
