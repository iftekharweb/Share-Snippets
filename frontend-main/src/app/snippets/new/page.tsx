"use client";
import { useStateContext } from "@/contexts";
import { useFormState } from "react-dom";
import * as actions from'@/actions';
import { useEffect, useState } from "react";

export default function SnippetCreatePage() {
  const { authToken, authUserId} = useStateContext();
  const [formData, setFormData] = useState(new FormData());

  const [formState, action] = useFormState(actions.createSnippetOperation, {message: "", token: authToken, id: authUserId});

  useEffect(() => {
    const msg = formState.message;
    console.log(msg);
    if(msg === "successful") {
      alert("The snippet has been created!");
      actions.goToHomePage();
    } else if(msg !== ""){
      alert(msg);
    }
  },[formState])

  return (
    <div className="px-40 py-5 bg-gray-100">
      <div className="rounded-lg bg-white lg:px-12 lg:py-3">
        <h1 className="text-2xl font-serif pb-3">Create a new snippet here:</h1>
        <form action={action} className="space-y-4">
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
            />
          </div>

          {/* Two inputs in one line: a dropdown for programming language and a radio button for private/public */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="sr-only" htmlFor="language">
                Programming Language
              </label>
              <select
                className="w-full rounded-lg border border-gray-200 p-3 text-sm"
                id="language"
                name="language"
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
            ></textarea>
          </div>

          <div>
            <label className="sr-only" htmlFor="code">
              Your Code
            </label>
            <textarea
              className="w-full rounded-lg border border-gray-200 p-3 text-sm"
              placeholder="Your code..."
              rows={6}
              id="code"
              name="code"
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
