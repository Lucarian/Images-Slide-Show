
$(function () {

    let photosList = document.getElementsByTagName('img'); // list of images to manipulate
    let container = document.getElementById("image-container");

    let count = 0; // Variable that stores the index of the photo to be presented
    container.append(photosList[count].cloneNode());
    
    $("#image-container img:first-child").addClass("image-main");
    $(photosList[count]).addClass("red");

    let feedback = false; // Variable used to send to auto mode's or ok-button mode's setInterval method
                          // a message, that 'previous' or 'next' button was pressed, so that the auto or ok-button mode to stop.

    /*-------------------PREVIOUS BUTTON---------------------------------*/

    $("#previous").click(function () {

        container.firstChild.remove();

        count--;
        if (count < 0) {

            count = photosList.length - 1;
            $(photosList[0]).removeClass("red");
        }

        container.append(photosList[count].cloneNode());
        $("#image-container img:first-child").addClass("image-main");
        
        $(photosList[count + 1]).removeClass("red");
        $(photosList[count]).addClass("red");

        feedback = true;
        $(".button-auto").removeAttr("disabled");
        prevChoice = count;

    });

    /*---------------------NEXT BUTTON---------------------------------*/

    $("#next").click(function () {

        container.firstChild.remove();

        count++;
        if (count > photosList.length - 1) {

            count = 0;
            $(photosList[photosList.length - 1]).removeClass("red");
        }

        container.append(photosList[count].cloneNode());
        $("#image-container img:first-child").addClass("image-main");

        let index = count - 1;
        if (index === -1) index = photosList.length - 1;

        $(photosList[index]).removeClass("red");
        $(photosList[count]).addClass("red");

        feedback = true;
        $(".button-auto").removeAttr("disabled");
        prevChoice = count;

    });

    /*---------------------AUTO BUTTON---------------------------------*/

    $(".button-auto").click(function () {

        feedback = false;
        $(".button-auto").attr("disabled", "true");

        let timerId = setInterval(function () {

            if (feedback === true) {
                count--;
                clearInterval(timerId);
            }
            
            container.firstChild.remove();

            count++;
            if (count > photosList.length - 1) {

                count = 0;
                $(photosList[photosList.length - 1]).removeClass("red");
            }

            container.append(photosList[count].cloneNode());
            $("#image-container img:first-child").addClass("image-main-clearBorder");
            
            prevChoice = count;

            let index = count - 1;
            if (index === -1) index = photosList.length - 1;

            $(photosList[index]).removeClass("red");
            $(photosList[count]).addClass("red");

            if (count === 5) {
                clearInterval(timerId);
                myFunction();
            }
            

        }, 3000);

    });

    /*--------------------- POPUP OK-BUTTON -------------------------*/

    $('.popup-ok').click(function() {

        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");

        feedback = false;
        $(".button-auto").attr("disabled", "true");

        let timerId = setInterval(function () {

            if (feedback === true) {
                count--;
                clearInterval(timerId);
            }
            
            container.firstChild.remove();

            count++;
            if (count > photosList.length - 1) {

                count = 0;
                $(photosList[photosList.length - 1]).removeClass("red");
            }

            container.append(photosList[count].cloneNode());
            $("#image-container img:first-child").addClass("image-main-clearBorder");

            prevChoice = count;

            let index = count - 1;
            if (index === -1) index = photosList.length - 1;

            $(photosList[index]).removeClass("red");
            $(photosList[count]).addClass("red");

            if (count === 5) {
                clearInterval(timerId);
                myFunction();
            }
        

        }, 3000);

    });

    /*--------------------- POPUP STOP-BUTTON -------------------------*/

    $('.popup-stop').click(function() {
        
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
        
        $(".button-auto").removeAttr("disabled");

    });

    /*-------------- POPUP FUNCTIONALITY ----------------------------*/

    function myFunction() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }

    
    
    /*----------------PHOTO CHOICE----------------------------------*/
    // Extra functionality to press specific photos.

    let choice;
    let prevChoice;

    $("#0").click(function() {
        choice = 0;
        choose();
    });

    $("#1").click(function() {
        choice = 1;
        choose();
    });

    $("#2").click(function() {
        choice = 2;
        choose();
    });

    $("#3").click(function() {
        choice = 3;
        choose();
    });

    $("#4").click(function() {
        choice = 4;
        choose();
    });

    $("#5").click(function() {
        choice = 5;
        choose();
    });

    function choose() {
        
        count = choice;

        container.firstChild.remove();

        container.append(photosList[count].cloneNode());
        $("#image-container img:first-child").addClass("image-main-clearBorder");
        
        if (prevChoice === undefined) $(photosList[0]).removeClass("red");
        else $(photosList[prevChoice]).removeClass("red");

        $(photosList[count]).addClass("red");

        feedback = true;
        $(".button-auto").removeAttr("disabled");
        
        prevChoice = choice;
    }


    
});
