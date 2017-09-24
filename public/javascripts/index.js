$(document).ready(function() {

  $(".matchBtn").on('click', function(e) {
    e.preventDefault()
    var productId = $(this).data('product')
    var productUser = $(this).data('userproduct')
    var productUserName = $(this).data('userproductname')
    $.post("/db", {productId: productId, productUser:productUser, productUserName:productUserName})
      .then( console.log('holi'))
      .catch( err => { next(err)})
  })

});
