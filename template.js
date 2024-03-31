function fill(template) {
  return data => {
    let html = template.innerHTML;

    const re = /(\w+)="\{if (\w+)\((\w+)\)\}"/g;

    html = html.replace(re, (_, value, key, arg) => {
      if (typeof data[key] == 'function') {
        const fn = data[key];

        return fn(arg) ? value : '';
      }

      return arg == data[key] ? value : '';
    });
    
    html = html.replace(
      /\{(\w+)\}/g,
      (placeholder, key) => data[key] ?? placeholder
    );

    return html;
  };
}
