
export class NoteDetail {
    note: Note;
    content: string;

    constructor(note?: Note, content?: string) {
        this.note = note;
        this.content = content;
    }
};

export class Note {
    name: string;
    dirpath: string;

    resourceDir = "resources";
    page = "index.html";

    constructor(name?: string, dirpath?: string, resourceDir?: string) {
        this.name = name;
        this.dirpath = dirpath;
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
        this.notes = notes || [];
    }
};