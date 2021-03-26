import { NextApiRequest, NextApiResponse } from "next";
import { getGitHubUserInfo } from "services/getUsers";
import { sendErrorResponse } from "utils";

export default async function getUserData(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const username = request.query.username;

  if (!username) {
    return response.status(400).json(sendErrorResponse(400, "Bad Request"));
  }

  try {
    //pega os dados do github
    const user = await getGitHubUserInfo(username as string);
    // const user = {
    //   login: "styllth",
    //   id: 54640347,
    //   node_id: "MDQ6VXNlcjU0NjQwMzQ3",
    //   avatar_url: "https://avatars.githubusercontent.com/u/54640347?v=4",
    //   gravatar_id: "",
    //   url: "https://api.github.com/users/styllth",
    //   html_url: "https://github.com/styllth",
    //   followers_url: "https://api.github.com/users/styllth/followers",
    //   following_url:
    //     "https://api.github.com/users/styllth/following{/other_user}",
    //   gists_url: "https://api.github.com/users/styllth/gists{/gist_id}",
    //   starred_url:
    //     "https://api.github.com/users/styllth/starred{/owner}{/repo}",
    //   subscriptions_url: "https://api.github.com/users/styllth/subscriptions",
    //   organizations_url: "https://api.github.com/users/styllth/orgs",
    //   repos_url: "https://api.github.com/users/styllth/repos",
    //   events_url: "https://api.github.com/users/styllth/events{/privacy}",
    //   received_events_url:
    //     "https://api.github.com/users/styllth/received_events",
    //   type: "User",
    //   site_admin: false,
    //   name: "Styllth Saraiva Ribeiro",
    //   company: null,
    //   blog: "",
    //   location: null,
    //   email: null,
    //   hireable: null,
    //   bio: null,
    //   twitter_username: null,
    //   public_repos: 22,
    //   public_gists: 3,
    //   followers: 8,
    //   following: 7,
    //   created_at: "2019-08-28T17:36:23Z",
    //   updated_at: "2021-03-12T14:32:49Z",
    // };
    const userInfo = {
      id: user.id,
      name: user.name,
      username: user.login,
      avatar_url: user.avatar_url,
    };

    response.status(200).json( userInfo );

    // if (!user) {
    //   throw new Error(
    //     `Não foi possível obter os dados do usuário "${username}"`
    //   );
    // }
  } catch (err) {
    response.status(400).json(sendErrorResponse(400, err.message));
  }
}
