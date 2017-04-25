function TestLoadData() {
    $.ajax("http://www.json-generator.com/api/json/get/bUsRkvEmHm?indent=2",
        { type:'GET', dataType:'json', success:DataLoaded, error:ErrorHandler }
    );

};
TestLoadData();

function DataLoaded(data) {
    //base = data;
    console.log(data)
};


$('input[type=checkbox]').customRadioCheck();
$('.Submit_btn').on('click', function(){
    $('#page_data_selection').hide(0);
    $('#page_selected_data').show(0);
})
$('.Select_data_btn').on('click', function(){
    $('#page_selected_data').hide(0);
    $('#page_data_selection').show(0);
})

$('#selectAll').on('click', function(){
    $('.checkbox').attr("checked",true);
    $('.custom-check').addClass('checked');
});
$('#clearSelection').on('click', function(){
    $('.checkbox').attr("checked",false);
    $('.custom-check').removeClass('checked');
});

$(".Submit_btn").on("click", function(){
    console.log($('[checked="checked"]'))
})

$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
    $("#page_data_selection").delay(1000).show(0);
});


function ErrorHandler(jqXHR,StatusStr,ErrorStr){
    alert(StatusStr+' '+ErrorStr);
}