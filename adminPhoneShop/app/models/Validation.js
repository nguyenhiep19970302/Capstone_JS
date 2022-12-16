const getELe = id => document.getElementById(id);
class Validation {

    valicationCheck(val, errId, mess) {
        if (val === "") {
            getELe(errId).style.display = "block";
            getELe(errId).innerHTML = mess;
            return false;
        }
        getELe(errId).style.display = "none";
        getELe(errId).innerHTML = "";
        return true;
    }

    selectionCheck = function (selId, errId, mess) {
        if (getELe(selId).selectedIndex !== 0) {
            //true
            getELe(errId).style.display = "none";
            getELe(errId).innerHTML = "";
            return true;
        }
        //false
        getELe(errId).style.display = "block";
        getELe(errId).innerHTML = mess;
        return false;
    };
}
export default Validation;