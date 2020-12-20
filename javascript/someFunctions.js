
function viewChosenPhoto(photosParam, countParam, containerParam) {

    $(function () {
        
        let chosenPhoto = photosParam[countParam].cloneNode();
        chosenPhoto.id = 'viewed-photo';
        $(chosenPhoto).removeClass("red");
        $(chosenPhoto).addClass("image-main");
        containerParam.append(chosenPhoto);
    });
}

function togglePopUp() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
}
