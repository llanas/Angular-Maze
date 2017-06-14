export class LabyrintheGameController {

    constructor($rootScope, LabyrintheService, $log) {
        this.$rootScope = $rootScope
        this.log = new Date().toLocaleString() + " - " + "[labyrinthe-game.controller.js]" + " - "
        this.$log = $log
        this.LabyrintheService = LabyrintheService
    }

    $onInit() {
        this.lengthWanted
    }

    labGenerate() {
        this.labyrinthe = {}
        this.$log.info(this.log + this.labGenerate.name + "Initialisation du labyrinthe")
        this.LabyrintheService.labInit(this.lengthWanted)
        this.$log.log(this.log + this.labGenerate.name + "Entrée dans la fonction generateLab()")
        let t0 = new Date().getDate()
        this.LabyrintheService.labGenerate()
        this.LabyrintheService.labPrintInConsole()
        let t1 = new Date().getDate()
        this.$log.info(this.log + this.labGenerate.name + "labyrinthe généré en " + (t1 - t0) +" milisecondes")
        this.$rootScope.$broadcast('labyrintheGenerated', this.LabyrintheService.labyrinthe)
    }
}