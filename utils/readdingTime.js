window.calcRT = ev => {
    console.log("hello");
    const wordsPerMinute = 200; // Average case.
    let result;
    
    let textLength = ev.value.split(" ").length; // Split by words
    if(textLength > 0){
      let value = Math.ceil(textLength / wordsPerMinute);
      result = `~${value} min read`;
    }
    console.log(value);
      document.getElementById("readingTime").value  = result;
  };