export class LabyrinthePlateauCaseController {

    constructor($location, $scope) {
        this.$location = $location;
        this.$scope = $scope;
    }

    caseSetClassSrc() {
        let className = "";
        className += (!this.case.top) ? "t" : "";
        className += (!this.case.rigth) ? "r" : "";
        className += (!this.case.bottom) ? "b" : "";
        className += (!this.case.left) ? "l" : "";
        return this.$location.absUrl() + "img/mazeSquare/" + className.length + className + ".png";
    }
}