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
    order: 1;
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
