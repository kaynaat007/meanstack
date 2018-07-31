
$('ul').on('click', 'li', function(){ // we can only add select queries on
   // elements which exists at the time of selection. However, we can add a second
   // argument 'li' in this case which says, run this code when any li within ul
   // is clicked. but 'ul' must exist at the time of selection.
    $(this).toggleClass('selected');
});

// when click on span, remove the corresponding li.
$('ul').on('click', 'span', function(event){ // listen on span within ul.
  event.stopPropagation();  // stop event bubbling.
  $(this).parent().fadeOut(500, function(){ // access enclosing li and fade it out.
       $(this).remove();
  });

});

$("input[type='text']").keypress( function(event){
  if ( event.which === 13){
    var todoText =  $(this).val();
    $(this).val("");
    $('ul').append("<li><span><i class='fa fa-trash'></i></span>" + todoText + "</li>");
  }
});

$('.fa-plus').click(function(){
  $("input[type='text']").fadeToggle() ;

});
