function findToolBar() {
  const selectors = [".btc", ".adh", ".gU Up", ".dC"];
  for (const selector of selectors) {
    const toolbar = document.querySelector(selector);
    if (toolbar) {
      return toolbar;
    }
  }
  return null;
}

function getEmailText() {
  const selectors = [
    ".h7",
    ".a3s.ail",
    ".gmail_quote",
    '[role="presentation"]',
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) {
      return content.innerText.trim();
    }
  }
  return "";
}

function createButton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3";
  button.style.marginRight = "7px";
  button.innerHTML = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate Reply using AI.");
  return button;
}

function addButton() {
  const previousButton = document.querySelector(".ai-writer-button");
  if (previousButton) {
    previousButton.remove();
  }

  const toolBar = findToolBar();

  if (!toolBar) {
    return;
  }
  const button = createButton();
  button.classList.add("ai-writer-button");
  button.addEventListener("click", async () => {
    try {
      button.innerHTML = "Generating...";
      button.disabled = true;

      const content = getEmailText();
      const response = await fetch("http://localhost:8080/api/email/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: content,
          tone: "professional",
        }),
      });

      if (!response.ok) {
        throw new Error("API call failed.");
      }

      const generatedReply = await response.text();
      const textBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );
      if (textBox) {
        textBox.focus();
        document.execCommand("insertText", false, generatedReply);
      } else {
        console.error("Text box not found.");
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    } finally {
      button.innerHTML = "Generate Reply";
      button.disabled = false;
    }
  });

  toolBar.insertBefore(button, toolBar.firstChild);
}

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposedElements = addedNodes.some(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        (node.matches('.aDh, .btc, [role="dialog"]') ||
          node.querySelector('.aDh, .btc, [role="dialog"]'))
    );
    if (hasComposedElements) {
      setTimeout(addButton, 500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
