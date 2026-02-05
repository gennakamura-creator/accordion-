(() => {
  const accordion = document.getElementById("faqAccordion");
  if (!accordion) return;

  const triggers = Array.from(accordion.querySelectorAll(".acc-trigger"));
  const steps = document.querySelectorAll(".step");
  const DONE_KEY = "recesta_step_done";

  let done = {};
  try {
    done = JSON.parse(localStorage.getItem(DONE_KEY)) || {};
  } catch {
    done = {};
  }

  function saveDone(){
    localStorage.setItem(DONE_KEY, JSON.stringify(done));
  }

  function setExpanded(trigger, expanded){
    const panelId = trigger.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);

    trigger.setAttribute("aria-expanded", String(expanded));
    if (panel) panel.hidden = !expanded;
  }

  function closeAll(except){
    triggers.forEach(t => {
      if (t !== except) setExpanded(t, false);
    });
  }

  function refreshUI(){
    document.querySelectorAll(".step-done-btn").forEach(btn => {
      const s = btn.dataset.step;
      const isDone = !!done[s];
      btn.classList.toggle("is-done", isDone);
      btn.textContent = isDone
        ? "✔ この工程は完了済みです"
        : "☑ この工程は完了しました";
    });

    steps.forEach((st, i) => {
      st.classList.toggle("done", !!done[i + 1]);
    });
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        setExpanded(trigger, false);
      } else {
        closeAll(trigger);
        setExpanded(trigger, true);
      }

      steps.forEach(s => s.classList.remove("active"));
      if (steps[index]) steps[index].classList.add("active");
    });
  });

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".step-done-btn");
    if (!btn) return;

    const step = btn.dataset.step;
    done[step] = !done[step];
    saveDone();
    refreshUI();
  });

  refreshUI();
})();
