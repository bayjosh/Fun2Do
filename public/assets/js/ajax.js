$('.addActivity').on('submit', function(event){
	event.preventDefault();

    var thisForm = $(this).parent();
    

	var couponid = thisForm.data('couponid');
	var quant = $(this).siblings().eq(0).val();

	var data = {
		coupon_id: couponid,
		quantity: quant
    }
})

	//one way
		// $.post("/coupons/users/create", data, function(response){
		// 	alert("the response from the server is: " + response + ". If 200 then that's good. If 500 then there was something wrong.");
		// });