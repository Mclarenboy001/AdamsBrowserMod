
// Mod Menu JavaScript - hosted as menu.js
(async function(){
  if (window.adamModMenu) return;
  window.adamModMenu = true;

  const menu = document.createElement('div');
  menu.style = \`
    position:fixed;top:10px;left:10px;z-index:99999;
    background:#111;color:#fff;padding:10px;
    border-radius:10px;max-width:90vw;max-height:90vh;
    font-family:sans-serif;font-size:14px;
    box-shadow:0 0 10px #000;overflow:auto;
  \`;

  const styleButton = \`
    display:block;margin:4px;padding:6px 10px;background:#333;
    color:white;border:none;border-radius:5px;
    cursor:pointer;font-size:13px;width:100%;text-align:left;
  \`;

  const addBtn = (text, fn) => {
    const b = document.createElement('button');
    b.textContent = text;
    b.style = styleButton;
    b.onclick = fn;
    menu.appendChild(b);
  };

  // Tools
  addBtn('✏️ Edit Mode', () => {
    document.body.contentEditable ^= 1;
    document.designMode = document.designMode === 'on' ? 'off' : 'on';
  });

  addBtn('🌓 Toggle Dark Mode', () => {
    document.documentElement.style.filter =
      document.documentElement.style.filter ? '' : 'invert(1) hue-rotate(180deg)';
  });

  addBtn('🔓 Reveal Passwords', () => {
    document.querySelectorAll('input[type="password"]').forEach(i => i.type = 'text');
  });

  addBtn('🔗 Show All Links', () => {
    const links = [...document.links].map(l => l.href).join('\n');
    alert('Links on this page:\n\n' + links.slice(0, 1000) + (links.length > 1000 ? '\n...truncated' : ''));
  });

  addBtn('🖼️ Clear Images', () => {
    document.querySelectorAll('img').forEach(i => i.remove());
  });

  addBtn('📸 Snapshot Page', () => {
    html2canvas(document.body).then(canvas => {
      const dataUrl = canvas.toDataURL();
      const img = new Image();
      img.src = dataUrl;
      img.style = 'max-width:100%;margin-top:10px;border-radius:8px;';
      menu.appendChild(img);
    });
  });

  addBtn('🧹 Remove Ads', () => {
    document.querySelectorAll('[id*="ad"],[class*="ad"]').forEach(ad => ad.remove());
  });

  addBtn('🧠 AI Summary (text only)', () => {
    const text = document.body.innerText.slice(0, 3000);
    alert("Summary (pretend):\n\n" + text.split(". ").slice(0,5).join(". ") + ".");
  });

  // Weather
  const weatherBox = document.createElement('div');
  weatherBox.style = 'margin-top:10px;padding:6px;background:#222;border-radius:6px;';
  weatherBox.innerText = 'Loading weather...';
  menu.appendChild(weatherBox);

  navigator.geolocation.getCurrentPosition(async pos => {
    const {latitude, longitude} = pos.coords;
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
    const data = await res.json();
    const w = data.current_weather;
    weatherBox.innerText = `🌦️ ${w.temperature}°C, ${w.windspeed}km/h wind`;
  }, () => weatherBox.innerText = 'Weather not available');

  // Harmless Pranks
  addBtn('🙃 Flip All Text', () => {
    document.querySelectorAll('*').forEach(e => {
      if (e.innerText) e.innerText = e.innerText.split('').reverse().join('');
    });
  });

  addBtn('🏃‍♂️ Runaway Buttons', () => {
    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('mouseover', () => {
        btn.style.position = 'absolute';
        btn.style.left = \`\${Math.random() * window.innerWidth}px\`;
        btn.style.top = \`\${Math.random() * window.innerHeight}px\`;
      });
    });
  });

  // Close Button
  addBtn('❌ Close Menu', () => {
    menu.remove();
    window.adamModMenu = false;
  });

  document.body.appendChild(menu);

  // Load html2canvas for screenshot feature
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
  document.body.appendChild(s);
})();
