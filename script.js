(function () {
  // === Elements ===
  const purposeRadios        = document.querySelectorAll('input[name="purpose"]');
  const traceFields          = document.getElementById('trace-fields');
  const logoStructureSection = document.getElementById('logo-structure-section');
  const purposeOtherField    = document.getElementById('purpose-other-field');

  const logoTypeRadios       = document.querySelectorAll('input[name="logo_type"]');
  const tracePrecisionRadios = document.querySelectorAll('input[name="trace_precision"]');
  const specDocRadios        = document.querySelectorAll('input[name="spec_doc"]');
  const budgetDisplay        = document.getElementById('budget-display');

  const usageOther           = document.getElementById('usage-other');
  const usageOtherField      = document.getElementById('usage-other-field');

  const brandColorRadios     = document.querySelectorAll('input[name="brand_color"]');
  const colorPickerFields    = document.getElementById('color-picker-fields');
  const colorPrefFields      = document.getElementById('color-preference-fields');

  // === Budget tables ===
  const budgetStandard = {
    logotype:        '80,000円〜',
    symbol:          '100,000円〜',
    symbol_logotype: '150,000円〜',
    corporate:       '300,000円〜',
    undecided:       '要相談',
  };

  const budgetTrace = {
    simple:  '50,000円〜',
    precise: '80,000円〜',
    consult: '要相談',
  };

  // === Helpers ===
  function getChecked(name) {
    const el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : null;
  }

  function setBudgetAmount(text) {
    budgetDisplay.innerHTML = '<span class="budget-amount">参考：' + text + '</span>';
  }

  function setBudgetPlaceholder(text) {
    budgetDisplay.innerHTML = '<span class="budget-placeholder">' + text + '</span>';
  }

  // 仕様書「必要」選択時に50,000円を加算する
  function applySpecDoc(baseStr) {
    if (baseStr === '要相談') return '要相談';
    var specDoc = getChecked('spec_doc');
    if (specDoc !== 'needed') return baseStr;
    var num = parseInt(baseStr.replace(/,/g, ''), 10);
    return (num + 50000).toLocaleString() + '円〜';
  }

  // === Update: 制作の目的 ===
  function updatePurpose() {
    var purpose = getChecked('purpose');
    var isTrace = purpose === 'trace';
    var isOther = purpose === 'other';

    traceFields.classList.toggle('hidden', !isTrace);
    logoStructureSection.classList.toggle('hidden', isTrace);
    purposeOtherField.classList.toggle('hidden', !isOther);

    updateBudget();
  }

  // === Update: 予算 ===
  function updateBudget() {
    var purpose = getChecked('purpose');

    if (!purpose) {
      setBudgetPlaceholder('制作の目的とロゴの構成を選択すると参考金額が表示されます');
      return;
    }

    if (purpose === 'trace') {
      var precision = getChecked('trace_precision');
      if (!precision) {
        setBudgetPlaceholder('トレースの精度希望を選択すると参考金額が表示されます');
      } else {
        setBudgetAmount(budgetTrace[precision]);
      }
      return;
    }

    if (purpose === 'new' || purpose === 'renewal' || purpose === 'expansion') {
      var logoType = getChecked('logo_type');
      if (!logoType) {
        setBudgetPlaceholder('ロゴの構成を選択すると参考金額が表示されます');
      } else {
        setBudgetAmount(applySpecDoc(budgetStandard[logoType]));
      }
      return;
    }

    // その他
    setBudgetPlaceholder('要相談');
  }

  // === Update: ブランドカラー ===
  function updateBrandColor() {
    var value = getChecked('brand_color');
    colorPickerFields.classList.toggle('hidden', value !== 'has_color');
    colorPrefFields.classList.toggle('hidden', value !== 'no_color');
  }

  // === Color hex value display ===
  document.querySelectorAll('input[type="color"]').forEach(function (input) {
    var valueSpan = input.parentElement.querySelector('.color-value');
    if (!valueSpan) return;
    valueSpan.textContent = input.value.toUpperCase();
    input.addEventListener('input', function () {
      valueSpan.textContent = this.value.toUpperCase();
    });
  });

  // === 対面日: デフォルト今日 ===
  var meetingDate = document.getElementById('meeting_date');
  if (meetingDate && !meetingDate.value) {
    meetingDate.value = new Date().toISOString().split('T')[0];
  }

  // === Event listeners ===
  purposeRadios.forEach(function (r) {
    r.addEventListener('change', updatePurpose);
  });

  logoTypeRadios.forEach(function (r) {
    r.addEventListener('change', updateBudget);
  });

  tracePrecisionRadios.forEach(function (r) {
    r.addEventListener('change', updateBudget);
  });

  specDocRadios.forEach(function (r) {
    r.addEventListener('change', updateBudget);
  });

  if (usageOther) {
    usageOther.addEventListener('change', function () {
      usageOtherField.classList.toggle('hidden', !this.checked);
    });
  }

  brandColorRadios.forEach(function (r) {
    r.addEventListener('change', updateBrandColor);
  });

  // === Initial state ===
  updatePurpose();
  updateBrandColor();
})();
