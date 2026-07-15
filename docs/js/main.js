const $ = (selector) => document.querySelector(selector);
const project = window.PROJECT;

function setText(selector, value) {
  const el = $(selector);
  if (el) el.textContent = value || "";
}

function setMeta(name, value, property = false) {
  if (!value) return;
  const attr = property ? "property" : "name";
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", value);
}

function renderAuthors() {
  const container = $("#authors");
  if (!container) return;
  container.innerHTML = project.authors.map((author) => {
    const suffix = author.equal ? "*" : "";
    const mark = author.mark ? `<sup>${author.mark}</sup>` : "";
    const label = `${author.name}${mark}${suffix}`;
    return author.url ? `<a href="${author.url}" target="_blank" rel="noopener">${label}</a>` : label;
  }).join(", ");
  if (project.authors.some((a) => a.equal)) container.innerHTML += "<br><span class='affiliation'>* Equal contribution</span>";
}

function renderAffiliations() {
  const el = $("#affiliation");
  if (!el) return;
  const affiliations = project.affiliations || [];
  if (affiliations.length) {
    el.innerHTML = affiliations.map((item) =>
      `<span><sup>${item.mark}</sup> ${item.text}</span>`
    ).join("<br>");
    return;
  }
  el.textContent = project.affiliation || "";
}

function renderLinks() {
  const linkRow = $("#links");
  if (!linkRow) return;
  const links = (project.links || []).filter((link) => link.url || link.comingSoon);
  linkRow.innerHTML = links.map((link) => {
    if (link.url) {
      return `<a class="button ${link.primary ? "primary" : ""}" href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`;
    }
    return `<span class="button button-soon ${link.primary ? "primary" : ""}" aria-disabled="true">${link.label} — Coming soon</span>`;
  }).join("");
}

function renderHero() {
  const hero = project.hero || {};
  const container = $("#hero-media");
  if (!container) return;
  if (!hero.src) {
    container.innerHTML = "";
    return;
  }
  container.innerHTML = hero.type === "video"
    ? `<video controls playsinline preload="metadata" poster="${hero.poster || ""}"><source src="${hero.src}">Your browser does not support the video tag.</video>`
    : `<img src="${hero.src}" alt="${hero.alt || project.title}">`;
  setText("#hero-caption", hero.caption || "");
}

function renderMethod() {
  const el = $("#method-content");
  const method = project.method;
  if (!el || !method?.src) return;
  el.innerHTML = `
    <article class="figure-card">
      <img src="${method.src}" alt="${method.alt || method.title || "Method"}">
      <p class="figure-caption">${method.caption || ""}</p>
    </article>
  `;
}

function renderResults() {
  const el = $("#results-gallery");
  if (!el) return;
  const items = project.results || project.gallery || [];
  el.innerHTML = items.map((item) => `
    <article class="gallery-card">
      <img src="${item.src}" alt="${item.alt || item.title}">
      <h3>${item.title}</h3>
      <p>${item.caption}</p>
    </article>
  `).join("");
}

function renderAbstract() {
  const el = $("#abstract-content");
  if (!el) return;
  el.innerHTML = (project.abstract || []).map((p) => `<p>${p}</p>`).join("");
}

function renderHighlights() {
  const el = $("#highlight-grid");
  if (!el) return;
  el.innerHTML = (project.highlights || []).map((item) => `
    <article class="highlight-card">
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>
  `).join("");
}

function renderFindings() {
  const el = $("#findings-list");
  if (!el) return;
  el.innerHTML = (project.findings || []).map((item) => `<li>${item}</li>`).join("");
}

function initTheme() {
  const toggle = $("#theme-toggle");
  if (!toggle) return;
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = saved || (prefersDark ? "dark" : "light");
  toggle.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
}

function renderPersonalPage() {
  const page = project.personalPage;
  const headerLink = $("#personal-page");
  const footerEl = $("#footer-personal");
  if (!page?.url) {
    if (headerLink) headerLink.style.display = "none";
    if (footerEl) footerEl.textContent = "";
    return;
  }
  if (headerLink) {
    headerLink.href = page.url;
    headerLink.textContent = page.label || "← Home";
  }
  if (footerEl) {
    footerEl.innerHTML = `<a class="footer-home-link" href="${page.url}">${page.footerLabel || page.label || "← Back to personal webpage"}</a>`;
  }
}

function initCopyBibtex() {
  const btn = $("#copy-bibtex");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(project.bibtex || "");
    btn.textContent = "Copied";
    setTimeout(() => (btn.textContent = "Copy BibTeX"), 1300);
  });
}

function render() {
  document.title = project.title;
  setMeta("description", project.seo?.description || project.tldr);
  setMeta("og:title", project.title, true);
  setMeta("og:description", project.seo?.description || project.tldr, true);
  setMeta("og:image", project.seo?.image, true);

  setText("#venue", project.venue);
  setText("#title", project.title);
  setText("#subtitle", project.subtitle);
  renderAffiliations();
  setText("#tldr", project.tldr ? `TL;DR: ${project.tldr}` : "");
  setText("#bibtex", project.bibtex);
  setText("#acknowledgements-text", project.acknowledgements);
  setText("#contact", project.contact ? `Questions? Contact: ${project.contact}` : "");

  renderAuthors();
  renderLinks();
  renderHero();
  renderAbstract();
  renderMethod();
  renderResults();
  renderHighlights();
  renderFindings();
  renderPersonalPage();
  initTheme();
  initCopyBibtex();
}

render();
