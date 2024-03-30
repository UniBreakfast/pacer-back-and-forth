main.onclick = handleGoTo;

function handleGoTo(e) {
  if (!e.target.matches('button')) return;

  const btn = e.target;

  if (!btn.value) return;

  const value = btn.value;

  if (value === 'back') return goBack();
  
  const scr = main.children[value];

  if (!scr) return;

  const { id, key } = btn.dataset;

  if (!id || !key) return goTo(scr);

  const getData = () => {
    const items = data[key];

    return items.find((item) => item.id === id);
  }

  goTo(scr, getData);
}

function handleAddEndeavor(e) {
  e.preventDefault();

  
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
