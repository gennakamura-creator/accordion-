(() => {
  const accordion = document.getElementById("faqAccordion");
  if (!accordion) return;

  const triggers = Array.from(accordion.querySelectorAll(".acc-trigger"));

  function setExpanded(trigger, expanded) {
    const panelId = trigger.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    trigger.setAttribute("aria-expanded", String(expanded));
    if (panel) panel.hidden = !expanded;
  }

  function closeAll(exceptTrigger) {
    triggers.forEach((t) => {
      if (t === exceptTrigger) return;
      setExpanded(t, false);
    });
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      if (isOpen) setExpanded(trigger, false);
      else {
        closeAll(trigger);
        setExpanded(trigger, true);
      }
    });
  });
})();
