const TRANSLATIONS = {
  'es': 'Pegar mensajes de commits',
  'en': 'Paste commit messages',
  'fr': 'Coller les messages de commit',
  'de': 'Commit-Nachrichten einfügen',
  'it': 'Incolla i messaggi di commit',
  'pt': 'Colar mensagens de commit',
  'nl': 'Commitberichten plakken',
  'pl': 'Wklej wiadomości commitów',
  'ru': 'Вставить сообщения коммитов',
  'ja': 'コミットメッセージを貼り付ける',
  'zh': '粘贴提交消息',
  'ko': '커밋 메시지 붙여넣기',
  'ar': 'لصق رسائل الالتزام',
  'tr': 'Commit mesajlarını yapıştır',
  'sv': 'Klistra in commit-meddelanden',
  'no': 'Lim inn commit-meldinger',
  'da': 'Indsæt commit-beskeder',
  'fi': 'Liitä commit-viestit',
  'cs': 'Vložit zprávy o commitech',
  'hu': 'Commit üzenetek beillesztése'
};

const EXCLUDE_CLASSES = [ 'BtnGroup-item', 'hx_create-pr-button', 'js-sync-select-menu-button' ]
const BUTTON_ID = 'copy-pr-messages';

const PR_BODY = document?.getElementById('pull_request_body');


/**
 * Observe changes in the page.
 * @returns {MutationObserver}
 */
const observer = new MutationObserver(() => {
  if (!document.body.classList.contains('is-pr-composer-expanded')) return;
  setupCopyPRButton();
});
observer.observe(document.body, { attributes: true });


/**
 * Initialize new button to copy all PR messages.
 * @returns {void}
 */
function setupCopyPRButton() {
  // Check if button already exists and return
  if (document.getElementById(BUTTON_ID)) return;

  // Get PR button to match styles
  const pullRequestBtn = document?.querySelector('button.hx_create-pr-button');
  if (!pullRequestBtn) return;

  createCopyPRMessagesBtn(pullRequestBtn)
}

/**
 * Get all the Pull Requests messages from the Timeline.
 * @returns {string}
 */
function getPRMessages() {
  let messages = "";
  const timelineItemBody = document.getElementsByClassName('TimelineItem-body');
  if (timelineItemBody.length === 0) return;

  for (let item of timelineItemBody) {
    let ol = item.getElementsByTagName('ol');
    if (ol.length === 0) continue;

    for (let listItem of ol[0].children) {
      messages += `- ${listItem.querySelector('a.Link--primary').textContent}\n`
    }
  }

  return messages;
}

/**
 * Update PR body to add all the messages from the Pull Requests.
 * @param {string} messages All the PR messages concatenated
 * @returns {void}
 */
function addPRMessages(messages) {
  if (!PR_BODY) return;

  if (PR_BODY.value !== '') PR_BODY.value += "\n"
  PR_BODY.value += messages.trim();
}

/**
 * Create a new HTMLElement to copy PR messages automatically.
 * @param {Element} elementToCopy Element to copy class from
 * @returns {HTMLElement}
 */
function createCopyPRMessagesBtn(elementToCopy) {
  const tagName = 'button';

  const copyMessagesPRButton = document.createElement(tagName);
  try {

    // Add classes to match styles with the existing buttons
    const classes = Array.from(elementToCopy.classList).filter(c => !EXCLUDE_CLASSES.includes(c));

    // Add attributes
    copyMessagesPRButton.classList.add(...classes, 'mx-3');
    copyMessagesPRButton.id = BUTTON_ID;

    // Explicitly set the button type to prevent it from defaulting to submit
    copyMessagesPRButton.type = tagName;

    copyMessagesPRButton.addEventListener('click', () => {
      let messages = getPRMessages();
      if (messages) addPRMessages(messages);
    });

    copyMessagesPRButton.textContent = getTextTranslated();

    // Add to parent as first element
    const row = elementToCopy.parentElement;
    const container = row.parentElement;
    container.insertBefore(copyMessagesPRButton, row);
  } catch (e) {
    console.log("Error", e)
    return;
  }

  return copyMessagesPRButton;
}


/**
 * Translate text button according to user language.
 * @returns {string}
 */
function getTextTranslated() {
  const userLang = [ document.documentElement.lang, navigator.language, 'es' ];

  for (let langToGet of userLang) {
    langToGet = langToGet.split('-', 1)[0]
    const text = TRANSLATIONS[langToGet];

    if (text === undefined || text === '') continue;
    return text;
  }

  return "";
}