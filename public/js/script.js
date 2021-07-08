const sideBtn = {
    open : function() {
      $(".sideList").removeClass("on")
                    .addClass("on");
    },
    close : function() {
      $(".sideList").removeClass("on");
    }
  };
  
  $(() => {
    $(".sideWrap").click(function() { //열려있으면 닫기
      if($(".sideList").hasClass("on")) {
        sideBtn.close();
      } else { 
        sideBtn.open();
      }
    });
  
    $(".sideWrap").mouseleave(function() {
        sideBtn.close();
    });
  });