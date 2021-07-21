const bookslide = {
    open : function() {
      $("#layer_dim").removeClass("dn");
      $(".book_content").removeClass("dn")
                        .addClass("on");
    },
    close : function() {
      $(".book_content").removeClass("on")
                          .addClass("dn");
      $("#layer_dim").removeClass("dn")
                    .addClass("dn");
    }
  };
  
  $(() => {
    $(".book_open").click(function() {
      bookslide.open();
    });
  
    $(".book_close, #layer_dim").click(function() {
      bookslide.close();
    })
  })
  
  var visibleDiv = 0;
  function showDiv() {
    $(".pageform").hide();
    $(".pageform:eq(" + visibleDiv + ")").show();
  }
  showDiv();
  function showNext() {
    if (visibleDiv == $(".pageform").length - 1) {
    } else {
      visibleDiv++;
    }
    showDiv();
  }
  function showPrev() {
    if (visibleDiv == 0) {
    } else {
      visibleDiv--;
    }
    showDiv();
  }
  
  function showDiv() {
    $(".pageform").hide();
    $(".pageform:eq(" + visibleDiv + ")").show();
    if(visibleDiv == 0 ) {
        $("#backbutton").hide();
    } else {
        $("#backbutton").show();
    }
    if(visibleDiv == 4 ) {
        $("#nextbutton").hide();
    } else {
        $("#nextbutton").show();
    }
  }
  