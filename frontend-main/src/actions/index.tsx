"use server";

import { notFound, redirect } from "next/navigation";
import axios from "axios";
import { headers } from "next/headers";

export const goToLoginPage = () => redirect("/auth/login");
export const goToRegisterPage = () => redirect("/auth/register");
export const goToCreatePage = () => redirect("/snippets/new");
export const goToShowSnippetPage = (id:number) => redirect(`/snippets/${id}/`);
export const goToHomePage = () => redirect("/");

export const fetchUser = async (authToken: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/profile/`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const fetchSnippets = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/snippets/`
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const getSnippetData = async (id:number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/snippets/${id}`
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const loginOperation = async (
  formState: { token: string; message: string },
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/login/`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      return {
        token: res.data.token.access,
        message: "Successfull",
      };
    } else {
      return {
        token: "",
        message: "Some Server Error!",
      };
    }
  } catch (error) {
    return {
      token: "",
      message: "fucked!",
    };
  }
};

export const registerOperation = async (
  formState: { token: string; message: string },
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/register/`,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data) {
      return {
        token: res.data.token.access,
        message: "successful",
      };
    } else {
      return {
        token: "",
        message: "error",
      };
    }
  } catch (error) {
    return {
      token: "",
      message: "error",
    };
  }
};

export const createSnippetOperation = async (
  formState: { message: string; token: string; id: number },
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const code = formData.get("code") as string;
  const language = formData.get("language") as string;
  const visibility = formData.get("visibility") as string;
  const isPrivate = visibility === "public" ? false : true;
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/users/${formState.id}/snippets/`,
      { title, description, language, code, isPrivate },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${formState.token}`,
        },
      }
    );
    if (res.data) {
      formState.message = "successful";
      return formState;
    } else {
      formState.message = "something is wrong!";
      return formState;
    }
  } catch (error) {
    formState.message = "fucked";
    return formState;
  }
};

export const editSnippetOperation = async (
  formState: { message: string; token: string; user_id: number; snippet_id: number },
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const language = formData.get("language") as string;
  const visibility = formData.get("visibility") as string;
  const isPrivate = visibility === "public" ? false : true;
  const code = formData.get("code") as string;
  
  console.log("formState.user_id:", formState.user_id);
  //return formState;
  try {
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASEURL}/users/${formState.user_id}/snippets/${formState.snippet_id}`,
      { title, description, language, code, isPrivate },
      {
        headers: {
          Authorization: `Bearer ${formState.token}`,
        },
      }
    );
    if (res.data) {
      formState.message = "successful";
      return formState;
    } else {
      formState.message = "something is wrong!";
      return formState;
    }
  } catch (error) {
    console.error(error);
    formState.message = "fucked";
    return formState;
  }
};

