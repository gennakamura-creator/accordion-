{\rtf1\ansi\ansicpg932\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 (() => \{\
  const accordion = document.getElementById("faqAccordion");\
  if (!accordion) return;\
\
  const triggers = Array.from(accordion.querySelectorAll(".acc-trigger"));\
  const steps = document.querySelectorAll(".step");\
  const DONE_KEY = "recesta_step_done";\
\
  let done = \{\};\
  try \{\
    done = JSON.parse(localStorage.getItem(DONE_KEY)) || \{\};\
  \} catch \{\
    done = \{\};\
  \}\
\
  function saveDone()\{\
    localStorage.setItem(DONE_KEY, JSON.stringify(done));\
  \}\
\
  function setExpanded(trigger, expanded)\{\
    const panelId = trigger.getAttribute("aria-controls");\
    const panel = document.getElementById(panelId);\
\
    trigger.setAttribute("aria-expanded", String(expanded));\
    if (panel) panel.hidden = !expanded;\
  \}\
\
  function closeAll(except)\{\
    triggers.forEach(t => \{\
      if (t !== except) setExpanded(t, false);\
    \});\
  \}\
\
  function refreshUI()\{\
    document.querySelectorAll(".step-done-btn").forEach(btn => \{\
      const s = btn.dataset.step;\
      const isDone = !!done[s];\
      btn.classList.toggle("is-done", isDone);\
      btn.textContent = isDone\
        ? "\uc0\u10004  \u12371 \u12398 \u24037 \u31243 \u12399 \u23436 \u20102 \u28168 \u12415 \u12391 \u12377 "\
        : "\uc0\u9745  \u12371 \u12398 \u24037 \u31243 \u12399 \u23436 \u20102 \u12375 \u12414 \u12375 \u12383 ";\
    \});\
\
    steps.forEach((st, i) => \{\
      st.classList.toggle("done", !!done[i + 1]);\
    \});\
  \}\
\
  triggers.forEach((trigger, index) => \{\
    trigger.addEventListener("click", () => \{\
      const isOpen = trigger.getAttribute("aria-expanded") === "true";\
\
      if (isOpen) \{\
        setExpanded(trigger, false);\
      \} else \{\
        closeAll(trigger);\
        setExpanded(trigger, true);\
      \}\
\
      steps.forEach(s => s.classList.remove("active"));\
      if (steps[index]) steps[index].classList.add("active");\
    \});\
  \});\
\
  document.addEventListener("click", (e) => \{\
    const btn = e.target.closest(".step-done-btn");\
    if (!btn) return;\
\
    const step = btn.dataset.step;\
    done[step] = !done[step];\
    saveDone();\
    refreshUI();\
  \});\
\
  refreshUI();\
\})();\
}