export class LabyrintheService {
    
    constructor($log) {
        this.$log = $log
        this.log = new Date().toLocaleString() + " - " + "[labyrinthe-game.service.js]" + " - "
    }

    labInit(length) {
        this.$log.info(this.log + this.labInit.name + " : Initialisation du labyrinthe")
        this.portesPossible = []
        let squareNumber = 0;
        let labMap = new Map()
        for(let hauteur = 0 ; hauteur < length ; hauteur++ ) {
            let labLigne = []
            for(let largeur = 0; largeur < length ; largeur++ ) {
                let square = {
                    position: squareNumber,
                    number: squareNumber,
                    colonne: largeur,
                    ligne: hauteur,
                    bas: false,
                    droite: false
                }
                labLigne.push(square)
                squareNumber++
            } 
            labMap.set(hauteur, labLigne)
        }
        this.labyrinthe = {
            length: length,
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
            let positionSquareAdj = (isDoorHorizontal) ? squareToTreatPosition + this.labyrinthe.length : squareToTreatPosition + 1 
            let squareAdj = this.labGetSquare(positionSquareAdj)
            if(squareToTreat.number != squareAdj.number) {
                if(squareToTreat.number < squareAdj.number) {
                    this.labCompareSquare(squareToTreat, squareAdj)
                } else {
                    this.labCompareSquare(squareAdj, squareToTreat)
                }
                if(isDoorHorizontal) {
                    squareToTreat.bas = true
                } else {
                    squareToTreat.droite = true
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
        for(let ligne = 0 ; ligne < this.labyrinthe.length ; ligne++ ) {
            for(let colonne = 0 ; colonne < this.labyrinthe.length ; colonne++ ) {
                if(ligne != this.labyrinthe.length - 1) {
                    this.portesPossible.push(index)
                }
                index++
                if(colonne != this.labyrinthe.length -1) {
                    this.portesPossible.push(index)
                }
                index++;
            }
        }
    }
    
    labGetSquare(squareNumber) {
		let ligne = Math.floor(squareNumber / this.labyrinthe.length)
		let colonne = (squareNumber - (ligne * this.labyrinthe.length))
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
        for(let i = 0; i < (this.labyrinthe.length*2)-1; i++) {
            stringLigne += (i%2) ? ',' : '_'
        }
        stringLigne += '.'
        console.log(stringLigne)
        this.labyrinthe.map.forEach(labLigne => {
            stringLigne = '|'
            labLigne.forEach(square => {
                stringLigne += (square.bas) ? ' ' : '_'
                stringLigne += (square.droite) ? ',' : '|' 
            })
            console.log(stringLigne)
        });
    }
}