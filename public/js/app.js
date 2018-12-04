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
      $(".error").text("Enter some Text or Link?").show();
      $(".success").text("").reset();

    } else if (message.length > 0) {
      $(".success").text("QR Code Generated!").show();
      $(".error").text('').show();
      localStorage.setItem("qrCodeMessage", message);
      $('#qrcode').html('').show();
      $('#qrcode').qrcode(message);
    }
  });


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(function () {
        console.log('Service Worker Registered');
      });
  }
})();
