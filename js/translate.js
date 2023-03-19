$(document).ready(function () {
  function updateContent() {
    i18next.loadNamespaces(['translation'], function () {
      $('[data-i18n]').each(function () {
        const $this = $(this);
        const key = $this.data('i18n');
        const text = i18next.t(key);
        $this.html(text);

        // CV linkini güncelle
        if ($this.data('link')) {
          const linkKey = $this.data('link');
          const link = i18next.t(linkKey);
          $this.attr('href', link);
        }
      });
    });
  }

  i18next
    .use(window.i18nextHttpBackend)
    .use(window.i18nextBrowserLanguageDetector)
    .init(
      {
        fallbackLng: 'tr',
        backend: {
          loadPath: 'translations/{{lng}}.json',
        },
      },
      updateContent
    );

  $('#langSwitch').on('change', function () {
    const newLang = i18next.language === 'en' ? 'tr' : 'en';
    i18next.changeLanguage(newLang, updateContent);
  });
});
