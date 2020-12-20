// Here I have 8 Sections :
/**
 * 1. Setting Up (s-up)
 * 2. Previous Button (p-reb)
 * 3. Next Button (n-eb)
 * 4. Auto Button (a-ub)
 * 5. Pop-up 'OK' Button (p-opok)
 * 6. Pop-up 'STOP' Button (p-opstop)
 
 * 8. Photo Choice (p-hocho)
 * 
 * (9). 'choose()' function (c-hooss)
 */

$(function () {

    /*------------------- SETTING UP (sup) ---------------------------------*/
    let photosList = document.getElementById('images-showcase').children; // list of images to manipulate
    let container = document.getElementById("image-container");

    let prevChoice;
    let count = 0; // Variable that stores the index of the photo to be presented
    viewChosenPhoto(photosList, count, container);

    $(photosList[count]).addClass("red");

    let isPrevOrNextPressed = false; // Variable used to send to auto mode's or ok-button mode's setInterval method
                          // a message, that 'previous' or 'next' button was pressed, so that the auto or ok-button mode to stop.

    /*------------------- PREVIOUS BUTTON (preb) ---------------------------------*/
    $("#previous").click(function () {

        container.firstChild.remove();

        count--;
        if (count < 0) {

            count = photosList.length - 1;
            $(photosList[0]).removeClass("red");
        }

        viewChosenPhoto(photosList, count, container);
        
        $(photosList[count + 1]).removeClass("red");
        $(photosList[count]).addClass("red");

        isPrevOrNextPressed = true;
        $(".button-auto").removeAttr("disabled");
        prevChoice = count;

    });

    /*--------------------- NEXT BUTTON (neb) ---------------------------------*/
    $("#next").click(function () {

        container.firstChild.remove();

        count++;
        if (count > photosList.length - 1) {

            count = 0;
            $(photosList[photosList.length - 1]).removeClass("red");
        }

        viewChosenPhoto(photosList, count, container);
        
        let index = count - 1;
        if (index === -1) index = photosList.length - 1;

        $(photosList[index]).removeClass("red");
        $(photosList[count]).addClass("red");

        isPrevOrNextPressed = true;
        $(".button-auto").removeAttr("disabled");
        prevChoice = count;

    });

    /*--------------------- AUTO BUTTON (aub) ---------------------------------*/
    $(".button-auto").click(function () {

        isPrevOrNextPressed = false;
        $(".button-auto").attr("disabled", "true");

        // Loop with time interval delay, in between iterations
        let timerId = setInterval(function () {

            if (isPrevOrNextPressed === true) {
                count--;
                clearInterval(timerId);
            }
            
            container.firstChild.remove();

            count++;
            if (count > photosList.length - 1) {

                count = 0;
                $(photosList[photosList.length - 1]).removeClass("red");
            }

            viewChosenPhoto(photosList, count, container);
            
            prevChoice = count;

            let index = count - 1;
            if (index === -1) index = photosList.length - 1;
        
            $(photosList[index]).removeClass("red");
            $(photosList[count]).addClass("red");

            if (count === 5) {
                clearInterval(timerId);
                togglePopUp();
            }
    
        }, 3000);
        
    });

    /*--------------------- POPUP OK-BUTTON (popok) -------------------------*/
    $('.popup-ok').click(function() {

        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");

        isPrevOrNextPressed = false;
        $(".button-auto").attr("disabled", "true");

        // Loop with time interval delay, in between iterations
        let timerId = setInterval(function () {

            if (isPrevOrNextPressed === true) {
                count--;
                clearInterval(timerId);
            }
            
            container.firstChild.remove();

            count++;
            if (count > photosList.length - 1) {

                count = 0;
                $(photosList[photosList.length - 1]).removeClass("red");
            }

            viewChosenPhoto(photosList, count, container);
            
            prevChoice = count;

            let index = count - 1;
            if (index === -1) index = photosList.length - 1;
        
            $(photosList[index]).removeClass("red");
            $(photosList[count]).addClass("red");

            if (count === 5) {
                clearInterval(timerId);
                togglePopUp();
            }
    
        }, 3000);

    });

    /*--------------------- POPUP STOP-BUTTON (popstop) -------------------------*/
    $('.popup-stop').click(function() {
        
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
        
        $(".button-auto").removeAttr("disabled");

    });

    /*---------------- PHOTO CHOICE (phocho) ----------------------------------*/
    // Extra functionality to press specific photos.

    let choice;
 
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

    // chooss
    function choose() {
        
        count = choice;

        container.firstChild.remove();

        viewChosenPhoto(photosList, count, container);
        
        if (prevChoice === undefined) $(photosList[0]).removeClass("red");
        else $(photosList[prevChoice]).removeClass("red");

        $(photosList[count]).addClass("red");

        isPrevOrNextPressed = true;
        $(".button-auto").removeAttr("disabled");
        
        prevChoice = choice;
    }
    
});
