const history = [];

let activeScr = null;
let lastGetData = null;

function goTo(scr, getData) {
  const i = history.findIndex(([s]) => s === scr);

  if (i >= 0) history.splice(i);

  if (activeScr) {
    const remember = this != goBack && i < 0;
    
    putActiveScrOut(remember);
  }

  activeScr = scr;

  scr.hidden = false;

  const kit = screenKits[scr.id];
  const args = [scr];

  if (!kit) return;

  if (getData) args.push(getData());

  lastGetData = getData || null;

  return getReady(kit, args);
}

function goBack() {
  if (!history.length) return;

  const record = history.pop();
  
  goTo.call(goBack, ...record);
}

function putActiveScrOut(remember) {
  if (remember) {
    const record = [activeScr];
  
    if (lastGetData) record.push(lastGetData);
  
    history.push(record);
  }

  activeScr.hidden = true;
}

function getReady(kit, args) {
  if (kit.prep) {
    kit.prep(...args);
    delete kit.prep;
  }

  return kit.update(...args);
}
