"use client";
import { useStateContext } from "@/contexts";
import { useFormState } from "react-dom";
import * as actions from "@/actions";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

interface User {
  id: number;
  name: string;
  email: string;
}
interface Snippet {
  id: number;
  user: User;
  title: string;
  description: string;
  language: string;
  code: string;
  isPrivate: boolean;
}

export default function EditSnippetPage(props: any) {
  const { authToken, authUserId } = useStateContext();
  console.log("authUserId:", authUserId);

  const [snippet, setSnippet] = useState<Snippet | undefined>(undefined);
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [user_id, setUser_id] = useState<number>(authUserId);
  const [token, setToken] = useState<string>(authToken)

  const getData = async () => {
    const data: Snippet = await actions.getSnippetData(parseInt(props.params.id));
    setSnippet(data);
  };

  useEffect(() => {
    getData();
    setUser_id(authUserId);
    setToken(authToken);
  }, []);

  useEffect(() => {
    if (snippet?.code !== "" && snippet?.code !== undefined && snippet?.code !== null) {
      setCode(snippet.code);
      setTitle(snippet.title);
      setDescription(snippet.description);
      setLanguage(snippet.language);
      setVisibility(snippet.isPrivate ? "private" : "public");
    }
  }, [snippet]);

  const [formState, action] = useFormState(actions.editSnippetOperation, {
    message: "",
    token: token,
    user_id: user_id,
    snippet_id: parseInt(props.params.id),
  });

  useEffect(() => {
    const msg = formState.message;
    console.log(msg);
    if (msg === "successful") {
      alert("The snippet has been created!");
      actions.goToShowSnippetPage(parseInt(props.params.id));
    } else if (msg !== "") {
      alert(msg);
    }
  }, [formState]);

  const handleEditorChange = (value: any, event: any) => {
    setCode(value);
    formState.token = token;
    formState.user_id = user_id;
  };

  return (
    <div className="px-40 py-5 bg-gray-100">
      <div className="rounded-lg bg-white lg:px-12 lg:py-3">
        <h1 className="text-2xl font-serif pb-3">Update your snippet here:</h1>
        <div>
          {code && (
            <Editor
              height="90vh"
              theme="vs-dark"
              defaultLanguage={snippet?.language}
              defaultValue={code}
              options={{ minimap: { enabled: false } }}
              className="pb-4"
              onChange={handleEditorChange}
            />
          )}
        </div>
        <form action={action} className="space-y-4">
          <input type="hidden" name="code" id="code" value={code} onChange={() => {}} />
          <div>
            <label className="sr-only" htmlFor="title">
              Title
            </label>
            <input
              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
              placeholder="Title"
              type="text"
              id="name"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="sr-only" htmlFor="language">
                Programming Language
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                id="language"
                name="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="" disabled selected>
                  Select a programming language
                </option>
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="csharp">C#</option>
                <option value="cpp">C++</option>
                <option value="ruby">Ruby</option>
              </select>
            </div>

            <div className="w-1/2 flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                  type="radio"
                  id="private"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="private" className="ml-2 text-sm text-gray-900">
                  Private
                </label>
              </div>
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                  type="radio"
                  id="public"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={(e) => setVisibility(e.target.value)}
                />
                <label htmlFor="public" className="ml-2 text-sm text-gray-900">
                  Public
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor="description">
              Description
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
              placeholder="Description"
              rows={3}
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-teal-600 hover:bg-teal-700 px-5 py-3 font-medium text-white sm:w-auto"
            >
              Upload snippet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
