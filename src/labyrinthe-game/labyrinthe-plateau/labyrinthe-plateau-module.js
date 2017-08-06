import angular from 'angular'

import { LabyrinthePlateau } from './labyrinthe-plateau.component'

import LabyrinthePlateauCase from './labyrinthe-plateau-case/labyrinthe-plateau-case-module'

export default angular.module('labyrinthePlateauModule', [ 
    LabyrinthePlateauCase
])
    .component('labyrinthePlateau', LabyrinthePlateau)

.name