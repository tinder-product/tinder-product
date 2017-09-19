$(document).ready(function() {

  $(".matchBtn").on('click', function(e) {
    e.preventDefault()
    var productId = $(this).data('product')
    $.post("http://localhost:3000/db", {productId: productId})
      .then( console.log('holi, manoli'))
      .catch( err => { next(err)})
  })

});
