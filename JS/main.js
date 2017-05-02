function TestLoadData() {
    $.ajax("http://www.json-generator.com/api/json/get/bUsRkvEmHm?indent=2",
        { type:'GET', dataType:'json', success:DataLoaded, error:ErrorHandler }
    );
};

TestLoadData();

var Base = [];

function DataLoaded(data) {
    Base = data;
    //console.log(data)
    //return data;
};


$('input[type=checkbox]').customRadioCheck();

$(document).ready(function() {

    $('.Select_data_btn').on('click', function(){ // Возврат к странице с чекбоксами
        $('#page_selected_data').hide(0);
        $('#page_data_selection').show(0);
    });

    $('#selectAll').on('click', function(){  // Выделяем все чекбоксы
        $('.checkbox').attr("checked",true);
        $('.custom-check').addClass('checked');
    });
    $('#clearSelection').on('click', function(){ // Снимаем выделение всех чекбоксов
        $('.checkbox').attr("checked",false);
        $('.custom-check').removeClass('checked');
    });

    $(".Submit_btn").on("click", function(){ // Выводим таблицу на экран с заданным содержимым
        $('#page_data_selection').hide(0);
        $('#page_selected_data').show(0);
        var requestedData = $('[checked="checked"]');
        //console.log(requestedData);
        var requestedId = [];
        
        for (var i=0; i<requestedData.length; i++ ){

            var id = requestedData[i].id;
            requestedId.push(id);
        }
        
        BuildTable(requestedId);
        
        $("#requested_data").tablesorter({
            widgets:['zebra'],
            cancelSelection:false,
            debug:true,
        });
        
    });
    
});


$(window).on('load', function () { //ЗАпуск прелоадера на время загрузки с сервера
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
    $("#page_data_selection").delay(1000).show(0);
});

function BuildTable(idArr){
    $('#requested_data thead tr').html(""); //очистка таблицы перед выводом новых полей
    $('#requested_data tbody').html("");
    var count1 = 0;
    if (idArr.length == 0){
		$('#requested_data thead tr').append("<th><h1>Вы не выбрали ни одного параметра!</h1></th>");
	} else {
		
    Start:
    for (var k=0; k<Base.length; k++){
            
        $('#requested_data tbody').append("<tr></tr>");
        
        for (var j=0; j<idArr.length; j++){
            
            var b = idArr[j];
            if (b=="id")   {
                b="_id";
				
				var String_id = cropTxt(Base[k][b]);

				function cropTxt(Str){
					if (Str.length > 10) Str = Str.slice(0, 4) + ' ... ' + Str.slice(-4);
					return Str;
				}
				
                $('#requested_data tbody tr:eq('+k+')').append("<td>" + String_id + "</td>");
                
            } else if ( b == "tags") {
                var StringTags = Base[k][b];
                var newStringTags=[];
                for (var l=0; l<StringTags.length; l++){
                    newStringTags.push(" "+StringTags[l]);
                }
                $('#requested_data tbody tr:eq('+k+')').append("<td>" + newStringTags + "</td>")
                
            } else if ( b == "friends") {
                var StringFriends = Base[k][b];
                var newStringFriends=[];
                for (var n=0; n<StringFriends.length; n++){
					if (n==0){
						newStringFriends.push(""+ (StringFriends[n].id +1) +" - " + StringFriends[n].name);
					} else 
                    newStringFriends.push("</br>"+ (StringFriends[n].id +1) +" - " + StringFriends[n].name);
                    //console.log(newStringFriends);
                }
                $('#requested_data tbody tr:eq('+k+')').append("<td>" + newStringFriends + "</td>");
                
            } else if ( b == "picture") {
                
                $('#requested_data tbody tr:eq('+k+')').append("<td><img src='" + Base[k][b] +"' alt='picture'></td>");
                
            } else if ( b == "about") {
                
                $('#requested_data tbody tr:eq('+k+')').append("<td class='About' >" + Base[k][b] + "</td>");
                
            } else if ( b == "longitude" || b == "latitude") {
                var Fix = Base[k][b];
				Fix = Fix.toFixed(2);
				
                $('#requested_data tbody tr:eq('+k+')').append("<td>" + Fix + "</td>");
                
            } else 

            $('#requested_data tbody tr:eq('+k+')').append("<td>" + Base[k][b] + "</td>")

        }
        if (count1 != 0){
            continue Start;
        }
        for (var m=0; m<idArr.length; m++){

            var c = idArr[m];
            if (c=="id")    {
                c="#id";
            }

            $('#requested_data thead tr').append("<th>" + c + "</th>");
        }
        count1 = 1;
    }
	}   
}


function ErrorHandler(jqXHR,StatusStr,ErrorStr){
    alert(StatusStr+'Загрузка не удалась'+ErrorStr);
}

//string.split(",").join(", ")