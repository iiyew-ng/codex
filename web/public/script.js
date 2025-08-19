const form = document.getElementById('form');
const messages = document.getElementById('messages');

function addMessage(cls, text) {
  const div = document.createElement('div');
  div.className = cls;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const input = document.getElementById('prompt');
  const prompt = input.value.trim();
  if (!prompt) return;
  addMessage('user', prompt);
  input.value = '';
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  const data = await res.json();
  addMessage('bot', data.output.trim());
});
