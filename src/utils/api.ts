import request from "./request.ts";
import { Router } from "./router.ts";
import store from "./store.ts";

type SignInResponse = { id: number };

export type UserType = {
  [x: string]: string | number;
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export type ChatType = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: Omit<UserType, "id" | "display_name">;
    time: string;
    content: string;
  };
};

export const signUp = (data: { [x: string]: string }) => {
  return request
    .post<SignInResponse>("/auth/signup", {
      data: data,
    })
    .then((r) => {
      if (r.status === 200) {
        return r.data.id;
      } else {
        console.log(r);
        return null;
      }
    });
};

export const signIn = (data: { login: string; password: string }) => {
  return request
    .post<SignInResponse>("/auth/signin", {
      data: data,
    })
    .then((r) => {
      if (r.status === 200) {
        return true;
      } else {
        console.log(r);
        return null;
      }
    });
};

export const logOut = () => {
  return request.post("/auth/logout").then((r) => {
    if (r.status === 200) {
      return true;
    } else {
      console.log(r);
      return null;
    }
  });
};

export const getUser = () => {
  return request.get<UserType>("/auth/user").then((r) => {
    if (r.status === 200) {
      return r.data;
    } else {
      if (r.status === 401) {
        Router.getInstance("#app").go("/");
        store.dispatch({ type: "CLEAR_STORE" });
      }
      console.log(r);
      return null;
    }
  });
};

export const editUser = (data: { key: keyof UserType; value: string }) => {
  return request
    .put<UserType>("/user/profile", { data: { [data.key]: data.value } })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        console.log(r);
        return null;
      }
    });
};

export const getChats = () => {
  return request.get<ChatType[]>("/chats").then((r) => {
    if (r.status === 200) {
      return r.data;
    } else {
      console.log(r);
      return null;
    }
  });
};

export const createChat = (data: { title: string }) => {
  return request.post<{ id: number }>("/chats", { data: data }).then((r) => {
    if (r.status === 200) {
      return r.data;
    } else {
      console.log(r);
      return null;
    }
  });
};

export const addUsersToChat = (data: { users: number[]; chatId: number }) => {
  return request.put<string>("/chats/users", { data: data }).then((r) => {
    if (r.status === 200) {
      return r.data;
    } else {
      console.log(r);
      return null;
    }
  });
};

export const deleteUserFromChat = (data: {
  users: number[];
  chatId: number;
}) => {
  return request.delete<string>("/chats/users", { data: data }).then((r) => {
    if (r.status === 200) {
      return r.data;
    } else {
      console.log(r);
      return null;
    }
  });
};

export const getChatUsers = (data: { id: number }) => {
  return request.get<UserType[]>(`/chats/${data.id}/users`).then((r) => {
    if (r.status === 200) {
      return r.data;
    } else {
      console.log(r);
      return null;
    }
  });
};

export const searchUser = (data: { login: string }) => {
  return request.post<UserType[]>("/user/search", { data: data }).then((r) => {
    if (r.status === 200) {
      return r.data;
    } else {
      console.log(r);
      return null;
    }
  });
};

export const changeUserPassword = (data: {
  newPassword: string;
  oldPassword: string;
}) => {
  return request
    .put<string | { reason: string }>("/user/password", { data: data })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        console.log(r);
        return r.data;
      }
    });
};

export const getChatToken = (id: number) => {
  return request.post<{ token: string }>(`/chats/token/${id}`).then((r) => {
    if (r.status === 200) {
      return r.data;
    } else {
      console.log(r);
      return r.data;
    }
  });
};

export const updateUserAvatar = (data: FormData) => {
  return request
    .put<{ token: string }>(`/user/profile/avatar`, { data: data })
    .then((r) => {
      if (r.status === 200) {
        return r.data;
      } else {
        console.log(r);
        return r.data;
      }
    });
};
