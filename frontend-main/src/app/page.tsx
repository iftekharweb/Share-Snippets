"use client";

import React, { useEffect, useState } from "react";
import { useStateContext } from "@/contexts";
import * as actions from "@/actions";
import axios from "axios";

interface snippetProps {
  id: number;
  title: string;
  user: { name: string };
}

export default function Home() {
  const { authToken } = useStateContext();

  const [snippets, setSnippets] = useState([]);

  const snippetsData = async () => {
    const data = await actions.fetchSnippets();
    if (data) {
      setSnippets(data);
    }
  };
  useEffect(() => {
    snippetsData();
  }, []);

  const handleView = (id: number) => {
    actions.goToShowSnippetPage(id);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const snippetsPerPage = 20;
  const totalPages = Math.ceil(snippets.length / snippetsPerPage);
  const currentSnippets = snippets.slice(
    (currentPage - 1) * snippetsPerPage,
    currentPage * snippetsPerPage
  );
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-gray-100 h-screen p-10">
      <div className="flex flex-col rounded-lg p-5 bg-white">
        <div className="pb-5">
          <p className="text-3xl font-semibold">All Public Snippets</p>
        </div>
        <div>
          <div className="overflow-x-auto px-10">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-start">
                    Snippet title
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900">
                    Uploaded by
                  </th>
                  <th className="whitespace-nowrap px-4 py-2 font-semibold text-gray-900 text-end">
                    Click to view
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentSnippets.map((snippet: snippetProps) => (
                  <tr key={snippet.id}>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-start">
                      {snippet.title}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                      {snippet.user.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 flex items-center justify-end">
                      <button
                        onClick={() => handleView(snippet.id)}
                        className="inline-block rounded bg-teal-600 px-4 py-2 text-xs font-medium text-white hover:bg-teal-700"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
            <ol className="flex justify-center gap-1 text-xs font-medium">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                >
                  <span className="sr-only">Prev Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => handlePageChange(index + 1)}
                    className={`block rounded border ${
                      currentPage === index + 1
                        ? "block size-8 rounded border-teal-600 bg-teal-600 text-center leading-8 text-white"
                        : "block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                    } text-center leading-8`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
                >
                  <span className="sr-only">Next Page</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
