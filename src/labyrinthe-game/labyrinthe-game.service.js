export class LabyrintheService {
    
    constructor($log) {
        this.$log = $log
        this.log = new Date().toLocaleString() + " - " + "[labyrinthe-game.service.js]" + " - "
    }

    labInit(width, height) {
        this.$log.info(this.log + this.labInit.name + " : Initialisation du labyrinthe")
        this.portesPossible = []
        let squareNumber = 0;
        let labMap = new Map()
        for(let hauteur = 0 ; hauteur < height ; hauteur++ ) {
            let labLigne = []
            for(let largeur = 0; largeur < width ; largeur++ ) {
                let square = {
                    position: squareNumber,
                    number: squareNumber,
                    colonne: largeur,
                    ligne: hauteur,
                    top: false,
                    rigth: false,
                    bottom: false,
                    left: false,
                    className: ""
                }
                labLigne.push(square)
                squareNumber++
            } 
            labMap.set(hauteur, labLigne)
        }
        this.labyrinthe = {
            width: width,
            height: height,
            map: labMap,
        }
    }

    labGenerate(){
        this.$log.info(this.log + this.labGenerate.name + " : Génération du labyrinthe")
        this.labInitChemins()
        this.$log.info(this.log + this.labGenerate.name + " : Chemins initialisé = " + this.chemins)
        this.labInitDoorPossible()
        while(this.portesPossible.length != 0) {
            let indexDoor = Math.floor(Math.random() * this.portesPossible.length);
            let doorToTreat = this.portesPossible[indexDoor]
            let squareToTreatPosition = Math.floor(doorToTreat / 2)
            this.$log.info(this.log + this.labGenerate.name +  " : Traitement de la case " + squareToTreatPosition)
            let squareToTreat = this.labGetSquare(squareToTreatPosition)
            let isDoorHorizontal = doorToTreat % 2 == 0;
            let positionSquareAdj = (isDoorHorizontal) ? squareToTreatPosition + this.labyrinthe.width : squareToTreatPosition + 1 
            let squareAdj = this.labGetSquare(positionSquareAdj)
            if(squareToTreat.number != squareAdj.number) {
                if(squareToTreat.number < squareAdj.number) {
                    this.labCompareSquare(squareToTreat, squareAdj)
                } else {
                    this.labCompareSquare(squareAdj, squareToTreat)
                }
                if(isDoorHorizontal) {
                    squareToTreat.bottom = true
                } else {
                    squareToTreat.rigth = true
                }
            }
            this.portesPossible.splice(indexDoor,1)
        }
    }

    labInitChemins() {
        this.$log.info(this.log + this.labInitChemins.name + " : Initialisation de la liste des chemins")
        this.chemins = new Map()
        this.labyrinthe.map.forEach(labLigne => {
            labLigne.forEach(square => {
                let listeChemin = []
                this.chemins.set(this.chemins.size, [this.labGetSquare(this.chemins.size)])
            })
        });
    }

    labInitDoorPossible() {
        this.$log.info(this.log + this.labInitDoorPossible.name + " : Initialisation des portes possibles")
        let index = 0
        for(let ligne = 0 ; ligne < this.labyrinthe.height ; ligne++ ) {
            for(let colonne = 0 ; colonne < this.labyrinthe.width ; colonne++ ) {
                if(ligne != this.labyrinthe.height - 1) {
                    this.portesPossible.push(index)
                }
                index++
                if(colonne != this.labyrinthe.width -1) {
                    this.portesPossible.push(index)
                }
                index++;
            }
        }
    }
    
    labGetSquare(squareNumber) {
		let ligne = Math.floor(squareNumber / this.labyrinthe.width)
		let colonne = (squareNumber - (ligne * this.labyrinthe.width))
        return this.labyrinthe.map.get(ligne)[colonne]
    }

    labCompareSquare(squareMin, squareMax) {
    	this.chemins.get(squareMin.number).push.apply(this.chemins.get(squareMin.number), this.chemins.get(squareMax.number))
        this.chemins.delete(squareMax.number)
        this.chemins.get(squareMin.number).forEach(p => {
            p.number = squareMin.number
        })
        // this.$log.info(this.log + this.labCompareSquare + " : chemins = " + JSON.stringify(this.chemins))
    }
    
    labPrintInConsole() {
        let stringLigne = '.'
        for(let i = 0; i < (this.labyrinthe.width*this.labyrinthe.height)-1; i++) {
            stringLigne += (i%2) ? ',' : '_'
        }
        stringLigne += '.'
        console.log(stringLigne)
        this.labyrinthe.map.forEach(labLigne => {
            stringLigne = '|'
            labLigne.forEach(square => {
                stringLigne += (square.bottom) ? ' ' : '_'
                stringLigne += (square.rigth) ? ',' : '|' 
            })
            console.log(stringLigne)
        });
    }

    labCheckAdjSquare() {
        this.labyrinthe.map.forEach(labLigne => {
            labLigne.forEach(square => {
                if(square.position%this.labyrinthe.width !=  0) {
                    let leftSquare = this.labGetSquare(square.position - 1)
                    if(leftSquare.rigth) square.left = true
                }
                if(square.position >= this.labyrinthe.width) {
                    let topSquare = this.labGetSquare(square.position - this.labyrinthe.width)
                    if(topSquare.bottom) square.top = true
                }
                if(square.position === 0) {
                    square.left = true;
                }
                if(square.position === (this.labyrinthe.width * this.labyrinthe.height) -1) {
                    square.rigth = true;
                }
            })
        });
    }
}