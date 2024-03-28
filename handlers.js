main.onclick = handleGoTo;

function handleGoTo(e) {
  if (!e.target.matches('button')) return;

  const btn = e.target;

  if (!btn.value) return;

  const value = btn.value;
  const scr = main[value];

  if (!scr) return;

  const { id, key } = btn.dataset;

  if (!id || !key) return goTo(scr);

  const getData = () => {
    const items = data[key];

    return items.find((item) => item.id === id);
  }

  goTo(scr, getData);
}
