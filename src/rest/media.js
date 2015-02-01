//
// Violet.REST.Media
//

(function(Violet) {
  var Media = {
    'upload': {
      method: 'POST',
      path: 'media/upload',
      responseProc: function(message) {
        return [message];
      },
      multipart: true
    }
  };
  Violet.REST.Media = Media;
})(Violet);
