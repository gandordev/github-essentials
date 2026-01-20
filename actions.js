let PRBODY = document.getElementById('pull_request_body');

const commitsElements = document.getElementById('commits_bucket').querySelector('div.TimelineItem');
const olCommits = commitsElements.querySelector('div.TimelineItem-body').getElementsByTagName('ol');

/* 
    Con un solo commit lo agrega de forma automática al mensaje por el motivo que sea.
    En ese caso agregar de forma manual un guion al inicio 
*/
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


