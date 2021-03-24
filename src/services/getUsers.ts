import { User } from "../auth/userInterface";
import api from "./api";

export async function getGitHubUserInfo(username: string) {
  const configApi = {
    method: "GET",
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  };
  const apiGitHub = api("https://api.github.com", configApi);
  const response = await apiGitHub.get(`users/${username}`);

  return (response.data as unknown) as User;
}
