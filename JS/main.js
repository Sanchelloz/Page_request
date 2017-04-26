function TestLoadData() {
    $.ajax("http://www.json-generator.com/api/json/get/bUsRkvEmHm?indent=2",
        { type:'GET', dataType:'json', success:DataLoaded, error:ErrorHandler }
    );
};

TestLoadData();

var Base = [];

function DataLoaded(data) {
    Base = data;
    console.log(data)
    return data;
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
    var requestedData = $('[checked="checked"]');
    console.log(requestedData);
    var requestedId = [];
    for (var i=0; i<requestedData.length; i++ ){
        
        var id = requestedData[i].id;
        requestedId.push(id);
    }
    //console.log(requestedId);
    BuildTable(requestedId)
})

$(window).on('load', function () {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
    $("#page_data_selection").delay(1000).show(0);
});
function BuildTable(idArr){
    $('#requested_data thead tr').html("");
    $('#requested_data tbody').html("");
    var count = 0;
    Start:
    for (var k=0; k<Base.length; k++){
            
        $('#requested_data tbody').append("<tr></tr>");
        
        for (var j=0; j<idArr.length; j++){

            var b = idArr[j];
            if (b=="id")    {
                b="_id";
            }
            
            
            $('#requested_data tbody tr:eq('+k+')').append("<td>" + Base[k][b] + "</td>")

        }
        if (count != 0){
            continue Start;
        }
        for (var m=0; m<idArr.length; m++){

            var c = idArr[m];
            if (c=="id")    {
                c="#id";
            }

            $('#requested_data thead tr').append("<th>" + c + "</th>");
        }
        count = 1;
    }
    
    
}


function ErrorHandler(jqXHR,StatusStr,ErrorStr){
    alert(StatusStr+'Загрузка не удалась'+ErrorStr);
}