
export class Note {
    name: string;
    dirpath: string;
    filepath: string;
    resourceDir: string;

    constructor(name?: string, dirpath?: string, filepath?: string, resourceDir?: string) {
        this.name = name;
        this.dirpath = dirpath;
        this.filepath = filepath;
        this.resourceDir = resourceDir;
    }
};

export class Notebook {
    name: string;
    dirpath: string;
    notes: Note[];

    constructor(name?: string, dirpath?: string, notes?: Note[]) {
        this.name = name;
        this.dirpath = dirpath;
        this.notes = notes;
    }
};