// Single-file SEO snippet (CONFIG + META_DATA + LD_DATA + runtime)

(function () {
  "use strict";


  const CONFIG = {
    baseUrlFallback: "https://www.gmanis.com",
    googleSiteVerification: ""
  };

  // === DATA (from your previous meta-tags.js) ===
  const META_DATA = {"meta_tags_list":[{"page_url":"https://www.gmanis.com/","title_tag":"Fractional CMO for Credit Unions | Greg Manis","meta_description":"Fractional CMO driving strategic marketing, brand development, and credit union differentiation to grow membership, revenue, and member engagement."},{"page_url":"https://www.gmanis.com/thought-leadership","title_tag":"Brand Archetypes & Strategic Marketing | Greg Manis","meta_description":"Thought leadership on brand archetypes, emotional connection, and brand storytelling to strengthen B2B and credit union brand positioning."},{"page_url":"https://www.gmanis.com/services-contact","title_tag":"Fractional CMO & Marketing Leadership | Greg Manis","meta_description":"Fractional CMO services for credit unions, aligning strategic marketing, brand development, digital marketing, and campaigns to drive membership growth."},{"page_url":"https://www.gmanis.com/creative","title_tag":"Creative Marketing Campaigns & Brand Activation | G. Manis","meta_description":"Creative direction for marketing campaigns, brand storytelling, member engagement, and brand activation for credit unions and other brands."},{"page_url":"https://www.gmanis.com/case-studies","title_tag":"Credit Union Brand Strategy Case Studies | Greg Manis","meta_description":"Strategic marketing and credit union brand strategy case studies showcasing brand positioning, differentiation, and measurable membership growth."}],"keywords":["fractional cmo","brand development","marketing leadership","strategic marketing","credit union marketing","marketing campaigns","brand storytelling","credit union brand strategy","member engagement","membership growth","digital marketing","social media marketing","creative direction","brand positioning","brand archetypes","brand architecture","emotional connection","credit union differentiation","craft distillers","food scientists","visitor experience","brand activation"]};

  // === DATA (from your previous LD.js) ===
  const LD_DATA = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.gmanis.com/#professionalservice",
  "url": "https://www.gmanis.com/",
  "name": "Greg Manis Fractional CMO",
  "description": "Fractional Chief Marketing Officer specializing in helping mid-sized credit unions grow membership, deepen member relationships, and strengthen brand consideration through strategic, KPI-aligned marketing leadership.",
  "image": "https://static.wixstatic.com/media/db54bd_8b849144545d4fee93fde05526967db2%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/db54bd_8b849144545d4fee93fde05526967db2%7Emv2.png",
  "logo": "https://static.wixstatic.com/media/db54bd_8b849144545d4fee93fde05526967db2%7Emv2.png/v1/fill/w_192%2Ch_192%2Clg_1%2Cusm_0.66_1.00_0.01/db54bd_8b849144545d4fee93fde05526967db2%7Emv2.png",
  "founder": {
    "@type": "Person",
    "name": "Greg Manis",
    "email": "greg@gmanis.com",
    "jobTitle": "Fractional Chief Marketing Officer"
  },
  "foundingDate": "2026",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Kansas City",
    "addressRegion": "MO",
    "addressCountry": "US"
  },
  "telephone": "+1-816-309-5923",
  "email": "greg@gmanis.com",
  "areaServed": "US",
  "serviceType": [
    "Fractional CMO services for credit unions",
    "Marketing strategy for credit unions",
    "Brand development for credit unions",
    "Digital marketing leadership",
    "Marketing campaign strategy",
    "Social media marketing strategy"
  ],
  "sameAs": [],
  "hasPart": [
    {
      "@type": "WebPage",
      "@id": "https://www.gmanis.com/thought-leadership",
      "url": "https://www.gmanis.com/thought-leadership",
      "name": "Thought Leadership | Greg Manis Fractional CMO",
      "description": "Insights and articles on brand archetypes, emotional branding, and strategic marketing leadership for B2B and credit union audiences."
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gmanis.com/services-contact",
      "url": "https://www.gmanis.com/services-contact",
      "name": "Services & Contact | Greg Manis Fractional CMO",
      "description": "Overview of fractional CMO services for mid-sized credit unions and contact information for engaging with Greg Manis."
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gmanis.com/creative",
      "url": "https://www.gmanis.com/creative",
      "name": "Creative Campaigns | Greg Manis Fractional CMO",
      "description": "Portfolio of creative campaigns including new member acquisition, member engagement, brand activations, and more."
    },
    {
      "@type": "WebPage",
      "@id": "https://www.gmanis.com/case-studies",
      "url": "https://www.gmanis.com/case-studies",
      "name": "Case Studies | Greg Manis Fractional CMO",
      "description": "Strategic case studies highlighting brand revamp, positioning, and growth outcomes for clients such as CommunityAmerica Credit Union and MGP Ingredients."
    }
  ],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.gmanis.com/"
  }
};

  /* ===== Helpers ===== */
  function clamp(str, max) {
    if (typeof str !== "string") str = String(str ?? "");
    return str.length <= max ? str : str.slice(0, Math.max(0, max - 1)) + "…";
  }

  function stripTrailingSlash(p) {
    if (!p) return "/";
    return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  }

  function normalizePathFromUrl(url) {
    try {
      const u = new URL(url);
      return stripTrailingSlash(u.pathname || "/");
    } catch {
      const m = String(url || "").match(/^https?:\/\/[^/]+(\/[^?#]*)?/i);
      return stripTrailingSlash((m && m[1]) || "/");
    }
  }

  function removeLangPrefix(pathname) {
    const m = String(pathname || "/").match(
      /^\/([a-z]{2}(?:-[A-Z]{2})?)(?=\/|$)(.*)$/
    );
    if (!m) return pathname || "/";
    const rest = stripTrailingSlash(m[2] || "/");
    return rest || "/";
  }

  function currentPagePath() {
    const path = window.location.pathname || "/";
    return stripTrailingSlash(path || "/");
  }

  function currentKeyCandidates() {
    const path = currentPagePath();
    const origin = (window.location.origin || "").replace(/\/$/, "");
    const full = origin + path;

    if (path === "/") {
      return [full, "/"];
    }

    const noLang = removeLangPrefix(path);
    return [full, path, stripTrailingSlash(path), noLang, stripTrailingSlash(noLang)];
  }

  function buildIndex(metaJson) {
    const list = (metaJson && metaJson.meta_tags_list) || [];
    const index = {};
    for (const item of list) {
      const path = normalizePathFromUrl(item.page_url);
      let origin = "";
      try {
        origin = new URL(item.page_url).origin;
      } catch {
        origin = "";
      }
      const full = origin ? origin.replace(/\/$/, "") + path : "";

      const entry = {
        title: item.title_tag || "",
        description: item.meta_description || "",
      };

      index[path] = entry;
      index[stripTrailingSlash(path)] = entry;
      if (full) index[full] = entry;
    }
    return index;
  }

  function _stripQuotes(s) {
    return String(s ?? "")
      .replace(/["'“”‘’„«»]/g, "")
      .replace(/\s+/g, " ")
      .replace(/^[\s\-–—·,;:]+|[\s\-–—·,;:]+$/g, "")
      .trim();
  }

  function normalizeKeywordsList(input, opts) {
    const { maxKeywords = 20 } = opts || {};
    if (input == null) return [];
    let items = Array.isArray(input)
      ? input.slice()
      : typeof input === "string"
      ? input.split(",")
      : [];
    const seen = new Set();
    return items
      .map(_stripQuotes)
      .filter((s) => s && s.length >= 2)
      .filter((s) => {
        const k = s.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      })
      .slice(0, maxKeywords);
  }

  function normalizeKeywords(input, opts) {
    const { maxKeywords = 20, maxLength = 280 } = opts || {};
    const list = normalizeKeywordsList(input, { maxKeywords });
    const content = list.join(", ");
    return content.length > maxLength ? content.slice(0, maxLength) : content;
  }

  function applyAltFallbacks(keywordsPool) {
    if (!Array.isArray(keywordsPool) || keywordsPool.length === 0) return;
    try {
      const images = Array.from(document.querySelectorAll("img"));
      let i = 0;
      images.forEach((img) => {
        const curAlt = (img.getAttribute("alt") || "").trim().toLowerCase();
        const shouldReplace =
          !curAlt ||
          curAlt.endsWith(".jpg") ||
          curAlt.endsWith(".png") ||
          curAlt === "image" ||
          curAlt === "img";
        if (shouldReplace) {
          img.setAttribute("alt", keywordsPool[i % keywordsPool.length]);
          i++;
        }
      });
    } catch {
      /* ignore */
    }
  }

  function optimizeImages() {
    try {
      const images = Array.from(document.querySelectorAll("img"));
      if ("IntersectionObserver" in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              io.unobserve(img);
              // hook for tracking / lazy work if needed
            }
          });
        });
        images.forEach((img, index) => {
          if (index > 0) io.observe(img);
        });
      }
    } catch (err) {
      console.error("Image optimization error:", err);
    }
  }

  function upsertMeta(nameOrProperty, content, useProperty) {
    const selector = useProperty
      ? `meta[property="${nameOrProperty}"]`
      : `meta[name="${nameOrProperty}"]`;
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement("meta");
      if (useProperty) el.setAttribute("property", nameOrProperty);
      else el.setAttribute("name", nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    let link = document.head.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  function injectJsonLd(ldObject) {
    if (!ldObject) return;
    try {
      const existing = Array.from(
        document.head.querySelectorAll('script[type="application/ld+json"]')
      );
      existing.forEach((el) => {
        el.parentNode.removeChild(el);
      });

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(ldObject);
      document.head.appendChild(script);
    } catch (err) {
      console.error("Error injecting JSON-LD:", err);
    }
  }

  function applyJsonLd() {
    injectJsonLd(LD_DATA);
  }

  function applySeoFromJson() {
    try {
      const metaJson = META_DATA;
      const index = buildIndex(metaJson);

      const path = currentPagePath();
      const isHome = path === "/";

      const fallbackBase =
        (CONFIG && CONFIG.baseUrlFallback) ? CONFIG.baseUrlFallback : "";
      const baseUrl = (window.location.origin || fallbackBase).replace(/\/$/, "");
      const canonicalUrl = baseUrl + path;

      const keys = currentKeyCandidates();
      let entry = null;
      for (const k of keys) {
        if (index[k]) {
          entry = index[k];
          break;
        }
      }

      if (!entry) {
        return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
      }

      const title = clamp(entry.title, 60);
      const desc = clamp(entry.description, 185);

      document.title = title;

      const metaList = [
        { type: "name", key: "description", content: desc },
        { type: "property", key: "og:url", content: canonicalUrl },
        { type: "name", key: "resource-hints", content: "preload" },
        { type: "name", key: "format-detection", content: "telephone=yes" },
        { type: "name", key: "mobile-web-app-capable", content: "yes" },
        { type: "name", key: "apple-mobile-web-app-capable", content: "yes" },
      ];

      // opcjonalnie dodaj google-site-verification, jeśli jest w CONFIG
      if (CONFIG && CONFIG.googleSiteVerification) {
        metaList.push({
          type: "name",
          key: "google-site-verification",
          content: CONFIG.googleSiteVerification
        });
      }

      if (isHome && metaJson && metaJson.keywords) {
        const kwContent = normalizeKeywords(metaJson.keywords, {
          maxKeywords: 25,
          maxLength: 512,
        });
        if (kwContent) {
          metaList.push({ type: "name", key: "keywords", content: kwContent });
        }
      }

      metaList.forEach((m) => {
        upsertMeta(m.key, m.content, m.type === "property");
      });

      upsertLink("canonical", canonicalUrl);

      return normalizeKeywordsList(metaJson.keywords, { maxKeywords: 25 });
    } catch (err) {
      console.error("Error meta settings:", err);
      return [];
    }
  }

  function initSnippetSEO() {
    const keywordsPool = applySeoFromJson();
    const path = currentPagePath();
    if (path === "/") {
      applyJsonLd();
    }
    optimizeImages();
    applyAltFallbacks(keywordsPool);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetSEO);
  } else {
    initSnippetSEO();
  }
})();
