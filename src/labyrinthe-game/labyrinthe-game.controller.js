export class LabyrintheGameController {

    constructor($rootScope, labyrintheService, $log, $window) {
        this.$rootScope = $rootScope
        this.$window = $window;
        this.log = new Date().toLocaleString() + " - " + "[labyrinthe-game.controller.js]" + " - "
        this.$log = $log
        this.labyrintheService = labyrintheService
        this.labyrintheDisplayed = false;
    }

    $onInit() {
        this.width = this.$window.innerWidth;
        this.height = this.$window.innerHeight;
    }

    labGenerate() {
        this.labyrinthe = {}
        this.$log.info(this.log + this.labGenerate.name + "Initialisation du labyrinthe")
        this.labyrintheService.labInit(Math.floor(this.width/40), Math.floor(this.height/40))
        this.$log.log(this.log + this.labGenerate.name + "Entrée dans la fonction generateLab()")
        let t0 = new Date().getMilliseconds()
        this.labyrintheService.labGenerate1()
        this.labyrintheService.labPrintInConsole()
        this.labyrintheService.labCheckAdjSquare();
        let t1 = new Date().getMilliseconds()
        this.$log.info(this.log + this.labGenerate.name + "labyrinthe généré en " + (t1 - t0) +" milisecondes")
        this.labyrintheDisplayed = true
        this.$rootScope.$broadcast('labyrintheGenerated', this.labyrintheService.labyrinthe)
    }
}