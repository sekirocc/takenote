import { useRef, useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import { Editor } from "@tinymce/tinymce-react";


import { getAllNotesData } from '../lib/notes';

import styles from './index.module.scss';

import Image from "next/image";
import reactLogo from "../assets/react.svg";
import tauriLogo from "../assets/tauri.svg";
import nextLogo from "../assets/next.svg";




function App() {
  const [noteList, setNoteList] = useState([]);
  const [noteDetail, setNoteDetail] = useState("");

  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");


  // var allNotesNames = []; // getAllNotesData();

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  }

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  async function list_notes() {
    const result = await invoke("list_notes");
    console.log("get result from list_notes: " + result);
    setNoteList(result);
  }

  useEffect(() => {
    const isClient = typeof window !== 'undefined';

    if (isClient) {
      console.log("isClient, window.innerHeight", window.innerHeight);
      invoke('greet', { name: 'World' }).then(console.log).catch(console.error);

      if (noteList.length > 0) {
        console.log("noteList length is: " + noteList.length);
        console.log(noteList);
        return;
      }

      const fetchData = async () => {
        console.log("before allNotesData");
        const allNotesData = await getAllNotesData();

        const names = allNotesData.map((fileEntry, index, subDirs) => {
          return fileEntry.name;
        });

        setNoteList(names);

        console.log("names");
        console.log(names);

        console.log("noteList");
        console.log(noteList);
      }

      fetchData();
    } else {
      console.log("is not client");
    }
  })

  // list_notes();

  return (
    <div className={styles.container}>
      <div className={styles.container__sidebar}>
        <ul>

          {noteList.map((noteName) => {
            return <li> {noteName} </li>
          })}

        </ul>
      </div>
      <div className={styles.container__editor}>
        <Editor
          tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
        />
      </div>
    </div>
  );
}

export default App;