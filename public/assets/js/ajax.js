$('.addActivity').on('click', function(event){
	event.preventDefault();

    var thisForm = $(this).parent();
    

	var activityid = thisForm.data('activityid');
	var activityName = $(this).siblings().eq(0).val();
	var category = $(this).siblings().eq(1).val();
	var location = $(this).siblings().eq(2).val();
	var date = $(this).siblings().eq(3).val();
	var price = $(this).siblings().eq(4).val();
	var notes = $(this).siblings().eq(5).val();

	var data = {
		activity_name: activityName,
		category: category,
		activity_location: location,
		activity_date: date,
		activity_price: price,
		notes: notes
    }

	// one way
		$.post("/users/addActivity", data, function(response){
			console.log(response);
			alert("the response from the server is: " + response + ". If 200 then that's good. If 500 then there was something wrong.");
		});
	});