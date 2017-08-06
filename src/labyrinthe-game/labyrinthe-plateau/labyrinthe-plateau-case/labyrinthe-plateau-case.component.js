import css from './labyrinthe-plateau-case.component.css'

import { LabyrinthePlateauCaseController } from './labyrinthe-plateau-case.controller.js'

export const LabyrinthePlateauCase = {
    bindings: {
        case: "="
    },
    template: require("./labyrinthe-plateau-case.component.html"),
    controller: LabyrinthePlateauCaseController
}