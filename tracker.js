 
    history.replaceState(null, "", "/");
    document.title = "gofil3.com";

    if (!sessionStorage.getItem("histats_hit")) {
      sessionStorage.setItem("histats_hit", "1");

      var _Hasync = _Hasync || [];
      _Hasync.push(['Histats.start','1,4971849,4,0,0,0,00000000']);
      _Hasync.push(['Histats.fasi','1']);
      _Hasync.push(['Histats.track_hits','']);

      (function() {
        var hs = document.createElement('script');
        hs.async = true;
        hs.src = '//s10.histats.com/js15_as.js';
        document.body.appendChild(hs);
      })();
    }
    
