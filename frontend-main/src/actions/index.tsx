"use server";

import { redirect } from "next/navigation";
import axios from "axios";

export const goToLoginPage = () => redirect("/auth/login");
export const goToRegisterPage = () => redirect("/auth/register");
export const goToCreatePage = () => redirect("/snippets/new");
export const goToMySnippetsPage = () => redirect("/my-snippets");
export const goToShowSnippetPage = (id: number) => redirect(`/snippets/${id}/`);
export const goToShowMySnippetPage = (id: number) =>
  redirect(`/my-snippets/${id}/`);
export const goToEditSnippetPage = (id: number) =>
  redirect(`/snippets/${id}/edit`);
export const goToEditMySnippetPage = (id: number) =>
  redirect(`/my-snippets/${id}/edit`);
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

export const fetchMySnippets = async (id: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/users/${id}/snippets/`
    );

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw new Error("Failed to fetch user data");
  }
};

export const getSnippetData = async (id: number) => {
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

export const getMySnippetData = async (user_id: number, snippet_id: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASEURL}/users/${user_id}/snippets/${snippet_id}/`
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
  if(email === "" || password === "") {
    formState.message = "Please fill up all the fields"
    return formState;
  }
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
        message: "Invalid email or password",
      };
    }
  } catch (error) {
    return {
      token: "",
      message: "Invalid email or password",
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
  if(name === "" || email === "" || password === "") {
    formState.message = "Please fill up all the fields & provide your valid email correctly"
    return formState;
  }
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
        message: "Something is wrong!",
      };
    }
  } catch (error) {
    return {
      token: "",
      message: "Something is wrong!",
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
    formState.message = "Something is wrong!";
    return formState;
  }
};

export const editSnippetOperation = async (
  formState: { message: string },
  formData: FormData
) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const language = formData.get("language") as string;
  const visibility = formData.get("visibility") as string;
  const isPrivate = visibility === "public" ? false : true;
  const code = formData.get("code") as string;

  const url = formData.get("url") as string;
  const _token = formData.get("token") as string;

  try {
    const res = await axios.patch(
      `${url}`,
      { title, description, language, code, isPrivate },
      {
        headers: {
          Authorization: `Bearer ${_token}`,
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
    formState.message = "Something is wrong!";
    return formState;
  }
};

export const deleteSnippetAction = async (
  user_id: number,
  snippet_id: number,
  token: string
) => {
  const res = await axios.delete(
    `${process.env.NEXT_PUBLIC_BASEURL}/users/${user_id}/snippets/${snippet_id}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  goToMySnippetsPage();
};
