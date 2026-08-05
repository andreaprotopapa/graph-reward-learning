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

const LINK_ICONS = {
  arxiv: `<svg class="button-icon button-icon-arxiv" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M3.8423 0a1.0037 1.0037 0 0 0-.922.6078c-.1536.3687-.0438.6275.2938 1.1113l6.9185 8.3597-1.0223 1.1058a1.0393 1.0393 0 0 0 .003 1.4229l1.2292 1.3135-5.4391 6.4444c-.2803.299-.4538.823-.2971 1.1986a1.0253 1.0253 0 0 0 .9585.635.9133.9133 0 0 0 .6891-.3405l5.783-6.126 7.4902 8.0051a.8527.8527 0 0 0 .6835.2597.9575.9575 0 0 0 .8777-.6138c.1577-.377-.017-.7502-.306-1.1407l-7.0518-8.3418 1.0632-1.13a.9626.9626 0 0 0 .0089-1.3165L4.6336.4639s-.3733-.4535-.768-.463zm0 .272h.0166c.2179.0052.4874.2715.5644.3639l.005.006.0052.0055 10.169 10.9905a.6915.6915 0 0 1-.0072.945l-1.0666 1.133-1.4982-1.7724-8.5994-10.39c-.3286-.472-.352-.6183-.2592-.841a.7307.7307 0 0 1 .6704-.4401Zm14.341 1.5701a.877.877 0 0 0-.6554.2418l-5.6962 6.1584 1.6944 1.8319 5.3089-6.5138c.3251-.4335.479-.6603.3247-1.0292a1.1205 1.1205 0 0 0-.9763-.689zm-7.6557 12.2823 1.3186 1.4135-5.7864 6.1295a.6494.6494 0 0 1-.4959.26.7516.7516 0 0 1-.706-.4669c-.1119-.2682.0359-.6864.2442-.9083l.0051-.0055.0047-.0055z"/></svg>`
};

