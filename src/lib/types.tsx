const FRONT_MATTER_TITLE = "frontmatters-title:";
const FRONT_MATTER_CREATED_AT = "frontmatters-created-at:";
const FRONT_MATTER_UPDATED_AT = "frontmatters-updated-at:";
const FRONT_MATTER_TAGS = "frontmatters-tags:";
const FRONT_MATTER_UUID = "frontmatters-uuid:";

export class NoteDetail {
    title: string;
    uuid: string;
    created_at: Date;
    updated_at: Date;
    tags: string[];
    content: string;

    constructor(content?: string) {
        this.content = content;
    }

    formatCreatedAt() {
        try {
            let locale = Intl.DateTimeFormat().resolvedOptions().locale;
            return this.created_at.toLocaleDateString(locale);
            // const date = this.created_at.toLocaleDateString(locale);
            // const time = this.created_at.toLocaleTimeString(locale);
            // return "created at " + date + " " + time
        } catch {
            console.log(this.created_at)
            return ""
        }
    }

    formatUpdatedAt() {
        try {
            let locale = Intl.DateTimeFormat().resolvedOptions().locale;
            return this.updated_at.toLocaleDateString(locale);
            // const date = this.updated_at.toLocaleDateString(locale);
            // const time = this.updated_at.toLocaleTimeString(locale);
            // return "created at " + date + " " + time
        } catch {
            console.log(this.updated_at)
            return ""
        }
    }

    parseFrontMatters() {
        // read front matters
        const lines = this.content.split("\n")
        lines.forEach((line) => {
            if (line.includes(FRONT_MATTER_TITLE)) {
                const title = line.substring(FRONT_MATTER_TITLE.length).trim();
                // console.log("found title: %s", title);
                this.title = title
            }
            if (line.includes(FRONT_MATTER_CREATED_AT)) {
                const created_at = line.substring(FRONT_MATTER_CREATED_AT.length).trim();
                // console.log("found created_at: %s", created_at);
                this.created_at = new Date(parseInt(created_at) * 1000)
            }
            if (line.includes(FRONT_MATTER_UPDATED_AT)) {
                const updated_at = line.substring(FRONT_MATTER_UPDATED_AT.length).trim();
                // console.log("found updated_at: %s", updated_at);
                this.updated_at = new Date(parseInt(updated_at) * 1000)
            }
            if (line.includes(FRONT_MATTER_TAGS)) {
                const tags = line.substring(FRONT_MATTER_TAGS.length).trim();
                // console.log("found tags: %s", tags);
                this.tags = tags.split(",")
            }
            if (line.includes(FRONT_MATTER_UUID)) {
                const uuid = line.substring(FRONT_MATTER_UUID.length).trim();
                // console.log("found uuid: %s", uuid);
                this.uuid = uuid
            }
        })
    }
};

export class Note {
    loaded: boolean;

    title: string;
    dirpath: string;
    noteDetail: NoteDetail;

    resourceDir = "resources";
    page = "index.html";

    constructor(
        title?: string,
        dirpath?: string,
        resourceDir?: string) {

        this.title = title;
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