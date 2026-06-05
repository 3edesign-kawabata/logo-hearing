(function () {
  const purposeRadios = document.querySelectorAll('input[name="purpose"]');
  const logoTypeRadios = document.querySelectorAll('input[name="logo_type"]');
  const tracePrecisionRadios = document.querySelectorAll('input[name="trace_precision"]');

  const traceFields = document.getElementById('trace-fields');
  const logoStructureSection = document.getElementById('logo-structure-section');
  const budgetDisplay = document.getElementById('budget-display');

  const budgetStandard = {
    logotype:        '参考：80,000円〜',
    symbol:          '参考：100,000円〜',
    symbol_logotype: '参考：150,000円〜',
    corporate:       '参考：300,000円〜',
    undecided:       '参考：要相談',
  };

  const budgetTrace = {
    simple:  '参考：50,000円〜',
    precise: '参考：80,000円〜',
    consult: '参考：要相談',
  };

  function getChecked(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
  }

  function updateVisibility() {
    const purpose = getChecked('purpose');
    const isTrace = purpose === 'trace';

    traceFields.classList.toggle('hidden', !isTrace);
    logoStructureSection.classList.toggle('hidden', isTrace);

    updateBudget();
  }

  function updateBudget() {
    const purpose = getChecked('purpose');

    if (!purpose) {
      setBudgetPlaceholder('制作の目的とロゴの構成を選択すると参考金額が表示されます');
      return;
    }

    if (purpose === 'trace') {
      const precision = getChecked('trace_precision');
      if (!precision) {
        setBudgetPlaceholder('トレースの精度希望を選択すると参考金額が表示されます');
        return;
      }
      setBudgetAmount(budgetTrace[precision]);
    } else {
      const logoType = getChecked('logo_type');
      if (!logoType) {
        setBudgetPlaceholder('ロゴの構成を選択すると参考金額が表示されます');
        return;
      }
      setBudgetAmount(budgetStandard[logoType]);
    }
  }

  function setBudgetAmount(text) {
    budgetDisplay.innerHTML = `<span class="budget-amount">${text}</span>`;
  }

  function setBudgetPlaceholder(text) {
    budgetDisplay.innerHTML = `<span class="budget-placeholder">${text}</span>`;
  }

  purposeRadios.forEach(function (radio) {
    radio.addEventListener('change', updateVisibility);
  });

  logoTypeRadios.forEach(function (radio) {
    radio.addEventListener('change', updateBudget);
  });

  tracePrecisionRadios.forEach(function (radio) {
    radio.addEventListener('change', updateBudget);
  });

  // 「その他」チェックボックスの追加テキスト欄制御
  const usageOther = document.getElementById('usage-other');
  const usageOtherField = document.getElementById('usage-other-field');

  usageOther.addEventListener('change', function () {
    usageOtherField.classList.toggle('hidden', !this.checked);
  });

  updateVisibility();
})();
