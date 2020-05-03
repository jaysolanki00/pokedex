export class MiniPokeList {
    name: string;
    url: string;
}

export class PokeList {
    count: number;
    next: string;
    previous: string;
    results: Array<MiniPokeList>;

}

export class Ability {
    ability: MiniPokeList;
    is_hidden: boolean;
    slot: number;
}

export class GameIndex {
    game_index: number;
    version: MiniPokeList;
}

export class BaseStat {
    base_stat: number;
    effort: number;
    stat: MiniPokeList;
}

export class PokeType {
    slot: number;
    type: MiniPokeList;
}

export class VersionGroup {
    level_learned_at: number;
    move_learn_method: MiniPokeList;
    version_group: MiniPokeList;
}

export class PokeMoves {
    move: MiniPokeList;
    version_group_details: Array<VersionGroup>;
}

export class Pokemon {
    abilities: Array<Ability>;
    base_experience: number;
    forms: Array<MiniPokeList>;
    game_indices: Array<GameIndex>;
    height: number;
    held_items: Array<any>;
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    name: string;
    order: number;
    species: MiniPokeList;
    sprites: {
        back_default: string;
        back_female: string;
        back_shiny: string;
        back_shiny_female: string;
        front_default: string;
        front_female: string;
        front_shiny: string;
        front_shiny_female: string
    };
    stats: Array<BaseStat>;
    types: Array<PokeType>;
    weight: number;
    moves: Array<PokeMoves>
}

// TODO add pokeTypes response model
/*

damage_relations: {double_damage_from: Array(3), double_damage_to: Array(5), half_damage_from: Array(3), half_damage_to: Array(5), no_damage_from: Array(0), …}
game_indices: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
generation: {name: "generation-i", url: "https://pokeapi.co/api/v2/generation/1/"}
id: 2
move_damage_class: {name: "physical", url: "https://pokeapi.co/api/v2/move-damage-class/2/"}
moves: (44) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
name: "fighting"
names: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
pokemon: (64) 

*/

export class PokeTypeResponse {
    damage_relations:any;
    game_indices: any;
    generation: any;
    id: number;
    move_damage_class: any;
    moves: any;
    name: string;
    names: string;
    pokemon: Array<{pokemon: MiniPokeList}>;

}