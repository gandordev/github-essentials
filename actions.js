const EXCLUDE_CLASSES = [
  'BtnGroup-item',
  'hx_create-pr-button',
  'js-sync-select-menu-button'
]

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

const USER_LANG = [ document.documentElement.lang, navigator.language, 'es' ];
const BODY_NODE = document.body;
const BUTTON_ID = 'copy-pr-messages';

// Listener
const observer = new MutationObserver(() => {
  if (!BODY_NODE.classList.contains('is-pr-composer-expanded')) return;
  createBtn();
});
observer.observe(BODY_NODE, { attributes: true });


function getLang(lang) {
  return TRANSLATIONS[lang];
}

// Create button to add commit messages
function createBtn() {
  // Check if button already exists and return
  if (document.getElementById(BUTTON_ID)) return;

  // Get PR button to match styles
  const createPRBtn = document?.querySelector('button.hx_create-pr-button');
  if (!createPRBtn) return;

  // Get parent HTMLElement
  const parent = createPRBtn?.parentElement;

  // Create our button
  const copyMessagesPRButton = document.createElement('button');
  const classes = Array.from(createPRBtn.classList).filter(c => !EXCLUDE_CLASSES.includes(c));
  copyMessagesPRButton.classList.add(...classes, 'mx-3');
  copyMessagesPRButton.id = BUTTON_ID;

  // Explicitly set the button type to prevent it from defaulting to submit
  copyMessagesPRButton.type = 'button';

  // Translate message according to user lang
  let i = 0;
  let text = '';
  do {
    let lang = USER_LANG[i].split('-', 1)[0];
    text = getLang(lang)
    if (text !== undefined && text !== '') {
      copyMessagesPRButton.textContent = text;
      break;
    }
    i += 1;
  } while (text === undefined || text === '');

  // Add to parent as first element
  parent.parentNode.insertBefore(copyMessagesPRButton, parent);

  // Add listener
  copyMessagesPRButton.addEventListener('click', () => {
    getPRMessages();
  });
}

function getPRMessages() {
  alert('Not Implemented!');
}


/*
let PRBODY = document.getElementById('pull_request_body');

const commitsElements = document.getElementById('commits_bucket').querySelector('div.TimelineItem');
const olCommits = commitsElements.querySelector('div.TimelineItem-body').getElementsByTagName('ol');

/
    Con un solo commit lo agrega de forma automática al mensaje por el motivo que sea.
    En ese caso agregar de forma manual un guion al inicio
/
const olCommitsList = [...olCommits[0].children]

const bodyText = olCommitsList
  .map(element => `- ${element.querySelector('a.Link--primary').textContent}`)
  .join("\n");

PRBODY.innerHTML += bodyText;


// olCommitsList.forEach(element => {
//     var text = `- ${element.querySelector('a.Link--primary').textContent}`
//     PRBODY.innerHTML += text;
//     if (!olCommitsList.findLast == element) PRBODY.innerHTML += "\n\n"
// });

*/
