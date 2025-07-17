$(document).ready(function() {

let start = 0;
const limit= 15;
let isLoading = false;

function postList() {

    if (start >= 100) {
    $("#loading").text("Tüm gönderiler yüklendi.");
    isLoading = true;
    return;
  }
    
    isLoading = true;
    $("#loading").show();

    $.get(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`, function(res) {
        res.forEach(item => (
            $("#postList").append(`
                <li>
                    <h3>${item.title}</h3>
                    <p>${item.body}</p>
                </li>
                `)
        ));

        start += limit;
        isLoading = false;
        $("#loading").hide();
    
    }).fail(function () {
      alert("Postlar yüklenemedi.");
      isLoading = false;
      $("#loading").hide();
    });
}   
    postList();


    $(window).on("scroll" , function() {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
            
            if (!isLoading) {  
        postList();

      }}
    })

})


   