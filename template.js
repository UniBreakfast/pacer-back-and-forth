function fill(template) {
  return data => {
    let html = template.innerHTML;

    html = html.replace(
      /{(\w+)}/g,
      (placeholder, key) => data[key] ?? placeholder
    );

    return html;
  };
}
