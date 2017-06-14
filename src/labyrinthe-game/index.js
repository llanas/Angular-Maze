import angular from 'angular'

//component
import { LabyrintheGame } from './labyrinthe-game.component'

//Service
import { LabyrintheService } from './labyrinthe-game.service' 

//Modules
import labyrinthePlateau from './labyrinthe-plateau/labyrinthe-plateau-module'

export default angular.module('labyrintheGame', [
    labyrinthePlateau
])
    .component('labyrintheGame', LabyrintheGame)

    .service('LabyrintheService', LabyrintheService)

.name