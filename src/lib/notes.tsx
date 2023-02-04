import path from 'path';

import { readDir, BaseDirectory } from '@tauri-apps/api/fs';

// const notesDataDir = "~/Downloads/quiver_out";
const notesDataDir = "quiver_out";

export const getAllNotesData = async () => {
    const dirs = await readDir(notesDataDir, { dir: BaseDirectory.Download });
    console.log(dirs);
    return dirs;
}