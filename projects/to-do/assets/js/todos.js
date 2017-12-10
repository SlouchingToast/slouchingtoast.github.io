//check off specific to-do's by clicking
$('ul').on("click", "li", function(){
	$(this).toggleClass("completed");
});

//click on X to delete To-Do item
$('ul').on("click", "span", function(event){
	//remove this span and parent li, AFTER fadeOut
	$(this).parent().fadeOut(500, function(){ //this = span
		$(this).remove(); //this = li
	});
	//stop click from passing up thru li, ul, body, etc.
	event.stopPropagation();
})

$("input[type='text']").keypress(function(event){
	if(event.which === 13){ //if enter key is pressed
		//grab value of input
		var todoText = $(this).val();
		//clear input field on enter keypress
		$(this).val("");
		//create new li w/ user input val, and add to ul
		$('ul').append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")
	}
});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});