function renderLinks() {
  const linkRow = $("#links");
  if (!linkRow) return;
  const links = (project.links || []).filter((link) => link.url || link.comingSoon);
  linkRow.innerHTML = links.map((link) => {
    const icon = link.icon ? LINK_ICONS[link.icon] : "";
    if (link.icon && !icon) {
      console.warn(`Unknown link icon: ${link.icon}`);
    }
    const classes = [
      "button",
      link.primary ? "primary" : "",
      link.icon === "arxiv" ? "button-arxiv" : ""
    ].filter(Boolean).join(" ");
    const label = `${icon || ""}${link.label}`;
    if (link.url) {
      return `<a class="${classes}" href="${link.url}" target="_blank" rel="noopener">${label}</a>`;
    }
    return `<span class="${classes} button-soon" aria-disabled="true">${label} — Coming soon</span>`;
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
  if (!el) {
    console.warn("Method container #method-content not found");
    return;
  }
  if (!method?.src) {
    console.warn("project.method.src is missing");
    return;
  }
  const mobileSrcs = method.mobileSrcs;
  if (!Array.isArray(mobileSrcs) || mobileSrcs.length === 0) {
    console.warn("project.method.mobileSrcs is missing or empty");
    return;
  }
  const alt = method.alt || method.title || "Method";
  const mobileImgs = mobileSrcs.map((src, i) =>
    `<img src="${src}" alt="${alt} (part ${i + 1})">`
  ).join("");
  el.innerHTML = `
    <article class="figure-card">
      <img class="method-figure-desktop" src="${method.src}" alt="${alt}">
      <div class="method-figure-mobile">${mobileImgs}</div>
      <p class="figure-caption">${method.caption || ""}</p>
    </article>
  `;
}

function validateGifs(item) {
  if (!Array.isArray(item.gifs) || item.gifs.length === 0) {
    console.warn(`Result "${item.title}" is missing gifs`);
    return false;
  }
  const missingGif = item.gifs.find((gif) => !gif?.src);
  if (missingGif) {
    console.warn(`Result "${item.title}" has a gif entry without src`);
    return false;
  }
  return true;
}

function renderResultMedia(item) {
  if (item.plot || item.gifs) {
    if (!validateGifs(item)) return "";

    if (item.gifsLayout === "row") {
      if (item.plot) {
        console.warn(`Result "${item.title}" uses gifsLayout "row" and should not include plot`);
        return "";
      }
      const missingLabel = item.gifs.find((gif) => !gif.label);
      if (missingLabel) {
        console.warn(`Result "${item.title}" has a gif entry without label`);
        return "";
      }
      const tabs = item.gifs.map((gif, i) => `
        <button
          type="button"
          class="result-gif-tab"
          role="tab"
          aria-selected="${i === 0 ? "true" : "false"}"
          data-gif-index="${i}"
        >${gif.label}</button>
      `).join("");
      const items = item.gifs.map((gif, i) => `
        <figure class="result-gif-item${i === 0 ? " is-active" : ""}" data-gif-index="${i}">
          <img src="${gif.src}" alt="${gif.alt || gif.label || item.title}">
        </figure>
      `).join("");
      return `
        <div class="result-gif-row">
          <div class="result-gif-tabs" role="tablist" aria-label="${item.title} tasks">${tabs}</div>
          <div class="result-gif-row-items">${items}</div>
        </div>
      `;
    }

    if (!item.plot?.src) {
      console.warn(`Result "${item.title}" is missing plot.src`);
      return "";
    }
    const gifImgs = item.gifs.map((gif) =>
      `<img src="${gif.src}" alt="${gif.alt || item.title}">`
    ).join("");
    const gifsLayout = item.gifsLayout || "stack";
    if (gifsLayout !== "stack" && gifsLayout !== "grid") {
      console.warn(`Result "${item.title}" has unknown gifsLayout: ${gifsLayout}`);
      return "";
    }
    const gifsClass = gifsLayout === "grid" ? "result-gifs result-gifs-grid" : "result-gifs";
    return `
      <div class="result-panels">
        <div class="result-plot">
          <img src="${item.plot.src}" alt="${item.plot.alt || item.title}">
        </div>
        <div class="${gifsClass}">${gifImgs}</div>
      </div>
    `;
  }
  if (!item.src) {
    console.warn(`Result "${item.title}" is missing src`);
    return "";
  }
  return `<img src="${item.src}" alt="${item.alt || item.title}">`;
}

function renderResults() {
  const el = $("#results-gallery");
  if (!el) return;
  const items = project.results || project.gallery || [];
  el.innerHTML = items.map((item) => `
    <article class="gallery-card">
      ${renderResultMedia(item)}
      <h3>${item.title}</h3>
      <p>${item.caption}</p>
    </article>
  `).join("");
  initResultGifTabs();
}

function initResultGifTabs() {
  document.querySelectorAll(".result-gif-row").forEach((row) => {
    const tabs = [...row.querySelectorAll(".result-gif-tab")];
    const items = [...row.querySelectorAll(".result-gif-item")];
    if (!tabs.length || !items.length) {
      console.warn("Result gif row is missing tabs or items");
      return;
    }
    if (tabs.length !== items.length) {
      console.warn("Result gif row tab count does not match item count");
      return;
    }
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const index = tab.dataset.gifIndex;
        tabs.forEach((t) => t.setAttribute("aria-selected", t === tab ? "true" : "false"));
        items.forEach((item) => item.classList.toggle("is-active", item.dataset.gifIndex === index));
      });
    });
  });
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

function initBackToTop() {
  const btn = $("#back-to-top");
  if (!btn) {
    console.warn("Back-to-top button #back-to-top not found");
    return;
  }
  btn.hidden = false;
  const toggle = () => {
    btn.classList.toggle("is-visible", window.scrollY > 400);
  };
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();
}

function render() {
  document.title = project.title;
  setMeta("description", project.seo?.description || project.tldr);
  setMeta("og:title", project.title, true);
  setMeta("og:description", project.seo?.description || project.tldr, true);
  setMeta("og:image", project.seo?.image, true);

  setText("#venue", project.venue);
  const titleEl = $("#title");
  if (!titleEl) {
    console.warn("Title element #title not found");
  } else if (!project.title.includes("Long-Horizon")) {
    console.warn('project.title does not contain "Long-Horizon" for the desktop line break');
    titleEl.textContent = project.title;
  } else {
    titleEl.innerHTML = project.title.replace(
      "Long-Horizon",
      '<br class="title-break-desktop">Long-Horizon'
    );
  }
  setText("#subtitle", project.subtitle);
  renderAffiliations();
  const tldrEl = $("#tldr");
  if (!tldrEl) {
    console.warn("TL;DR element #tldr not found");
  } else if (!project.tldr) {
    console.warn("project.tldr is missing");
    tldrEl.textContent = "";
  } else {
    tldrEl.innerHTML = `<strong>TL;DR:</strong> ${project.tldr}`;
  }
  setText("#bibtex", project.bibtex);
  setText("#acknowledgements-text", project.acknowledgements);
  const contactEl = $("#contact");
  if (contactEl) {
    if (project.contact) {
      contactEl.innerHTML = `Questions? Contact: <a href="mailto:${project.contact}">${project.contact}</a>`;
    } else {
      console.warn("project.contact is missing");
      contactEl.textContent = "";
    }
  }

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
  initBackToTop();
}

render();
