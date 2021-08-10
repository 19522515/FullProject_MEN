document.getElementById('year').innerHTML = new Date().getFullYear()
const root = location.protocol + "//" + location.host
console.log(root)

$('.addToCart').click(function(event) {
    event.preventDefault()
    const href = this.href
    console.log(href)
    $.ajax({
        url: href,
        type: 'GET',
        data: {},
        success: function() {
            swal("Add successful!", "continute!", "success");
            $("#numCart1").load(root + " #numCart2");
        }
    })

})
$('.deleteFormCart').on("submit",function(event) {
    event.preventDefault()
    const action = $(this).attr("action")
    const href = root+action
    const tr_cart_id="#tr_cart_"+ $(this).data("id")
    $.ajax({
        url: href,
        type: 'DELETE',
        data: {},
        success: function() {
            swal("Delete oke roi do !", "continute!", "success");
            $("#total1").load(root + "/cart #total2");
            $(tr_cart_id).empty();
            $("#infoNumber").load(root + "/cart #numberCart");
        }
    })
})
$('.reduceFormCart').on("submit",function(event) {
    event.preventDefault()
    const action=$(this).attr('action')
    const id=$(this).data("id")
    const qty2 = "#qty2" + id
    const tr_cart_id="#tr_cart_" + id
    $.ajax({
        url: action,
        type: 'PUT',
        data: {},
        success: function() {
            swal("Edit successful!", "continute!", "success");
            $("#total1").load(root + "/cart #total2");
            $("#qty" + id).load(root + "/cart " + qty2);
            $("#infoNumber").load(root + "/cart #numberCart");
            if($(qty2).text()==='1'){
                $(tr_cart_id).empty();
            }
        }
    })
})
$('.increaseFormCart').on("submit",function(event) {
    event.preventDefault()
    const action=$(this).attr('action')
    const id=$(this).data("id")
    const qty2 = "#qty2" + id
    const tr_cart_id="#tr_cart_" + id
    $.ajax({
        url: action,
        type: 'PUT',
        data: {},
        success: function() {
            swal("Thêm thành công rồi!", "continute!", "success");
            $("#total1").load(root + "/cart #total2");
            $("#qty" + id).load(root + "/cart " + qty2);
            $("#infoNumber").load(root + "/cart #numberCart");
            if($(qty2).text()==='0'){
                $(tr_cart_id).empty();
            }
        }
    })
})
$('.increaseCart').click(function(event) {
    event.preventDefault()
    const href = this.href
    const id = this.id
    const qty2 = "#qty2" + id
    $.ajax({
        url: href,
        type: 'GET',
        data: {},
        success: function() {
            swal("Edit successful!", "continute!", "success");
            $("#total1").load(root + "/cart #total2");
            $("#qty" + id).load(root + "/cart " + qty2);
        }
    })
})