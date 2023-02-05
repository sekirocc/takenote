import { readDir, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
//import { join } from 'path';
import { Note, Notebook, NoteDetail } from './type';

export const getNotebooksData = async (dirInDownload: string): Promise<Notebook[]> => {
    // notice: lazy import, b'c in nextjs server build-time context, there is no 'navigator' or 'window' at all.
    // but the import tauri api statement will access those vars
    // so lazy import make sure this api is called when in client context, ie in useEffect
    //
    // hummmm, maybe we donot have to use @tauri-apps/api/path? maybe just: import { join } from 'path' ?
    const { downloadDir, join } = await import('@tauri-apps/api/path');
    console.log(join)

    const baseDir = BaseDirectory.Download;
    const downloadDirPath = await downloadDir();

    const dirs = await readDir(dirInDownload, { dir: baseDir, recursive: true })
    console.log(dirs);

    // have to use Promise.all to complete all async action in map.
    const notebooks = await Promise.all(
        dirs.map(async (notebookFileEntry, index) => {
            const dirpath = await join(downloadDirPath, dirInDownload, notebookFileEntry.name);
            const notebook = new Notebook(notebookFileEntry.name, dirpath);

            var notes = [];
            if (notebookFileEntry.children) {
                notes = await Promise.all(
                    notebookFileEntry.children.map(async (noteFileEntry, subIndex) => {
                        const dirpath = await join(notebook.dirpath, noteFileEntry.name);
                        return new Note(noteFileEntry.name, dirpath);
                    })
                );
            }

            notebook.notes = notes;
            return notebook;
        })
    );

    console.log("notebooks");

    return notebooks;
};

var noteDetailCache = {};

export const getNoteDetail = async (note: Note): Promise<NoteDetail> => {
    if (noteDetailCache[note.name]) {
        console.log("noteDetail cache hit");
        const noteDetail = noteDetailCache[note.name];
        return noteDetail;
    }

    const { join } = await import('@tauri-apps/api/path');

    if (!note.dirpath) {
        return null;
    }

    var index_page_path = await join(note.dirpath, note.page);
    console.log("page_path");
    console.log(index_page_path);

    // index_page_path = index_page_path.replace(/(\s)/g, '\\$1');
    console.log("page_path escape");
    console.log(index_page_path);

    const content = await readTextFile(index_page_path);

    const noteDetail = new NoteDetail(note, content);
    console.log(noteDetail);

    noteDetailCache[note.name] = noteDetail;
    return noteDetail;
}