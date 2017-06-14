export class LabyrinthePlateauController {
    
    constructor($rootScope, $log, $scope) {
        this.$log = $log
        this.log = new Date().toLocaleString() + " - " + "[labyrinthe-plateau.controller.js]" + " - "
        this.$rootScope = $rootScope
        this.$scope = $scope
        this.labyrintheMap = {}
        $rootScope.$on('labyrintheGenerated', (event, args) => this.createLabyrinthePlateau(args))
    }

    createLabyrinthePlateau(labyrintheMap) {
        this.$log.info(this.log + this.createLabyrinthePlateau.name + "Création du plateau du labyrinthe")
        this.labLignes = labyrintheMap.map
        this.$scope.$apply();

    }
}