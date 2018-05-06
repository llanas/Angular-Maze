import angular from 'angular'

//component
import { LabyrintheGame } from './labyrinthe-game.component'

//Service
import { LabyrintheService } from './labyrinthe-game.service' 

//Modules
import LabyrinthePlateau from './labyrinthe-plateau/labyrinthe-plateau-module'

export default angular.module('labyrintheGame', [
    LabyrinthePlateau
])
    .component('labyrintheGame', LabyrintheGame)

    .service('labyrintheService', LabyrintheService)

.name