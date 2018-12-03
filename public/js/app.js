(function () {
  'use strict';

  window.onload = function () {
    let content = localStorage.getItem("qrCodeMessage");
    $('#qrCodeMessage').val(content);
    $('#qrcode').qrcode(content);
  }

  $('#buttonGenerate').click(() => {
    console.log('click');
    let message = $('#qrCodeMessage').val();
    if (message === '' || null) {
      alert('Input some text or link first!');
    } else {
      localStorage.setItem("qrCodeMessage", message);
      $('#qrcode').html('');
      $('#qrcode').qrcode(message);
    }
    document.getElementById('qrCodeMessage').value = '';
  });


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(function () {
        console.log('Service Worker Registered');
      });
  }
})();
