import { readDir, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
//import { join } from 'path';
import { Note, Notebook, NoteDetail } from './types';

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
        dirs
            // only care about dir
            .filter((notebookFileEntry) => {
                return notebookFileEntry.children && notebookFileEntry.children.length > 0
            })
            .map(async (notebookFileEntry, index) => {
                const dirpath = await join(downloadDirPath, dirInDownload, notebookFileEntry.name);

                const notes = await Promise.all(
                    notebookFileEntry.children
                        .filter((noteFileEntry) => {
                            // only those dirs are what we want.
                            return noteFileEntry.children && noteFileEntry.children.length > 0;
                        })
                        .map(async (noteFileEntry, subIndex) => {
                            const noteDirpath = await join(dirpath, noteFileEntry.name);
                            const note = new Note(noteFileEntry.name, noteDirpath);
                            const noteDetail = await getNoteDetail(note.dirpath, note.page);

                            note.noteDetail = noteDetail;
                            note.loaded = true;
                            return note;
                        })
                );

                const notebook = new Notebook(notebookFileEntry.name, dirpath, notes);
                return notebook;
            })
    );

    console.log("notebooks");

    return notebooks;
};

export const getNoteDetail = async (noteDir: string, notePage: string): Promise<NoteDetail> => {
    const { join } = await import('@tauri-apps/api/path');

    var notePagePath = await join(noteDir, notePage);
    // console.log("read notePagePath");
    // console.log(notePagePath);

    const content = await readTextFile(notePagePath);
    const noteDetail = new NoteDetail(content);
    noteDetail.parseFrontMatters();

    // console.log(noteDetail);
    return noteDetail;
}