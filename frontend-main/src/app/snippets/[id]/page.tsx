"use client";

import { useEffect, useState } from "react";
import { useStateContext } from "@/contexts";
import * as actions from "@/actions";
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

export default function ShowSnippetPage(props: any) {
  const { authToken, authUserId } = useStateContext();
  const [snippet, setSnippet] = useState<Snippet | undefined>(undefined);

  const getData = async () => {
    const data: Snippet = await actions.getSnippetData(
      parseInt(props.params.id)
    );
    setSnippet(data);
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" bg-gray-100 p-10 h-auto">
      <div className="bg-white rounded-lg py-5 px-8 h-full">
        <div className="flex justify-between items-center h-auto">
          <div className="flex flex-col justify-start items-center gap-4">
            <div className="text-3xl font-semibold pt-2 h-full w-full">
              {snippet?.title}
              <span className="italic text-gray-400 text-sm font-medium pl-2">
                - by {snippet?.user.name}
              </span>
            </div>
            <div className="text-md font-mono text-gray-500 h-full w-full">
              {snippet?.description}
            </div>
          </div>
          {snippet?.user.id === authUserId && (
            <div>
              <span className="inline-flex overflow-hidden rounded-md border bg-white shadow-sm">
                <button
                  className="inline-block border-e p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                  title="Edit Snippet"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </button>

                <button
                  className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                  title="Delete Snippet"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </span>
            </div>
          )}
        </div>
        {/*  */}
        <div className="py-4">
          <p>Code: [{snippet?.language}]</p>
        </div>
        <div>
          {snippet?.code && (
            <Editor
              height="90vh"
              theme="vs-dark"
              defaultLanguage={snippet?.language}
              defaultValue={snippet?.code}
              options={{ minimap: { enabled: false } }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
