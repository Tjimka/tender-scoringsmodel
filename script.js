const scores = new Array(8).fill(null);
  const ko = new Array(4).fill(null);

  function setKO(i, val, btn) {
    ko[i] = val;
    btn.parentElement.querySelectorAll('.ko-btn').forEach(b => b.className = 'ko-btn');
    btn.classList.add(val);
    document.getElementById('ko-flag').style.display = ko.some(v => v === 'nee') ? 'block' : 'none';
    update();
  }

  function setScore(i, val, btn) {
    scores[i] = val;
    btn.parentElement.querySelectorAll('.score-btn').forEach(b => { b.className = 'score-btn'; });
    btn.classList.add('s' + val);
    update();
  }

  function update() {
    const total = scores.reduce((s, v) => s + (v !== null ? v : 0), 0);
    const filled = scores.filter(v => v !== null).length;
    const pct = Math.round((total / 16) * 100);

    document.getElementById('total').textContent = total;
    document.getElementById('prog-fill').style.width = pct + '%';

    const card = document.getElementById('result-card');
    const badge = document.getElementById('verdict-badge');
    const title = document.getElementById('result-title');
    const sub = document.getElementById('result-sub');
    const fill = document.getElementById('prog-fill');

    if (filled === 0) return;

    let cls, badgeTxt, titleTxt, subTxt, color;
    if (total >= 13) {
      cls = 'go'; badgeTxt = 'Go';
      titleTxt = 'Schrijf in.';
      subTxt = 'De scores rechtvaardigen een inschrijving. Prioriteer dit boven ander werk en zorg dat de inschrijving scherp en op tijd is.';
      color = '#22C55E';
    } else if (total >= 9) {
      cls = 'go'; badgeTxt = 'Voorwaardelijk go';
      titleTxt = 'Schrijf in, maar wees selectief.';
      subTxt = 'Er is voldoende kans om in te schrijven, maar benoem intern welke risicofactoren er zijn. Gebruik de tijd goed.';
      color = '#22C55E';
    } else if (total >= 5) {
      cls = 'twijfel'; badgeTxt = 'Twijfel';
      titleTxt = 'Eerst meer informatie ophalen.';
      subTxt = 'De kans is beperkt. Stel aanvullende vragen aan de aanbesteder voordat je tijd investeert in een inschrijving.';
      color = '#BD9766';
    } else {
      cls = 'nogo'; badgeTxt = 'No-go';
      titleTxt = 'Sla deze tender over.';
      subTxt = 'De tijdsinvestering levert hier waarschijnlijk niets op. Focus op tenders met een sterkere uitgangspositie.';
      color = '#EF4444';
    }

    if (filled < 8) subTxt += ' (' + filled + '/8 criteria ingevuld)';

    card.className = 'result-card verdict-' + cls;
    badge.className = 'verdict-badge ' + cls;
    badge.textContent = badgeTxt;
    title.textContent = titleTxt;
    sub.textContent = subTxt;
    fill.style.background = color;
  }