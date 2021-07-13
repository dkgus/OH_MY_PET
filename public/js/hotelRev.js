function ask() {
    alert('취소 요청이 되었습니다.\n영업일 3일 내에 반영됩니다.');
}

const showEdit = {
    open : function() {
        $(".listBox").addClass("dn")
        $(".modifyBox").removeClass("dn");
    },
    close : function() {
        $(".listBox").removeClass("dn");
        $(".modifyBox").addClass("dn");
    }
  };
  
  $(() => {
    $(".editBtn").click(function() {
      showEdit.open();
    });
  
    $("subBtn").click(function() {
      showEdit.close();
    })
  })