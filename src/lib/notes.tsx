// import { join } from '@tauri-apps/api/path';

import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import { join } from 'path';
import { Note, Notebook } from './type';

export const getNotebooksData = async (dirInDownload: string): Promise<Notebook[]> => {
    const baseDir = BaseDirectory.Download;
    const dirs = await readDir(dirInDownload, { dir: baseDir, recursive: true })
    console.log(dirs);

    // have to use Promise.all to complete all async action in map.
    const notebooks = await Promise.all(
        dirs.map(async (notebookFileEntry, index) => {
            var notes = [];
            if (notebookFileEntry.children) {
                notes = await Promise.all(
                    notebookFileEntry.children.map(async (noteFileEntry, subIndex) => {
                        const dirpath = await join(baseDir.toString(), dirInDownload, notebookFileEntry.name);
                        const filepath = await join(dirpath, noteFileEntry.name);
                        return new Note(noteFileEntry.name, noteFileEntry.name, filepath, "resources",);
                    })
                );
            }
            const dirpath = await join(baseDir.toString(), dirInDownload, notebookFileEntry.name);
            return new Notebook(notebookFileEntry.name, dirpath, notes);
        })
    );

    console.log("notebooks");

    return notebooks;
};

export const getNoteDetail = async (filepath) => {
    const dirs = await readDir(notesDataDir, { dir: BaseDirectory.Download, recursive: true });
    console.log(dirs);
    return dirs;
}