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

export default function EditMySnippetPage(props: any) {
  const { authToken, authUserId, Tsuccess, Terror } = useStateContext();

  const [snippet, setSnippet] = useState<Snippet | undefined>(undefined);
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("");
  const [language, setLanguage] = useState<string>("");

  const getData = async () => {
    const data: Snippet = await actions.getMySnippetData(
      authUserId,
      parseInt(props.params.id)
    );
    setSnippet(data);
  };

  useEffect(() => {
    getData();
  }, [props.params.id]);

  useEffect(() => {
    if (snippet) {
      setCode(snippet.code || "");
      setTitle(snippet.title || "");
      setDescription(snippet.description || "");
      setLanguage(snippet.language || "");
      setVisibility(snippet.isPrivate ? "private" : "public");
    }
  }, [snippet]);

  const [formState, action] = useFormState(actions.editSnippetOperation, {
    message: "",
  });

  useEffect(() => {
    if (formState.message) {
      console.log(formState.message);
      if (formState.message === "successful") {
        Tsuccess("Updated successfully");
        actions.goToShowMySnippetPage(parseInt(props.params.id));
      } else {
        Terror("Something went wrong. Please Try again");
      }
    }
  }, [formState]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  return (
    <div className="px-40 py-5 bg-gray-100">
      <div className="rounded-lg bg-white lg:px-12 lg:py-3">
        <h1 className="text-2xl font-serif pb-3">Update your snippet here:</h1>
        <div>
          {code && (
            <Editor
              height="90vh"
              theme="light"
              defaultLanguage={snippet?.language}
              value={code}
              options={{ minimap: { enabled: false } }}
              className="mb-4 border border-gray-200 rounded-md shadow-md"
              onChange={handleEditorChange}
            />
          )}
        </div>
        <form action={action} className="space-y-4">
          <input
            type="hidden"
            name="code"
            id="code"
            value={code}
            onChange={() => {}}
          />
          <input
            type="hidden"
            name="url"
            id="url"
            value={`${
              process.env.NEXT_PUBLIC_BASEURL
            }/users/${authUserId}/snippets/${parseInt(props.params.id)}/`}
            onChange={() => {}}
          />
          <input
            type="hidden"
            name="token"
            id="token"
            value={authToken}
            onChange={() => {}}
          />
          <div>
            <label className="sr-only" htmlFor="title">
              Title
            </label>
            <input
              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
              placeholder="Title"
              type="text"
              id="title"
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
                <option value="" disabled>
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
